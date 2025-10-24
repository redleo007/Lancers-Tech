import express from "express"
import passport from "passport"
import session from "express-session"
import bodyParser from "body-parser"
import mysql from "mysql2/promise"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Session
app.use(
  session({
    secret: "scrum-app-secret",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Simple JWT secret fallback
const JWT_SECRET = process.env.JWT_SECRET || "supersecret-jwt-key"

// MySQL Connection (graceful fallback when DB is not reachable)
let db = null
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  console.log("Connected to MySQL database")
} catch (err) {
  console.warn("Warning: could not connect to MySQL - proceeding with in-memory fallback:", err.message)
  // db remains null; strategies will fall back to in-memory operations
}

// --- GOOGLE LOGIN ---
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create user in DB
      const email = profile.emails && profile.emails[0] && profile.emails[0].value
      let user
      if (db) {
        const [rows] = await db.execute(
          "SELECT * FROM users WHERE google_id = ?",
          [profile.id]
        )
        if (rows.length === 0) {
          const [result] = await db.execute(
            "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)",
            [profile.displayName, email, profile.id]
          )
          user = { id: result.insertId, name: profile.displayName, email }
        } else {
          user = rows[0]
        }
      } else {
        // Fallback: create a temporary user record in-memory
        user = { id: Date.now(), name: profile.displayName, email }
        console.warn("DB not available: using in-memory user for login", user.email)
      }

      // Keep minimal user object for session
      return done(null, { id: user.id, name: user.name, email: user.email })
    }
  )
)

// Provide alias endpoint that frontend expects
app.get("/auth/google/login", passport.authenticate("google", { scope: ["profile", "email"] }))
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Create a JWT for the logged in user and send it back to the opener window
    const user = req.user || {}
    const payload = { id: user.id, name: user.name, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })

    // Respond with a small HTML page that posts the token to the opener and closes the popup
    const html = `
      <html>
        <body>
          <script>
            (function() {
              try {
                const token = ${JSON.stringify(token)};
                // Post message to opener window and close
                if (window.opener) {
                  // use a permissive targetOrigin so the frontend popup listener (running on a different origin)
                  // receives the message. Frontend will validate the origin before accepting the token.
                  window.opener.postMessage({ token }, "*");
                }
              } catch (e) {
                console.error(e);
              }
              // Close the popup
              window.close();
            })();
          </script>
          <p>Authentication successful - you can close this window.</p>
        </body>
      </html>
    `

    res.send(html)
  }
)

// Serialize / deserialize for passport sessions
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

// --- APPLE LOGIN (simplified placeholder) ---
// Provide alias endpoint that frontend expects
// Attempt to configure Apple Sign In if environment variables and strategy are available
const appleClientId = process.env.APPLE_CLIENT_ID
const appleTeamId = process.env.APPLE_TEAM_ID
const appleKeyId = process.env.APPLE_KEY_ID
let applePrivateKey = process.env.APPLE_PRIVATE_KEY
const applePrivateKeyPath = process.env.APPLE_PRIVATE_KEY_PATH
// If a path to a private key file is provided, read it
if (!applePrivateKey && applePrivateKeyPath) {
  try {
    const fs = await import('fs')
    applePrivateKey = fs.readFileSync(applePrivateKeyPath, 'utf8')
  } catch (e) {
    console.warn('Could not read APPLE_PRIVATE_KEY_PATH:', e.message)
  }
}

if (appleClientId && appleTeamId && appleKeyId && applePrivateKey) {
  try {
    const { Strategy: AppleStrategy } = await import("passport-apple")

    passport.use(
      new AppleStrategy(
        {
          clientID: appleClientId,
          teamID: appleTeamId,
          keyID: appleKeyId,
          privateKey: applePrivateKey,
          callbackURL: "http://localhost:5000/auth/apple/callback",
          passReqToCallback: false,
          scope: ["name", "email"],
        },
        async (accessToken, refreshToken, idToken, profile, done) => {
          // profile may be limited; extract email from idToken if available
          const email = (profile && profile.email) || (idToken && idToken.email) || null
          const name = (profile && profile.name && `${profile.name.firstName || ""} ${profile.name.lastName || ""}`) || null

          // Find or create user by apple_id or email
          const appleId = (idToken && idToken.sub) || (profile && profile.id)
          let user
          if (db) {
            const [rows] = await db.execute("SELECT * FROM users WHERE apple_id = ?", [appleId])
            if (rows.length === 0) {
              const [result] = await db.execute(
                "INSERT INTO users (name, email, apple_id) VALUES (?, ?, ?)",
                [name, email, appleId]
              )
              user = { id: result.insertId, name, email }
            } else {
              user = rows[0]
            }
          } else {
            user = { id: Date.now(), name, email }
          }

          return done(null, { id: user.id, name: user.name, email: user.email })
        }
      )
    )

    // Routes for Apple
    app.get("/auth/apple/login", passport.authenticate("apple"))
    // Apple may POST to callback; accept both POST and GET for compatibility
    const appleCallbackHandler = [
      passport.authenticate("apple", { failureRedirect: "/" }),
      (req, res) => {
        const user = req.user || {}
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" })
        const html = `
          <html>
            <body>
              <script>
                try {
                  if (window.opener) {
                    window.opener.postMessage({ token: ${JSON.stringify(token)} }, "*");
                  }
                } catch (e) { console.error(e) }
                window.close();
              </script>
              <p>Authentication successful - you can close this window.</p>
            </body>
          </html>
        `
        res.send(html)
      }
    ]
    app.post("/auth/apple/callback", ...appleCallbackHandler)
    app.get("/auth/apple/callback", ...appleCallbackHandler)
  } catch (e) {
    console.warn("passport-apple not installed or failed to load; Apple Sign In disabled", e)
    app.get("/auth/apple/login", (req, res) => res.redirect("/auth/apple"))
    app.get("/auth/apple", (req, res) => {
      res.send(`<html><body><h3>Apple login not configured</h3><p>Install <code>passport-apple</code> and set APPLE_* env vars.</p></body></html>`)
    })
  }
} else {
  app.get("/auth/apple/login", (req, res) => res.redirect("/auth/apple"))
  app.get("/auth/apple", (req, res) => {
    res.send(
      `<html><body><h3>Apple login not yet configured</h3><p>To enable Apple Sign In you must configure Apple OAuth credentials (Service ID, Team ID, Key ID and Private Key) in your environment and install the <code>passport-apple</code> strategy. See the README for steps.</p></body></html>`
    )
  })
}

// --- PHONE LOGIN (mock OTP) ---
app.post("/auth/phone", async (req, res) => {
  const { phone } = req.body
  if (!phone) return res.status(400).json({ message: "Phone required" })
  // In real life → use Twilio
  res.json({ message: `OTP sent to ${phone}` })
})

// Health endpoint — helpful for debugging
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok", service: "auth", env: process.env.NODE_ENV || "development" })
})

// Global error handlers to avoid silent exits during development
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
})
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason)
})

// Start server (bind to 0.0.0.0 so localhost connections from other interfaces succeed)
const LISTEN_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000
const LISTEN_HOST = process.env.HOST || "0.0.0.0"
app.listen(LISTEN_PORT, LISTEN_HOST, () => console.log(`Auth server running on http://${LISTEN_HOST}:${LISTEN_PORT}`))

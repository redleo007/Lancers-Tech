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

// MySQL Connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

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
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE google_id = ?",
        [profile.id]
      )
      let user
      if (rows.length === 0) {
        const [result] = await db.execute(
          "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)",
          [profile.displayName, email, profile.id]
        )
        user = { id: result.insertId, name: profile.displayName, email }
      } else {
        user = rows[0]
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
                  window.opener.postMessage({ token }, window.location.origin);
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
app.get("/auth/apple/login", (req, res) => {
  // For now redirect to the informational route
  res.redirect("/auth/apple")
})

app.get("/auth/apple", (req, res) => {
  res.send(
    `<html><body><h3>Apple login not yet configured</h3><p>To enable Apple Sign In you must configure Apple OAuth credentials (Service ID, Team ID, Key ID and Private Key) in your environment and install the <code>passport-apple</code> strategy. See the README for steps.</p></body></html>`
  )
})

// --- PHONE LOGIN (mock OTP) ---
app.post("/auth/phone", async (req, res) => {
  const { phone } = req.body
  if (!phone) return res.status(400).json({ message: "Phone required" })
  // In real life → use Twilio
  res.json({ message: `OTP sent to ${phone}` })
})

// Start server
app.listen(5000, () => console.log("Auth server running on http://localhost:5000"))

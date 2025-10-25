import express from "express"
import passport from "passport"
import session from "express-session"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Initialize Express app with security middlewares
const app = express()

// CORS setup for frontend connection
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Session setup with secure options
app.use(
  session({
    secret: "scrum-app-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "supersecret-jwt-key"

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sprintzen"

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.warn('MongoDB connection error:', err.message)
    console.log('Proceeding with in-memory fallback')
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
      try {
        // Find or create user in MongoDB
        const email = profile.emails?.[0]?.value
        
        let user = await User.findOne({ 
          $or: [
            { googleId: profile.id },
            { email: email }
          ]
        })

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id
          })
        } else if (!user.googleId) {
          // If user exists with email but no googleId, link the accounts
          user.googleId = profile.id
          await user.save()
        }

        // Return minimal user object for session
        return done(null, {
          id: user._id,
          name: user.name,
          email: user.email
        })
      } catch (error) {
        console.error('Error in Google strategy:', error)
        return done(error)
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
          
          let user = await User.findOne({
            $or: [
              { appleId: appleId },
              { email: email }
            ]
          })

          if (!user) {
            user = await User.create({
              name: name || 'Apple User',
              email: email,
              appleId: appleId
            })
          } else if (!user.appleId) {
            // If user exists with email but no appleId, link the accounts
            user.appleId = appleId
            if (name) user.name = name
            await user.save()
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

import express from "express"
import passport from "passport"
import session from "express-session"
import bodyParser from "body-parser"
import mysql from "mysql2/promise"
import dotenv from "dotenv"

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
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE google_id = ?",
        [profile.id]
      )
      if (rows.length === 0) {
        await db.execute(
          "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)",
          [profile.displayName, profile.emails[0].value, profile.id]
        )
      }
      return done(null, profile)
    }
  )
)

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Google Login Successful!")
  }
)

// --- APPLE LOGIN (simplified placeholder) ---
app.get("/auth/apple", (req, res) => {
  res.send("Apple login not yet configured. Set up Apple OAuth credentials.")
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

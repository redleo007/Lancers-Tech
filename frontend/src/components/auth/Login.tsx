import { useState } from "react"
import { FaGoogle, FaApple, FaPhone } from "react-icons/fa"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { User } from "../../types/auth"

export default function Login() {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSuccessfulLogin = (userData: User) => {
    login(userData);
    navigate("/dashboard");  // Navigate to main dashboard after successful login
  };

  const handleGoogleLogin = () => {
    // Store the intended redirect in localStorage
    localStorage.setItem('postLoginRedirect', '/dashboard');
    window.location.href = "http://localhost:5000/auth/google";
  }

  const handleAppleLogin = () => {
    localStorage.setItem('postLoginRedirect', '/dashboard');
    window.location.href = "http://localhost:5000/auth/apple";
  }

  const handleDemoLogin = async () => {
    try {
      console.log("Starting demo login process...");
      setError("");

      // Create a demo token (similar to SignInPage)
      const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1haWwiOiJkZW1vQHNwcmludHplbi5jb20ifQ.dummy_signature';
      
      // Create demo user data
      const user: User = {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@sprintzen.com'
      };

      // Store the token in localStorage (like SignInPage does)
      localStorage.setItem('token', demoToken);
      
      // Update auth store with user data
      console.log("Updating auth store with demo user:", user);
      login(user);

      console.log("Navigating to dashboard...");
      navigate("/dashboard", { replace: true });
      
    } catch (err: unknown) {
      console.error("Demo login error:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    }
  };

  const handlePhoneLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })
    const data = await res.json()
    alert(data.message || "OTP sent!")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full p-3 mb-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center w-full p-3 mb-4 text-white bg-black rounded-lg hover:bg-gray-800"
        >
          <FaApple className="mr-2" /> Continue with Apple
        </button>

        <button
          onClick={handleDemoLogin}
          className="flex items-center justify-center w-full p-3 mb-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          Demo Login
        </button>

        <div className="mt-6">
          <p className="text-center text-gray-500 mb-2">Or login with phone</p>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handlePhoneLogin}
            className="flex items-center justify-center w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <FaPhone className="mr-2" /> Send OTP
          </button>
        </div>
      </div>
    </div>
  )
}

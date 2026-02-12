import React, { useContext } from "react";
import axios from "axios";
import Mycontext from "./Context";
import { Link } from "react-router-dom";

const Login = () => {
  const { email, Setemail, password, setPassword } = useContext(Mycontext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post(
          "http://localhost:9808/api/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );

        if (response.data) {
          console.log(response.data);
          alert("Login successful");
        } else {
          alert(response.data.message || "Invalid email or password");
        }
      } else {
        alert("Please enter both email and password");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-green-300">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          🌿 Welcome Back, Farmer!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="📧 Enter your Email"
              onChange={(e) => Setemail(e.target.value)}
              className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="🔑 Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 rounded-lg shadow-md hover:bg-green-800 transition font-semibold text-lg"
          >
            Login 🚜
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-5 text-center">
          <p className="text-gray-700 text-lg">New to the marketplace?</p>
          <Link
            to="/sign"
            className="mt-2 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
          >
            Sign Up 🌾
          </Link>
        </div>

        {/* Welcome Message */}
        <div
          id="welcome-message"
          className="mt-6 p-4 bg-green-100 text-green-800 text-center rounded-lg shadow-md"
        >
          <h1 className="text-lg font-semibold">🚜 Let's get your fresh harvest online for buyers! 🌾</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;

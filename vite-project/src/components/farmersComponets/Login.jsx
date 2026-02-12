import React, { useContext } from "react";
import axios from "axios";
import Mycontext from "./Context";
import { Link } from "react-router-dom";
import { Mail, Lock, Sprout, ArrowRight } from 'lucide-react';

const Login = () => {
  const { email, Setemail, password, setPassword } = useContext(Mycontext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post(
          "http://localhost:9808/api/auth/login",
          { email, password },
          { withCredentials: true }
        );

        if (response.data) {
          console.log(response.data);
          alert("Login successful");
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Wrong credentials! Please try again or sign up.");
      } else {
        alert("Something went wrong, please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-6">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Welcome Back, Farmer!
            </h1>
            <p className="text-gray-600 mt-2">Sign in to manage your crops</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => Setemail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">New here?</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/sign"
            className="block w-full text-center px-6 py-3.5 bg-white border-2 border-emerald-600 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300"
          >
            Create Farmer Account
          </Link>

          {/* Info Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-800 text-center font-medium">
              🌾 Start selling your crops directly to buyers today!
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center">
          <Link to="/loginbuyers" className="text-gray-600 hover:text-emerald-700 transition-colors text-sm">
            Looking to buy? <span className="font-semibold">Sign in as Buyer →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
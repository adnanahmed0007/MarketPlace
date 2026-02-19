import React, { useContext } from "react";
import axios from "axios";
import Mycontext from "../farmersComponets/Context";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Lock, ArrowRight } from 'lucide-react';


const Loginbuyers = () => {
  const { email, Setemail, password, setPassword } = useContext(Mycontext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const send_data = await axios.post(
        "http://localhost:9808/api/auth/buy/buyer/login",
        { email, password },
        { withCredentials: true }
      );
      if (send_data) {
        console.log(send_data);
        alert("Login successful!");
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">

      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-md w-full animate-fade-in-up">

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              🛒
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Welcome Back, Buyer
            </h2>

            <p className="text-gray-600 mt-2">
              Login to continue shopping fresh produce
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => Setemail(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
              required
            />

            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300"
            >
              Login to Account 🚀
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">New here?</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Signup Link */}
          <Link
            to="/signupbuyers"
            className="block w-full text-center px-6 py-3.5 bg-white border-2 border-emerald-600 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300"
          >
            Create Buyer Account 🌱
          </Link>

          {/* Info Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-800 text-center font-medium">
              🧺 Buy directly from local farmers. Support fresh, support local!
            </p>
          </div>

        </div>
      </div>
    </div>
  );


};

export default Loginbuyers;

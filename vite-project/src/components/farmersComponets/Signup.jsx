import React, { useContext } from "react";
import axios from "axios";
import Mycontext from "./Context";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Lock, Sprout, ArrowRight } from 'lucide-react';

const Signup = () => {
  const { fullName, SetFullname, phoneNumber, SetPhonenumber, address, Setaddress, email, Setemail, password, setPassword, age, Setage } = useContext(Mycontext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (fullName && email && password && phoneNumber && address && age) {
        const response = await axios.post(
          "http://localhost:9808/api/auth/sign",
          { fullName, email, password, phoneNumber, address, age },
          { withCredentials: true }
        );

        if (response.data) {
          console.log(response.data);
          alert("Signup successful! Please login.");
        }
      }
    } catch (e) {
      console.error(e);
      alert(e.response.data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-2xl mx-auto animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Join as a Farmer
            </h1>
            <p className="text-gray-600 mt-2">Start selling your crops directly to buyers</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => SetFullname(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Email and Phone in Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => Setemail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  onChange={(e) => SetPhonenumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Address and Age in Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Farm Address"
                  onChange={(e) => Setaddress(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="number"
                  placeholder="Age"
                  onChange={(e) => Setage(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="Create Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden mt-6"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Create Farmer Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Already registered?</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full text-center px-6 py-3.5 bg-white border-2 border-emerald-600 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300"
          >
            Sign In to Existing Account
          </Link>

          {/* Info Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-800 text-center font-medium">
              🌾 Get verified instantly and start selling in minutes!
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center">
          <Link to="/signupbuyers" className="text-gray-600 hover:text-emerald-700 transition-colors text-sm">
            Want to buy crops? <span className="font-semibold">Register as Buyer →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
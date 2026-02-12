import React, { useContext, useState } from "react";
import axios from "axios";
import Mycontext from "./Context";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    fullName,
    SetFullname,
    phoneNumber,
    SetPhonenumber,
    address,
    Setaddress,
    email,
    Setemail,
    password,
    setPassword,
    Setage,
    age,
  } = useContext(Mycontext);
  const [data, setData] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (email && password && age && phoneNumber && fullName && address) {
        const send_data = await axios.post(
          "http://localhost:9808/api/auth/sign",
          {
            fullName,
            phoneNumber,
            email,
            password,
            address,
            age,
          },
          { withCredentials: true }
        );
        if (send_data) {
          console.log(send_data.data.newUser);
          setData(send_data.data.newUser);
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Wrong credentials or you already have an account.");
      } else {
        alert("Something went wrong, please try again.");
      }
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-green-50 to-blue-100 p-6 items-center justify-center">
      {/* Left Side - Welcome Section */}
      <div className="md:w-1/2 p-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-green-800">
          🌱 Welcome to Farmer Portal!
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Join us today and explore a world of opportunities. Buy and sell crops,
          manage your farm data, and connect with other farmers. Sign up now to get started!
        </p>
        <p className="mt-4 text-lg text-gray-600 italic">
          "A farmer’s work is never done, but together, we grow stronger." 🌾
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="md:w-2/5 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 bg-white shadow-2xl border border-green-300 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              onChange={(e) => SetFullname(e.target.value)}
              type="text"
              placeholder="👤 Full Name"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
            <input
              onChange={(e) => Setaddress(e.target.value)}
              type="text"
              placeholder="📍 Address"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
            <input
              onChange={(e) => Setage(e.target.value)}
              type="number"
              placeholder="🎂 Age"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
            <input
              onChange={(e) => Setemail(e.target.value)}
              type="email"
              placeholder="📧 Email"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
            <input
              onChange={(e) => SetPhonenumber(e.target.value)}
              type="tel"
              placeholder="📞 Phone Number"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="🔑 Password"
              className="w-full p-4 text-lg border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 placeholder-gray-600"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white p-4 text-lg rounded-lg shadow-md hover:bg-green-800 transition font-semibold"
            >
              Sign Up 🚜
            </button>
          </form>

          {/* Already Have an Account? */}
          <p className="text-center mt-4 text-gray-700 text-lg">
            Already have an account?{" "}
            <Link to={"/login"} className="text-green-700 font-semibold hover:underline">
              Login here
            </Link>
          </p>

          {/* Display Signup Details After Submission */}
          {data && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700">Signup Details</h2>
              <p>
                <strong>👤 Name:</strong> {data.fullName}
              </p>
              <p>
                <strong>🎂 Age:</strong> {data.age}
              </p>
              <p>
                <strong>📍 Address:</strong> {data.address}
              </p>
              <p>
                <strong>📞 Phone:</strong> {data.phoneNumber}
              </p>
              <p>
                <strong>📧 Email:</strong> {data.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

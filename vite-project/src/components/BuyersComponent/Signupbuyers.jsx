import React, { useContext, useState } from "react";
import axios from "axios";
import Mycontext from "../farmersComponets/Context";
import { Link } from "react-router-dom";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg"; // Ensure the path is correct

const Signupbuyers = () => {
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
          "http://localhost:9808/api/auth/buy/buyer/signup",
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
          console.log(send_data.data.User);
          setData(send_data.data.User);
          alert("Signup successful! Please check your email for verification.");
        }
      } else {
        alert("Please fill out all fields.");
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        console.log(e);
      } else {
        alert("Something went wrong, please try again.");
      }
      console.log(e);
    }
  }

  return (
    <div
      className="flex flex-col md:flex-row h-screen bg-cover bg-center bg-no-repeat items-center justify-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Left Section - Welcome Text */}
      <div className=" bg-white-900 bg-opacity-80 p-6 rounded-xl m-4 md:w-[380px] text-center shadow-md">
        <h1 className="text-3xl font-extrabold text-green-800">🛍 Join Us</h1>
        <p className="mt-2 text-base text-gray-1200">
          Buy fresh farm produce directly from farmers.
        </p>
        <p className="mt-2 text-sm text-gray-600 italic">
          "Support local farmers, eat fresh!" 🍎🥦
        </p>
      </div>

      {/* Signup Form */}
      <div className="md:w-[420px] w-full    bg-opacity-95 rounded-xl p-6 m-4 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Buyer Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            onChange={(e) => SetFullname(e.target.value)}
            type="text"
            placeholder="👤 Full Name"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />
          <input
            onChange={(e) => Setaddress(e.target.value)}
            type="text"
            placeholder="📍 Address"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />
          <input
            onChange={(e) => Setage(e.target.value)}
            type="number"
            placeholder="🎂 Age"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />
          <input
            onChange={(e) => Setemail(e.target.value)}
            type="email"
            placeholder="📧 Email"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />
          <input
            onChange={(e) => SetPhonenumber(e.target.value)}
            type="tel"
            placeholder="📞 Phone Number"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="🔑 Password"
            className="w-full p-3 text-base border border-green-400 rounded-md focus:ring-2 focus:ring-green-600 placeholder-gray-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white p-3 text-base rounded-md shadow-md hover:bg-green-800 transition font-semibold"
          >
            Sign Up 🛒
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-sm">
          Already have an account?{" "}
          <Link
            to={"/loginbuyers"}
            className="text-green-700 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

        {/* Signup success message */}
        {data && (
          <div className="mt-5 p-4 bg-gray-100 rounded-md shadow">
            <h2 className="text-lg font-semibold text-green-700 mb-1">
              Signup Successful!
            </h2>
            <p><strong>👤 Name:</strong> {data.fullName}</p>
            <p><strong>🎂 Age:</strong> {data.age}</p>
            <p><strong>📍 Address:</strong> {data.address}</p>
            <p><strong>📞 Phone:</strong> {data.phoneNumber}</p>
            <p><strong>📧 Email:</strong> {data.email}</p>
            <p className="text-green-600 font-semibold mt-2">
              Welcome to our marketplace! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signupbuyers;

               
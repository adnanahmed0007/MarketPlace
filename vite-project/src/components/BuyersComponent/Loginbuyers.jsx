import React, { useContext } from "react";
import axios from "axios";
import Mycontext from "../farmersComponets/Context";
import { Link } from "react-router-dom";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

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
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-center justify-center h-screen p-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="w-full max-w-md p-8  bg-opacity-90 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
          🛒 Welcome Back, Buyer!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="📧 Enter your Email"
            onChange={(e) => Setemail(e.target.value)}
            className="w-full p-3 border border-green-400 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="🔑 Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-green-400 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Login 🧺
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-300 text-lg">New to the marketplace?</p>
          <Link
            to="/signupbuyers"
            className="mt-2 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
          >
            Sign Up 🌱
          </Link>
        </div>

        {/* Sliding message */}
        <div
          id="welcome-message"
          className="mt-6 p-4 bg-green-100 text-green-900 text-center rounded-lg shadow-md animate-slide-in-right"
        >
          <h1 className="text-lg font-semibold">
            🧺 Buy directly from local farmers. Support fresh, support local! 🌾
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loginbuyers;

import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaEnvelope, FaHome, FaBirthdayCake, FaTimes } from "react-icons/fa";

const Info = () => {
  const [user_data, set_Userdata] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function handleClick() {
    try {
      const response = await axios.get("http://localhost:9808/api/sell/detailsuser", {
        withCredentials: true,
      });

      if (response) {
        set_Userdata(response.data.user);
        setIsOpen(true); // Open sidebar after fetching data
      }
    } catch (e) {
      console.log("Error:", e.response ? e.response.data : e.message);
    }
  }

  return (
    <div className="min-h-screen bg-green-100 p-6 flex justify-center items-center">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Get User Info
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-6">Your Profile</h2>

        <div className="space-y-4">
          <p className="flex items-center text-lg text-gray-700">
            <FaUser className="text-green-500 mr-2" /> <strong>{user_data.fullName || "N/A"}</strong>
          </p>

          <p className="flex items-center text-lg text-gray-700">
            <FaBirthdayCake className="text-yellow-500 mr-2" /> <strong>{user_data.age || "N/A"}</strong>
          </p>

          <p className="flex items-center text-lg text-gray-700">
            <FaPhone className="text-blue-500 mr-2" /> <strong>{user_data.phoneNumber || "N/A"}</strong>
          </p>

          <p className="flex items-center text-lg text-gray-700">
            <FaEnvelope className="text-red-500 mr-2" /> <strong>{user_data.email || "N/A"}</strong>
          </p>

          <p className="flex items-center text-lg text-gray-700">
            <FaHome className="text-purple-500 mr-2" /> <strong>{user_data.address || "N/A"}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;

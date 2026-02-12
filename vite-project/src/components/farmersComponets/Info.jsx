import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaBirthdayCake,
  FaTimes,
} from "react-icons/fa";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const Info = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:9808/api/sell/detailsuser",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (e) {
        if (e.response?.status === 400) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load user data.");
        }
        console.error("Error fetching user data:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-8 w-96 relative border border-white/20">

        {/* Close Button */}
        <button
          onClick={() => setUserData(null)}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition"
        >
          <FaTimes size={20} />
        </button>

        {/* Loading */}
        {loading && (
          <p className="text-center text-green-300 font-semibold">
            Loading profile...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 font-semibold">
            {error}
          </p>
        )}

        {/* User Info */}
        {!loading && userData && (
          <div>
            <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
              👤 Seller Profile
            </h2>

            <div className="space-y-5 text-lg">
              <div className="flex items-center">
                <FaUser className="text-green-400 mr-4" />
                <span>{userData.fullName || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <FaBirthdayCake className="text-yellow-400 mr-4" />
                <span>{userData.age || "N/A"} years</span>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-blue-400 mr-4" />
                <span>{userData.phoneNumber || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-pink-400 mr-4" />
                <span>{userData.email || "N/A"}</span>
              </div>

              <div className="flex items-center">
                <FaHome className="text-purple-400 mr-4" />
                <span>{userData.address || "N/A"}</span>
              </div>
            </div>
          </div>
        )}

        {/* If no data */}
        {!loading && !userData && !error && (
          <p className="text-center text-gray-300">
            No user data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Info;

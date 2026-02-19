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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">

      <div className="relative w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">

        {/* Close Button */}
        <button
          onClick={() => setUserData(null)}
          className="absolute top-5 right-5 text-gray-300 hover:text-red-500 transition duration-300"
        >
          <FaTimes size={18} />
        </button>

        {/* Loading */}
        {loading && (
          <p className="text-center text-green-400 font-semibold animate-pulse">
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
          <>
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                {userData.fullName?.charAt(0) || "U"}
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-wide">
                {userData.fullName}
              </h2>
              <p className="text-gray-300 text-sm">
                Seller Account
              </p>
            </div>

            {/* Info Section */}
            <div className="space-y-4 text-base">

              <InfoItem icon={<FaBirthdayCake />} value={`${userData.age || "N/A"} years`} />
              <InfoItem icon={<FaPhone />} value={userData.phoneNumber || "N/A"} />
              <InfoItem icon={<FaEnvelope />} value={userData.email || "N/A"} />
              <InfoItem icon={<FaHome />} value={userData.address || "N/A"} />

            </div>
          </>
        )}

        {/* No Data */}
        {!loading && !userData && !error && (
          <p className="text-center text-gray-300">
            No user data available.
          </p>
        )}
      </div>
    </div>
  );

};


const InfoItem = ({ icon, value }) => (
  <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition duration-300 p-4 rounded-xl border border-white/10">
    <div className="text-green-400 text-lg">
      {icon}
    </div>
    <span className="text-gray-200">{value}</span>
  </div>
);


export default Info;

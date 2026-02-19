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

const Buyersinfo = () => {
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBuyerData() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:9808/api/buy/buyer/info",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setBuyerData(response.data.user);
        }
      } catch (e) {
        if (e.response?.status === 400) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to load buyer data.");
        }
        console.error("Error fetching buyer data:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchBuyerData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">

      <div className="relative w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">

        {/* Close Button */}
        <button
          onClick={() => setBuyerData(null)}
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

        {/* Buyer Info */}
        {!loading && buyerData && (
          <>
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                {buyerData.fullName?.charAt(0) || "B"}
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-wide">
                {buyerData.fullName}
              </h2>
              <p className="text-gray-300 text-sm">
                Buyer Account
              </p>
            </div>

            {/* Info Section */}
            <div className="space-y-4 text-base">

              <InfoItem icon={<FaBirthdayCake />} value={`${buyerData.age || "N/A"} years`} />
              <InfoItem icon={<FaPhone />} value={buyerData.phoneNumber || "N/A"} />
              <InfoItem icon={<FaEnvelope />} value={buyerData.email || "N/A"} />
              <InfoItem icon={<FaHome />} value={buyerData.address || "N/A"} />

            </div>
          </>
        )}

        {/* No Data */}
        {!loading && !buyerData && !error && (
          <p className="text-center text-gray-300">
            No buyer data available.
          </p>
        )}
      </div>
    </div>
  );
};


const InfoItem = ({ icon, value }) => (
  <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition duration-300 p-4 rounded-xl border border-white/10">
    <div className="text-emerald-400 text-lg">
      {icon}
    </div>
    <span className="text-gray-200">{value}</span>
  </div>
);

export default Buyersinfo;

import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerAboutGet = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFarmerDetails() {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:9808/api/sell/farmer/details/about",
          { withCredentials: true }
        );

        if (response.status === 200) {
          const data = response.data.findAboutfarmer;

          if (Array.isArray(data) && data.length > 0) {
            setFarmerData(data[0]);
          } else {
            setError("No farmer details found.");
          }
        }
      } catch (error) {
        setError("Failed to load farmer details.");
        console.log("Error fetching farmer details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFarmerDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 max-w-md w-full border border-green-200">

        {/* Loading State */}
        {loading && (
          <p className="text-center text-green-700 font-semibold">
            Loading farmer details...
          </p>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-center text-red-600 font-semibold">
            {error}
          </p>
        )}

        {/* Farmer Data */}
        {!loading && farmerData && (
          <div className="space-y-5">

            <div className="text-center">
              <img
                src={farmerData.FarmerImage || "https://via.placeholder.com/150"}
                alt="Farmer"
                className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-green-600 shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-green-800 text-center">
              🌾 {farmerData.FarmerName}
            </h2>

            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <p className="text-gray-800">
                <span className="font-semibold text-green-700">
                  Land Detail:
                </span>{" "}
                {farmerData.LandDetail || "N/A"}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <p className="text-gray-800">
                <span className="font-semibold text-green-700">
                  About:
                </span>{" "}
                {farmerData.AboutFarmer || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerAboutGet;

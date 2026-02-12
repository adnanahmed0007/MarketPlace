import React, { useState } from "react";
import axios from "axios";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";
import {
  Package,
  MapPin,
  Phone,
  IndianRupee,
  Weight,
  Leaf
} from "lucide-react";

const Alldata = () => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      setError("");
      setFetched(true);

      const response = await axios.get(
        "http://localhost:9808/api/sell/selldatashow",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setArray(response.data.getDta || []);
      }
    } catch (e) {
      if (e.response?.status === 400) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch crop data.");
      }
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
            Fresh Crops Marketplace
          </h1>
          <p className="text-gray-600 text-lg">
            Directly sourced from verified farmers
          </p>
        </div>

        {/* Fetch Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleClick}
            disabled={loading}
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <Leaf className="w-5 h-5 group-hover:rotate-12 transition" />
              {loading ? "Fetching Crops..." : "View All Crops"}
            </span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-semibold mb-6">
            {error}
          </p>
        )}

        {/* Crop Cards */}
        {array.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {array.map((value) => (
              <div
                key={value._id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  {value.cropName}
                </h2>

                <div className="space-y-3 text-gray-700">

                  <p className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-teal-600" />
                    <span className="font-medium">
                      {value.cropQuantity} kg
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {value.Pickup_Location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    {value.phoneNumber}
                  </p>

                  <p className="flex items-center gap-2 text-lg font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    ₹{value.cropPrice}
                  </p>
                </div>

                <button className="mt-6 w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition font-semibold">
                  Contact Farmer
                </button>
              </div>
            ))}
          </div>
        ) : (
          fetched &&
          !loading && (
            <div className="text-center mt-8">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No crop data available at the moment.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Alldata;

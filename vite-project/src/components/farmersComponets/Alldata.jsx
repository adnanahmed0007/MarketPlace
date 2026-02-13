import React, { useState } from "react";
import axios from "axios";
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Fresh Crops Marketplace
          </h1>
          <p className="text-lg text-gray-600">
            Directly sourced from verified farmers
          </p>
        </div>

        {/* Button Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50 text-center">
          <button
            onClick={handleClick}
            disabled={loading}
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 font-semibold text-lg disabled:opacity-60"
          >
            <span className="flex items-center gap-2 justify-center">
              <Leaf className={`w-5 h-5 ${loading ? "animate-pulse" : "group-hover:rotate-12 transition"}`} />
              {loading ? "Fetching Crops..." : "View All Crops"}
            </span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Crop Cards */}
        {array.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {array.map((value) => (
              <div
                key={value._id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-600" />
                  {value.cropName}
                </h2>

                <div className="space-y-3 text-gray-700">

                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-teal-600" />
                    <span className="font-medium">
                      {value.cropQuantity} kg
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {value.Pickup_Location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-600" />
                    {value.phoneNumber}
                  </div>

                  <div className="flex items-center gap-2 text-lg font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    ₹{value.cropPrice}
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                  Contact Farmer
                </button>
              </div>
            ))}
          </div>
        ) : (
          fetched &&
          !loading && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
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

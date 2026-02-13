import React, { useState } from "react";
import axios from "axios";
import {
  Package,
  MapPin,
  Phone,
  IndianRupee,
  Weight,
  Trash2,
  RefreshCw
} from "lucide-react";

const Dta_Cropgetall = () => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleFetch() {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:9808/api/sell/datagett",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setArray(response.data.datagett || []);
      }
    } catch (e) {
      console.log(e);
      alert("No data found or please login again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:9808/api/sell/deletecrop/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Crop Deleted Successfully ✅");
        handleFetch();
      }
    } catch (e) {
      alert("Failed to delete crop " + e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Seller Crop Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage and monitor your listed crops
          </p>
        </div>

        {/* Fetch Button Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50 text-center">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 font-semibold text-lg disabled:opacity-60"
          >
            <span className="flex items-center gap-2 justify-center">
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition"
                  }`}
              />
              {loading ? "Fetching..." : "Fetch Selling Crops"}
            </span>
          </button>
        </div>

        {/* Crop Cards */}
        {array.length > 0 ? (
          <div className="space-y-6">
            {array.map((value) => (
              <div
                key={value._id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-2xl transition-all duration-300"
              >
                {/* Crop Info */}
                <div className="grid md:grid-cols-5 gap-6 w-full text-gray-700">

                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold">{value.cropName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Weight className="w-5 h-5 text-teal-600" />
                    <span>{value.cropQuantity} kg</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{value.Pickup_Location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-cyan-600" />
                    <span>{value.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    <span>{value.cropPrice}</span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(value._id)}
                  className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            ))}

            {/* Total Counter */}
            <div className="text-center mt-8 text-gray-700 font-semibold">
              Total Crops Listed:{" "}
              <span className="text-emerald-700">
                {array.length}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Crops Found
            </h3>
            <p className="text-gray-500">
              Click "Fetch Selling Crops" to load your listings
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dta_Cropgetall;

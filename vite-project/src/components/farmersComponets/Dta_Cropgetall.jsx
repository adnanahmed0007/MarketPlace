import React, { useState } from "react";
import axios from "axios";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";
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

  // Fetch Crops
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

  // Delete Crop
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
      alert("Failed to delete crop");
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
            Seller Crop Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and monitor your listed crops
          </p>
        </div>

        {/* Fetch Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition"
                  }`}
              />
              {loading ? "Fetching..." : "Fetch Selling Crops"}
            </span>
          </button>
        </div>

        {/* Crop Rows */}
        <div className="space-y-6">

          {array.length > 0 ? (
            array.map((value) => (
              <div
                key={value._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-6 flex items-center justify-between hover:shadow-2xl transition duration-300"
              >
                {/* Left Section - Single Horizontal Row */}
                <div className="flex items-center gap-16 w-full">

                  <div className="flex items-center gap-2 min-w-[150px]">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold">
                      {value.cropName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Weight className="w-5 h-5 text-teal-600" />
                    <span>{value.cropQuantity} kg</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[160px]">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{value.Pickup_Location}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[160px]">
                    <Phone className="w-5 h-5 text-cyan-600" />
                    <span>{value.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[100px] font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    <span>{value.cropPrice}</span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(value._id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 hover:scale-105 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No crop data available. Click "Fetch Selling Crops".
            </div>
          )}
        </div>

        {/* Total Counter */}
        {array.length > 0 && (
          <div className="mt-8 text-center text-gray-700 font-semibold">
            Total Crops Listed:{" "}
            <span className="text-emerald-700">{array.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dta_Cropgetall;

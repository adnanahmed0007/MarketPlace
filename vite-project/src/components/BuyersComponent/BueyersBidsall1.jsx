import React, { useState } from "react";
import axios from "axios";
import {
  Package,
  MapPin,
  Phone,
  IndianRupee,
  Weight,
  Trash2,
  RefreshCw,
} from "lucide-react";

const BueyersBidsall1 = () => {
  const [arrayget, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleFetch() {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:9808/api/buy/all/bids/buyer",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setArray(response.data.response || []);
      }
    } catch (e) {
      if (e.response?.status === 400) {
        alert(e.response.data.message);
      } else {
        alert("Failed to fetch bids. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(UserId) {
    try {
      const responseDelete = await axios.delete(
        `http://localhost:9808/api/buy/buyer/delte/${UserId}`,
        { withCredentials: true }
      );

      if (responseDelete.status === 200) {
        alert("Bid deleted successfully ✅");
        handleFetch(); // refresh list
      }
    } catch (e) {
      alert("Failed to delete bid.");
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Buyer Bids Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Track, manage and control all your placed bids
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 text-center shadow-xl">
          <button
            onClick={handleFetch}
            disabled={loading}
            className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-60"
          >
            <RefreshCw
              className={`w-5 h-5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition"
                }`}
            />
            {loading ? "Fetching Bids..." : "Load My Bids"}
          </button>
        </div>

        {/* Stats Section */}
        {arrayget.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase tracking-wide">
                Total Bids
              </h3>
              <p className="text-3xl font-bold text-white mt-2">
                {arrayget.length}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase tracking-wide">
                Active Crops
              </h3>
              <p className="text-3xl font-bold text-emerald-400 mt-2">
                {new Set(arrayget.map((i) => i.cropName)).size}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase tracking-wide">
                Avg Price
              </h3>
              <p className="text-3xl font-bold text-teal-400 mt-2">
                ₹
                {arrayget.length
                  ? Math.round(
                    arrayget.reduce(
                      (acc, item) => acc + Number(item.cropPrice),
                      0
                    ) / arrayget.length
                  )
                  : 0}
              </p>
            </div>
          </div>
        )}

        {/* Bid Cards */}
        {arrayget.length > 0 ? (
          <div className="space-y-6">
            {arrayget.map((value) => (
              <div
                key={value._id}
                className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="grid md:grid-cols-5 gap-6 items-center text-gray-300">

                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold text-white">
                      {value.cropName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Weight className="w-5 h-5 text-teal-400" />
                    <span>{value.cropQuantity} kg</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>{value.Location_Buyer}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span>{value.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-lg">
                    <IndianRupee className="w-5 h-5" />
                    {value.cropPrice}
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => handleDelete(value._id)}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-16 text-center">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Bids Yet
            </h3>
            <p className="text-gray-400">
              Click "Load My Bids" to see your placed bids
            </p>
          </div>
        )}

      </div>
    </div>
  );

};

export default BueyersBidsall1;

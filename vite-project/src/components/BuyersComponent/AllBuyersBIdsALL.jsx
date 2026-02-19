import axios from 'axios';
import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Phone,
  IndianRupee,
  Weight,
  RefreshCw
} from "lucide-react";

const AllBuyersBIdsALL = () => {
  const [array, SetArray] = useState([]);

  async function handleClick() {
    try {
      const response = await axios.get("http://localhost:9808/api/buy/all/buyer/bidsall/all/buyer", {
        withCredentials: true,
      });
      if (response && response.status === 200) {
        alert(response.data.message);
        SetArray(response.data.datagetall);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {

        alert(e.response.data.
          message
        );
        console.log(e);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            All Buyers Bids
          </h1>
          <p className="text-gray-400 text-lg">
            View all bids placed across the marketplace
          </p>
        </div>

        {/* Fetch Button */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 text-center shadow-xl">
          <button
            onClick={handleClick}
            className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition" />
            Load All Bids
          </button>
        </div>

        {/* Stats Section */}
        {array.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase">Total Bids</h3>
              <p className="text-3xl font-bold text-white mt-2">
                {array.length}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase">Unique Crops</h3>
              <p className="text-3xl font-bold text-emerald-400 mt-2">
                {new Set(array.map((i) => i.cropName)).size}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-lg">
              <h3 className="text-gray-400 text-sm uppercase">Avg Price</h3>
              <p className="text-3xl font-bold text-teal-400 mt-2">
                ₹
                {Math.round(
                  array.reduce((acc, item) => acc + Number(item.cropPrice), 0) /
                  array.length
                )}
              </p>
            </div>

          </div>
        )}

        {/* Bid Cards */}
        {array.length > 0 ? (
          <div className="space-y-6">
            {array.map((value) => (
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
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-16 text-center">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Bids Found
            </h3>
            <p className="text-gray-400">
              Click "Load All Bids" to display marketplace activity
            </p>
          </div>
        )}

      </div>
    </div>
  );

};

export default AllBuyersBIdsALL;


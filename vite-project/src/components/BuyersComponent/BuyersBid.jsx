
import React, { useState } from 'react';
import axios from "axios";

import {
  Package,
  Weight,
  MapPin,
  IndianRupee,
  Gavel,
} from "lucide-react";


const BuyersBid = () => {
  const [cropName, setCropName] = useState("");
  const [cropQuantity, setCropQuantity] = useState(0);
  const [Location_Buyer, setLocationBuyer] = useState("");
  const [cropPrice, SetCropPrice] = useState(0);
  const [getdata, setdata] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (cropName && cropQuantity && Location_Buyer && cropPrice) {
        const response = await axios.post("http://localhost:9808/api/buy/buyer/bid", {
          cropName, cropPrice, cropQuantity, Location_Buyer
        }, { withCredentials: true });
        if (response && response.status == 200) {
          alert("we place your bid")
          console.log(response.data.chcek);
          setdata(response.data.chcek);
        }


      } else {
        alert("write all the detills");
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("something went wrogn");
      }
      console.log(e);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
            Place Your Crop Bid
          </h2>
          <p className="text-gray-600 text-lg">
            Submit your buying offer to farmers
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Crop Name */}
            <div className="relative group">
              <Package className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="text"
                placeholder="Enter crop name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Quantity */}
            <div className="relative group">
              <Weight className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="number"
                placeholder="Enter quantity (kg)"
                value={cropQuantity}
                onChange={(e) => setCropQuantity(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Location */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="text"
                placeholder="Enter your location"
                value={Location_Buyer}
                onChange={(e) => setLocationBuyer(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Price */}
            <div className="relative group">
              <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="number"
                placeholder="Enter your bid price"
                value={cropPrice}
                onChange={(e) => SetCropPrice(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Gavel className="w-5 h-5" />
              Submit Bid
            </button>

          </form>
        </div>

        {/* Result Card */}
        {getdata && (
          <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-emerald-700 mb-4">
              Bid Confirmation
            </h3>

            <div className="space-y-2 text-gray-700">
              <p><strong>Crop:</strong> {getdata.cropName}</p>
              <p><strong>Quantity:</strong> {getdata.cropQuantity} kg</p>
              <p><strong>Price:</strong> ₹{getdata.cropPrice}</p>
              <p><strong>Location:</strong> {getdata.Location_Buyer}</p>
              <p><strong>Phone:</strong> {getdata.phoneNumber}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );

};

export default BuyersBid;


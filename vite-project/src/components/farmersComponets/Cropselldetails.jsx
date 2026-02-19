import React, { useState } from "react";
import axios from "axios";
import {
  Package,
  Weight,
  MapPin,
  IndianRupee,
  Tractor,
} from "lucide-react";

const Cropselldetails = () => {
  const [cropName, setCropName] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [Pickup_Location, setPickupLocation] = useState("");
  const [cropPrice, setCropPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (cropName && cropPrice && cropQuantity && Pickup_Location) {
        const response = await axios.post(
          "http://localhost:9808/api/sell/datasell",
          {
            cropName: cropName.trim().toLowerCase(),
            cropQuantity: cropQuantity.trim(),
            Pickup_Location: Pickup_Location.trim().toLowerCase(),
            cropPrice: cropPrice.trim(),
          },
          { withCredentials: true }
        );

        if (response && response.status !== 400) {
          alert("Crop is added successfully 🌾");
        }
      } else {
        alert("Please enter all the details");
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Server error");
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
            Sell Your Crop
          </h2>
          <p className="text-gray-600 text-lg">
            List your fresh harvest on the marketplace
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
                placeholder="Enter crop name (e.g. Wheat, Rice)"
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

            {/* Pickup Location */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="text"
                placeholder="Enter pickup location"
                value={Pickup_Location}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Price */}
            <div className="relative group">
              <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600" />
              <input
                type="number"
                placeholder="Enter price per kg"
                value={cropPrice}
                onChange={(e) => setCropPrice(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Tractor className="w-5 h-5" />
              List Crop for Sale
            </button>
          </form>
        </div>

        {/* Preview Card */}
        <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
          <h3 className="text-xl font-bold text-emerald-700 mb-4">
            Preview Your Entry
          </h3>

          <div className="space-y-2 text-gray-700">
            <p><strong>Crop:</strong> {cropName || "N/A"}</p>
            <p><strong>Quantity:</strong> {cropQuantity || "N/A"} kg</p>
            <p><strong>Price:</strong> ₹{cropPrice || "N/A"} per kg</p>
            <p><strong>Pickup:</strong> {Pickup_Location || "N/A"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cropselldetails;

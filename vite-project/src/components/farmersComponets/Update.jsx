import React, { useState } from "react";
import axios from "axios";
import {
  Package,
  Weight,
  IndianRupee,
  MapPin,
  Phone,
  RefreshCw
} from "lucide-react";

const UpdateCrop = () => {
  const [cropName, setCropName] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [cropPrice, setCropPrice] = useState("");
  const [Pickup_Location, setPickup_Location] = useState("");
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:9808/api/sell/crop/update",
        {
          cropName: cropName.trim().toLowerCase(),
          cropQuantity,
          cropPrice,
          Pickup_Location: Pickup_Location.trim().toLowerCase(),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setData1(response.data.findcropName);
      }
    } catch (e) {
      if (e.response?.status === 400) {
        alert("Login again or wrong credentials");
      } else {
        alert("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Update Crop Details
          </h1>
          <p className="text-lg text-gray-600">
            Modify your crop quantity, price and pickup location
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50">

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            {/* Crop Name */}
            <div className="relative group">
              <Package className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition" />
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="Enter crop name"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Quantity */}
            <div className="relative group">
              <Weight className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition" />
              <input
                type="number"
                value={cropQuantity}
                onChange={(e) => setCropQuantity(e.target.value)}
                placeholder="Enter quantity (kg)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Price */}
            <div className="relative group">
              <IndianRupee className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition" />
              <input
                type="number"
                value={cropPrice}
                onChange={(e) => setCropPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Location */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition" />
              <input
                type="text"
                value={Pickup_Location}
                onChange={(e) => setPickup_Location(e.target.value)}
                placeholder="Enter pickup location"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className={`w-5 h-5 ${loading && "animate-spin"}`} />
                  {loading ? "Updating..." : "Update Crop"}
                </span>
              </button>
            </div>

          </form>
        </div>

        {/* Updated Info Card */}
        {data1 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50">
            <h3 className="text-2xl font-bold text-emerald-700 mb-6">
              Updated Crop Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">

              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-emerald-600" />
                <span><strong>Crop:</strong> {data1.cropName}</span>
              </div>

              <div className="flex items-center gap-3">
                <Weight className="w-5 h-5 text-teal-600" />
                <span><strong>Quantity:</strong> {data1.cropQuantity} kg</span>
              </div>

              <div className="flex items-center gap-3">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <span><strong>Price:</strong> ₹{data1.cropPrice}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span><strong>Location:</strong> {data1.Pickup_Location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-600" />
                <span><strong>Phone:</strong> {data1.phoneNumber}</span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UpdateCrop;

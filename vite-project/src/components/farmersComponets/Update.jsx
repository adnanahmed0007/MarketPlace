import React, { useState } from "react";
import axios from "axios";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

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
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-xl p-8 border border-green-200">

        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">
          🌾 Update Crop Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Crop Name
            </label>
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="Enter crop name"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Crop Quantity (kg)
            </label>
            <input
              type="number"
              value={cropQuantity}
              onChange={(e) => setCropQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Crop Price (₹)
            </label>
            <input
              type="number"
              value={cropPrice}
              onChange={(e) => setCropPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              value={Pickup_Location}
              onChange={(e) => setPickup_Location(e.target.value)}
              placeholder="Enter pickup location"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl shadow-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Crop"}
          </button>
        </form>

        {/* Updated Crop Info Card */}
        {data1 && (
          <div className="mt-8 bg-green-50 rounded-2xl shadow-lg p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              ✅ Updated Crop Info
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Crop Name:</strong> {data1.cropName}</p>
              <p><strong>Quantity:</strong> {data1.cropQuantity} kg</p>
              <p><strong>Pickup Location:</strong> {data1.Pickup_Location}</p>
              <p><strong>Phone Number:</strong> {data1.phoneNumber}</p>
              <p className="text-green-700 font-bold">
                <strong>Price:</strong> ₹{data1.cropPrice}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UpdateCrop;

import React, { useState } from "react";
import axios from "axios";

const Cropselldetails = () => {
  const [cropName, setCropName] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [Pickup_Location, setPickupLocation] = useState("");
  const [cropPrice, setCropPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(cropName&&cropPrice&&cropQuantity&&Pickup_Location)
      {
      const response = await axios.post(
        "http://localhost:9808/api/sell/datasell",
        {
          cropName: cropName.trim().toLowerCase(),
          cropQuantity: cropQuantity.trim().toLowerCase(),
          Pickup_Location: Pickup_Location.trim().toLowerCase(),
          cropPrice: cropPrice.trim().toLowerCase(),
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    }
    else{
      alert("please enter all the details")
    }
    } catch (e) {
      console.log(e);
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-300">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          🌱 Sell Your Crop
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter details to list your fresh harvest on the marketplace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name */}
          <div>
            <label
              htmlFor="cropName"
              className="block text-green-700 font-semibold mb-1"
            >
              Crop Name:
            </label>
            <input
              onChange={(e) => setCropName(e.target.value)}
              type="text"
              id="cropName"
              name="cropName"
              required
              className="w-full px-4 py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
              placeholder="e.g., Wheat, Rice"
            />
          </div>

          {/* Crop Quantity */}
          <div>
            <label
              htmlFor="cropQuantity"
              className="block text-green-700 font-semibold mb-1"
            >
              Quantity (kg):
            </label>
            <input
              onChange={(e) => setCropQuantity(e.target.value)}
              type="number"
              id="cropQuantity"
              name="cropQuantity"
              required
              className="w-full px-4 py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
              placeholder="Enter quantity in kg"
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label
              htmlFor="pickupLocation"
              className="block text-green-700 font-semibold mb-1"
            >
              Pickup Location:
            </label>
            <input
              onChange={(e) => setPickupLocation(e.target.value)}
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              required
              className="w-full px-4 py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
              placeholder="Enter location"
            />
          </div>

          {/* Crop Price */}
          <div>
            <label
              htmlFor="cropPrice"
              className="block text-green-700 font-semibold mb-1"
            >
              Price per kg (₹):
            </label>
            <input
              onChange={(e) => setCropPrice(e.target.value)}
              type="number"
              id="cropPrice"
              name="cropPrice"
              required
              className="w-full px-4 py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
              placeholder="Enter price per kg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg shadow-md hover:bg-green-800 transition text-lg font-semibold"
          >
            🚜 List Crop for Sale
          </button>
        </form>

        {/* Display entered data */}
        <div className="mt-6 p-4 bg-green-100 text-green-800 text-center rounded-lg shadow-md">
          <p className="text-lg font-semibold">Your Entry:</p>
          <p>
            <span className="font-bold">Crop:</span> {cropName || "N/A"}
          </p>
          <p>
            <span className="font-bold">Quantity:</span>{" "}
            {cropQuantity || "N/A"} kg
          </p>
          <p>
            <span className="font-bold">Price:</span> ₹{cropPrice || "N/A"} per
            kg
          </p>
          <p>
            <span className="font-bold">Pickup:</span> {Pickup_Location || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cropselldetails;

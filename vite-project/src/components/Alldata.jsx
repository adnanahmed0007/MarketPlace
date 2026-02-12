import React, { useState } from "react";
import axios from "axios";

const Alldata = () => {
  const [array, setArray] = useState([]);

  async function handleClick() {
    try {
      const response = await axios.get(
        "http://localhost:9808/api/sell/selldatashow",
        { withCredentials: true }
      );
      if (response) {
        console.log(response.data.getDta);
        setArray(response.data.getDta);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌾 Available Crops for Sale
      </h1>

      {/* Fetch Data Button */}
      <button
        onClick={handleClick}
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-semibold"
      >
        Fetch Crop Data
      </button>

      {/* Table Wrapper */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Crop Name</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Pickup Location</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {array.length > 0 ? (
                array.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-green-50 text-gray-700">
                    <td className="px-4 py-3">{value.cropName}</td>
                    <td className="px-4 py-3">{value.cropQuantity} kg</td>
                    <td className="px-4 py-3">{value.Pickup_Location}</td>
                    <td className="px-4 py-3">{value.phoneNumber}</td>
                    <td className="px-4 py-3">₹{value.cropPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-600">
                    No crop data available. Click the button to fetch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alldata;

import axios from 'axios';
import React, { useState } from 'react';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center pt-6 px-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-white px-4 py-2 rounded-xl shadow">
        📋 All Buyers Bids
      </h1>

      <button
        onClick={handleClick}
        className="mb-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md shadow-md transition"
      >
        Show Bids
      </button>

      <div className="w-full max-w-4xl bg-white bg-opacity-90 shadow-md rounded-lg overflow-y-auto" style={{ maxHeight: '500px' }}>
        {array.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Buyer Location</th>
                <th className="px-3 py-2 text-left">Crop Name</th>
                <th className="px-3 py-2 text-left">Crop Price</th>
                <th className="px-3 py-2 text-left">Crop Quantity</th>
                <th className="px-3 py-2 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {array.map((value, index) => (
                <tr key={index} className="border-b hover:bg-green-50">
                  <td className="px-3 py-2 capitalize">{value.Location_Buyer}</td>
                  <td className="px-3 py-2 capitalize">{value.cropName}</td>
                  <td className="px-3 py-2">₹{value.cropPrice}</td>
                  <td className="px-3 py-2">{value.cropQuantity} kg</td>
                  <td className="px-3 py-2">{value.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 p-4">No bids found</p>
        )}
      </div>
    </div>
  );
};

export default AllBuyersBIdsALL;


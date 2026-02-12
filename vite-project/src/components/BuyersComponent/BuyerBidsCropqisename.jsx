import axios from 'axios';
import React, { useState } from 'react';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const BuyerBidsCropqisename = () => {
  const [cropName, setCropname] = useState('');
  const [cropArray, setCropArray] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9808/api/buy/all/cropwise/buyers/bids',
        {
          cropName: cropName.trim().toLowerCase(),
        },
        { withCredentials: true }
      );
      if (response) {
        alert(response.data.message);
        setCropArray(response.data.findALLBUyercrop);
      }
    } catch (e) {
        if(e.response&&e.response.status==400)
        {
         
            alert(e.response.data.message)
        
        }
        else{
            alert("cookies expires re login ")
        }
      console.log(e);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="relative z-10 flex flex-col items-center pt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-white px-4 py-2 rounded-xl shadow">
          📊 View Buyer Bids by Crop Name
        </h1>

        <div className="bg-white bg-opacity-90 p-4 rounded-xl shadow-md w-full max-w-3xl mb-6">
          <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap justify-center">
            <div className="flex flex-col w-full sm:w-[220px]">
              <label htmlFor="cropName" className="text-sm font-medium text-gray-700 mb-1">
                Crop Name
              </label>
              <input
                onChange={(e) => setCropname(e.target.value)}
                type="text"
                id="cropName"
                placeholder="e.g., Wheat"
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-[42px] px-4 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-md font-medium transition self-end"
            >
              Submit
            </button>
          </form>
        </div>

        {cropArray.length > 0 && (
          <div className="w-full max-w-4xl bg-white bg-opacity-95 shadow-md rounded-lg overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Crop Name</th>
                  <th className="px-3 py-2 text-left">Crop Price</th>
                  <th className="px-3 py-2 text-left">Crop Quantity</th>
                  <th className="px-3 py-2 text-left">Buyer Phone</th>
                  <th className="px-3 py-2 text-left">Buyer Location</th>
                </tr>
              </thead>
              <tbody>
                {cropArray.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-green-50">
                    <td className="px-3 py-2 capitalize">{value.cropName}</td>
                    <td className="px-3 py-2">₹{value.cropPrice}</td>
                    <td className="px-3 py-2">{value.cropQuantity} kg</td>
                    <td className="px-3 py-2">{value.phoneNumber}</td>
                    <td className="px-3 py-2 capitalize">{value.Location_Buyer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerBidsCropqisename;

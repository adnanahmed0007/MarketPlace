
import React, { useState } from 'react';
import axios from 'axios';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const Buyquantuiyname = () => {
  const [cropName, setCropname] = useState("");
  const [cropQuantity, setcropQuantity] = useState("");
  const [get_data, set_data] = useState([]);
  const [farmerdetail, setFarmerdetail] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9808/api/buy/crop/quantity/name",
        {
          cropName: cropName.trim().toLowerCase(),
          cropQuantity: cropQuantity.trim().toLowerCase(),
        },
        { withCredentials: true }
      );
      if (response) {
        alert("We got the crops, here you go!");
        set_data(response.data.crop_get);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Crop not available.");
      }
      console.log(e);
    }
  }

  async function handleClick1(id) {
    try {
      const response = await axios.post(`http://localhost:9808/api/buy/detailsfarmer/${id}`);
      if (response) {
        setFarmerdetail(response.data.findfarmer);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div
          className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-6 flex flex-col items-center"
          style={{ backgroundImage: `url(${img})` }}
        >
      <div className=" bg-opacity-70 min-h-screen flex flex-col items-center">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-white px-4 py-2 rounded-xl shadow">
        🔍 Search Crops by Name, Quantity & Location
      </h1>


        {/* Form */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-5xl mb-6">
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end justify-center gap-4">
            <div className="flex flex-col w-full sm:w-[220px]">
              <label className="text-sm font-medium text-gray-700 mb-1">Crop Name</label>
              <input
                onChange={(e) => setCropname(e.target.value)}
                type="text"
                placeholder="e.g., Onion"
                required
                className="px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-col w-full sm:w-[220px]">
              <label className="text-sm font-medium text-gray-700 mb-1">Crop Quantity</label>
              <input
                onChange={(e) => setcropQuantity(e.target.value)}
                type="text"
                placeholder="e.g., 15"
                required
                className="px-3 py-2 border border-violet-300 rounded-md shadow-sm focus:ring-2 focus:ring-violet-500 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="h-[42px] px-6 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-md font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Table */}
        {get_data.length > 0 && (
          <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-x-auto mb-10">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-violet-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Crop Name</th>
                  <th className="px-4 py-3 text-left">Pickup Location</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Phone Number</th>
                  <th className="px-4 py-3 text-left">Farmer Details</th>
                </tr>
              </thead>
              <tbody>
                {get_data.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-violet-50">
                    <td className="px-4 py-2 capitalize">{value.cropName}</td>
                    <td className="px-4 py-2 capitalize">{value.Pickup_Location}</td>
                    <td className="px-4 py-2">₹{value.cropPrice}</td>
                    <td className="px-4 py-2">{value.cropQuantity} kg</td>
                    <td className="px-4 py-2">{value.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleClick1(value.User_Id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      >
                        Know Farmer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Farmer Details Modal */}
            {farmerdetail && (
              <div
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                onClick={() => setFarmerdetail(null)}
              >
                <div
                  className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setFarmerdetail(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold text-violet-700 mb-4">👨‍🌾 Farmer Details</h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold">Farmer Name:</span> {farmerdetail.fullName}</p>
                    <p><span className="font-semibold">Email:</span> {farmerdetail.email}</p>
                    <p><span className="font-semibold">Phone Number:</span> {farmerdetail.phoneNumber}</p>
                    <p><span className="font-semibold">Age:</span> {farmerdetail.age}</p>
                    <p><span className="font-semibold">Address:</span> {farmerdetail.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyquantuiyname;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const ButcropOnly = () => {
  const [cropName, setCropname] = useState('');
  const [arraya, setArray] = useState([]);
  const [farmerdetail, setFarmerdetail] = useState("");
const navigate=useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try { 
      const response = await axios.post(
        'http://localhost:9808/api/buy/crop',
        {
          cropName: cropName.trim().toLowerCase(),
        },
        { withCredentials: true }
      );
      if (response&&response.status==200) {
        console.log(response);
         alert("here is the list of crops")
        setArray(response.data.findcrop);
        console.log(response.data.findcrop);
        
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      } else if (!e.response) {
        alert('server issues');
      }
      console.log(e);
    }
  }

  async function handleClick1(id) {
    try {
      const detail = await axios.post(`http://localhost:9808/api/buy/detailsfarmer/${id}`);
      console.log(detail.data.findfarmer);
      setFarmerdetail(detail.data.findfarmer);
    } catch (e) {
      console.log(e);
    }
  }
  async function  handlechat(id) {
    navigate(`/chat/${id}`)

    
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center pt-6 px-4"
      style={{ backgroundImage: `url(${img})` }}
    >
     <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-white px-4 py-2 rounded-xl shadow">
        🔍 Search Crops by CropName
      </h1>


      <div className=" bg-white bg-opacity-90 p-4 rounded-xl shadow-md w-full max-w-4xl mb-6">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end justify-center">
          <div className="flex flex-col w-full sm:w-[240px]">
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
            Search
          </button>
        </form>
      </div>

      {arraya.length > 0 && (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Crop Name</th>
                <th className="px-3 py-2 text-left">Pickup Location</th>
                <th className="px-3 py-2 text-left">Crop Price</th>
                <th className="px-3 py-2 text-left">Crop Quantity</th>
                <th className="px-3 py-2 text-left">Phone Number</th>
                <th className="px-3 py-2 text-left">Farmer Detail</th>
              </tr>
            </thead>
            <tbody>
              {arraya.map((value, index) => (
                <tr key={index} className="border-b hover:bg-green-50">
                  <td className="px-3 py-2 capitalize">{value.cropName}</td>
                  <td className="px-3 py-2 capitalize">{value.Pickup_Location}</td>
                  <td className="px-3 py-2">₹{value.cropPrice}</td>
                  <td className="px-3 py-2">{value.cropQuantity} kg</td>
                  <td className="px-3 py-2">{value.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleClick1(value.User_Id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                      Know Farmer
                    </button>
                    <button
                    onClick={()=>handlechat(value.User_Id)}
    
    className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
  >
    Chat with Farmer
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {farmerdetail && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
                <button
                  onClick={() => setFarmerdetail("")}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>

                <h2 className="text-xl font-bold text-green-700 mb-4">👨‍🌾 Farmer Details</h2>
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
  );
};

export default ButcropOnly;

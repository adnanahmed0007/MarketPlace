import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Package, MapPin, Phone, IndianRupee, Weight, Search, User, Mail, Home, Calendar, MessageCircle } from 'lucide-react';


const ButcropOnly = () => {
  const [cropName, setCropname] = useState('');
  const [arraya, setArray] = useState([]);
  const [farmerdetail, setFarmerdetail] = useState("");
  const navigate = useNavigate();
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
      if (response && response.status == 200) {
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
  async function handlechat(id) {
    navigate(`/chat/${id}`)


  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">

      <div className="max-w-7xl w-full mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Search Crops by Name
          </h1>
          <p className="text-xl text-gray-600">
            Find available crops and connect directly with farmers
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-center">

            {/* Crop Name */}
            <div className="relative flex-1 w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter crop name (e.g. Wheat)"
                onChange={(e) => setCropname(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="group relative px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>

          </form>
        </div>

        {/* Results */}
        {arraya.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Crop</th>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Quantity</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {arraya.map((value, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                        {value.cropName}
                      </td>

                      <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {value.Pickup_Location}
                      </td>

                      <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                        ₹{value.cropPrice}
                      </td>

                      <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                        <Weight className="w-4 h-4 text-teal-600" />
                        {value.cropQuantity} kg
                      </td>

                      <td className="px-6 py-4 text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cyan-600" />
                        {value.phoneNumber}
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleClick1(value.User_Id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          View Farmer
                        </button>

                        <button
                          onClick={() => handlechat(value.User_Id)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Crops Found
            </h3>
            <p className="text-gray-500">
              Try searching with a different crop name
            </p>
          </div>
        )}

        {/* Farmer Detail Modal */}
        {farmerdetail && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">

              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Farmer Information
                </h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-gray-800">

                <p><strong>Name:</strong> {farmerdetail.fullName}</p>
                <p><strong>Email:</strong> {farmerdetail.email}</p>
                <p><strong>Phone:</strong> {farmerdetail.phoneNumber}</p>
                <p><strong>Age:</strong> {farmerdetail.age}</p>
                <p><strong>Address:</strong> {farmerdetail.address}</p>

              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t">
                <button
                  onClick={() => setFarmerdetail("")}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );

};

export default ButcropOnly;

import React, { useState } from 'react';
import axios from 'axios';
import { Package, MapPin, Phone, IndianRupee, Weight, Search, User, Mail, Home, Calendar } from 'lucide-react';

const BuyerLocationpricecropname = () => {
  const [cropName, setCropName] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [Location_Buyer, setPickupLocation] = useState('');
  const [arrayget, setArrayget] = useState([]);
  const [buyerArray, setBuyerInfodetail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (cropName && cropQuantity && Location_Buyer) {
        const response = await axios.post(
          'http://localhost:9808/api/sell/farmer/data/cropname/cropQunatuty/place',
          { cropName, cropQuantity, Location_Buyer },
          { withCredentials: true }
        );

        if (response && response.status === 200) {
          alert(response.data.message);
          setArrayget(response.data.response1);
        }
      } else {
        alert('Please fill all the details');
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert('Enter correct city name or nearby metro city');
      } else {
        alert('Server error');
      }
    }
  }

  async function handleClick(userId) {
    try {
      const response = await axios.post(
        `http://localhost:9808/api/sell/farmer/data/details/buyers/${userId}`,
        {},
        { withCredentials: true }
      );

      if (response && response.status === 200) {
        alert(response.data.message);
        setBuyerInfodetail(response.data.findbuyerId);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Find Buyers by Crop, Quantity & Location
          </h1>
          <p className="text-xl text-gray-600">Search for buyers matching your crop details</p>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50 animate-fade-in-up">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-5">
            {/* Crop Name */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter crop name"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Crop Quantity */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Weight className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="number"
                placeholder="Enter crop quantity"
                value={cropQuantity}
                onChange={(e) => setCropQuantity(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Location */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter buyer location"
                value={Location_Buyer}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button - Full Width on Mobile */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Buyers
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </form>
        </div>

        {/* Results Table */}
        {arrayget.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Crop Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left font-semibold">Location</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayget.map((value, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Package className="w-4 h-4 text-emerald-700" />
                          </div>
                          <span className="font-medium text-gray-900">{value.cropName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Weight className="w-4 h-4 text-teal-600" />
                          <span>{value.cropQuantity} kg</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <IndianRupee className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold">₹{value.cropPrice}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-cyan-600" />
                          <span>{value.phoneNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{value.Location_Buyer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleClick(value.User_Id)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-emerald-700">{arrayget.length}</span> buyer(s)
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50 animate-fade-in-up">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Buyers Found</h3>
            <p className="text-gray-500">Try searching with different criteria</p>
          </div>
        )}

        {/* Buyer Info Modal */}
        {buyerArray && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden animate-fade-in-up">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Buyer Information
                </h2>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <User className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">{buyerArray.fullName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-900">{buyerArray.age} years</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Mail className="w-5 h-5 text-cyan-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 break-all">{buyerArray.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold text-gray-900">{buyerArray.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Home className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-900">{buyerArray.address}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => setBuyerInfodetail('')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
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

export default BuyerLocationpricecropname;
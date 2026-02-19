import React, { useState } from 'react';
import axios from 'axios';
import {
  Package,
  Weight,
  MapPin,
  Phone,
  IndianRupee,
  Search,
  User,
  Mail,
  Home,
  Calendar,
} from 'lucide-react';

const Buyqunatitycropname = () => {
  const [cropName, setCropName] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [arrayget, setarrayget] = useState([]);
  const [buyerArray, setBuyerArray] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9808/api/sell/farmer/data/cropname/cropQunatuty',
        { cropName, cropQuantity },
        { withCredentials: true }
      );

      if (response && response.status === 200) {
        alert(response.data.message);
        setarrayget(response.data.datafindquantity);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
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
        setBuyerArray(response.data.findbuyerId);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert("Cookies expired");
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Search Crops by Name & Minimum Quantity
          </h1>
          <p className="text-xl text-gray-600">
            Find sellers matching your required quantity
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

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
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Quantity */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Weight className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="number"
                placeholder="Enter minimum quantity (kg)"
                value={cropQuantity}
                onChange={(e) => setCropQuantity(e.target.value)}
                min="1"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Crops
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {arrayget.length > 0 ? (
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
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayget.map((value, index) => (
                    <tr key={index} className="border-b hover:bg-emerald-50">
                      <td className="px-6 py-4 flex items-center gap-2 font-medium">
                        <Package className="w-4 h-4 text-emerald-600" />
                        {value.cropName}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {value.Location_Buyer}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        ₹{value.cropPrice}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Weight className="w-4 h-4 text-teal-600" />
                        {value.cropQuantity} kg
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cyan-600" />
                        {value.phoneNumber}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleClick(value.User_Id)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition-all"
                        >
                          View Details
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
            <h3 className="text-2xl font-bold text-gray-700">No Data Found</h3>
            <p className="text-gray-500">Try different quantity or crop name</p>
          </div>
        )}

        {/* Buyer Modal */}
        {buyerArray && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-5">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Buyer Information
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <p><strong>Name:</strong> {buyerArray.fullName}</p>
                <p><strong>Age:</strong> {buyerArray.age}</p>
                <p><strong>Email:</strong> {buyerArray.email}</p>
                <p><strong>Phone:</strong> {buyerArray.phoneNumber}</p>
                <p><strong>Address:</strong> {buyerArray.address}</p>
              </div>

              <div className="px-6 py-4 bg-gray-50">
                <button
                  onClick={() => setBuyerArray('')}
                  className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:scale-[1.02] transition-all"
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

export default Buyqunatitycropname;

import axios from "axios";
import React, { useState } from "react";
import { Search, Wheat, IndianRupee, Weight, Phone, MapPin } from "lucide-react";

const BuyerBidsCropqisename = () => {
  const [cropName, setCropname] = useState("");
  const [cropArray, setCropArray] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9808/api/buy/all/cropwise/buyers/bids",
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
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
      } else {
        alert("Cookies expired, please re-login");
      }
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 flex justify-center">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            View Buyer Bids
          </h2>
          <p className="text-gray-400 mt-2">
            Search crop-wise buyer offers
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 mb-10">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">

            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter crop name (e.g. wheat)"
                value={cropName}
                onChange={(e) => setCropname(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition-all"
            >
              Search
            </button>

          </form>
        </div>

        {/* Results */}
        {cropArray.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 overflow-x-auto">

            <h3 className="text-2xl font-bold text-emerald-700 mb-6">
              Available Buyer Bids
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-700">
                  <th className="text-left py-3">Crop</th>
                  <th className="text-left py-3">Price</th>
                  <th className="text-left py-3">Quantity</th>
                  <th className="text-left py-3">Phone</th>
                  <th className="text-left py-3">Location</th>
                </tr>
              </thead>

              <tbody>
                {cropArray.map((value, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-emerald-50 transition"
                  >
                    <td className="py-3 flex items-center gap-2 capitalize">
                      <Wheat className="w-4 h-4 text-emerald-600" />
                      {value.cropName}
                    </td>

                    <td className="py-3 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      {value.cropPrice}
                    </td>

                    <td className="py-3 flex items-center gap-2">
                      <Weight className="w-4 h-4 text-blue-600" />
                      {value.cropQuantity} kg
                    </td>

                    <td className="py-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      {value.phoneNumber}
                    </td>

                    <td className="py-3 flex items-center gap-2 capitalize">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {value.Location_Buyer}
                    </td>
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
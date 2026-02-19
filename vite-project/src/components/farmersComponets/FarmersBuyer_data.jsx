import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Package,
  IndianRupee,
  Weight,
  Phone,
  Database
} from "lucide-react";

const FarmersBuyer_data = () => {
  const [array, setArray] = useState([]);

  async function handleSubmit() {
    try {
      const response = await axios.get(
        "http://localhost:9808/api/sell/farmer/data",
        { withCredentials: true }
      );

      if (response.data.response1.length == 0) {
        alert("No data is present");
      } else {
        if (response && response.status == 200) {
          setArray(response.data.response1);
          console.log(response.data.response1);
        }
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        alert("Cookies expired, relogin again");
      }
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Farmers Crop Listings
          </h1>
          <p className="text-lg text-gray-600">
            View all buyer requests for your crops
          </p>
        </div>

        {/* Button Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50 text-center">
          <button
            onClick={handleSubmit}
            className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <Database className="w-5 h-5" />
              Fetch Buyer Data
            </span>
          </button>
        </div>

        {/* Table Section */}
        {array.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Location</th>
                    <th className="px-6 py-4 text-left font-semibold">Crop Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                    <th className="px-6 py-4 text-left font-semibold">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {array.map((value, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          {value.Location_Buyer}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <Package className="w-4 h-4 text-emerald-600" />
                          {value.cropName}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          ₹{value.cropPrice}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Weight className="w-4 h-4 text-teal-600" />
                          {value.cropQuantity} kg
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-cyan-600" />
                          {value.phoneNumber}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-emerald-700">
                  {array.length}
                </span>{" "}
                record(s)
              </p>
            </div>

          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Data Loaded
            </h3>
            <p className="text-gray-500">
              Click "Fetch Buyer Data" to load records
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default FarmersBuyer_data;

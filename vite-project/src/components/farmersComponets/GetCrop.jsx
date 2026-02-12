import React, { useState } from "react";
import axios from "axios";
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";
import {
  Search,
  Package,
  MapPin,
  Phone,
  IndianRupee,
  Weight
} from "lucide-react";

const GetCrop = () => {
  const [cropName, setCropName] = useState("");
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleClick() {
    try {
      if (!cropName.trim()) {
        alert("Please enter the crop name");
        return;
      }

      setLoading(true);
      setSearched(true);

      const response = await axios.post(
        "http://localhost:9808/api/sell/dtacrop",
        { cropName: cropName.trim().toLowerCase() },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setArray(response.data.find_Crop || []);
      }

      setCropName("");
    } catch (e) {
      alert("Crop not found or something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
            Search Fresh Crops
          </h1>
          <p className="text-gray-600 text-lg">
            Connect directly with farmers and buy at best prices
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-10">

          <div className="relative w-full md:w-96">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              type="text"
              placeholder="Enter crop name (e.g., wheat)"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition bg-gray-50"
            />
          </div>

          <button
            onClick={handleClick}
            disabled={loading}
            className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5 group-hover:rotate-12 transition" />
              {loading ? "Searching..." : "Search Crop"}
            </span>
          </button>
        </div>

        {/* No Result */}
        {searched && !loading && array.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No crops found.
          </div>
        )}

        {/* Results - Single Horizontal Row Style */}
        <div className="space-y-6">

          {array.length > 0 &&
            array.map((value) => (
              <div
                key={value._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-6 flex items-center justify-between hover:shadow-2xl transition duration-300"
              >
                <div className="flex items-center gap-16 w-full">

                  <div className="flex items-center gap-2 min-w-[150px]">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold">
                      {value.cropName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[160px]">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{value.Pickup_Location}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[100px] font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    <span>{value.cropPrice}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Weight className="w-5 h-5 text-teal-600" />
                    <span>{value.cropQuantity} kg</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[160px] text-blue-700 font-medium">
                    <Phone className="w-5 h-5" />
                    <span>{value.phoneNumber}</span>
                  </div>
                </div>
              </div>
            ))}

        </div>

        {/* Counter */}
        {array.length > 0 && (
          <div className="mt-8 text-center text-gray-700 font-semibold">
            Showing{" "}
            <span className="text-emerald-700">{array.length}</span> result(s)
          </div>
        )}

      </div>
    </div>
  );
};

export default GetCrop;

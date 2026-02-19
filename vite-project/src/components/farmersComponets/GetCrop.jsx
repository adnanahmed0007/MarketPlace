import React, { useState } from "react";
import axios from "axios";
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
      alert("Crop not found or something went wrong " + e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Search Fresh Crops
          </h1>
          <p className="text-lg text-gray-600">
            Connect directly with farmers and buy at best prices
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-10 border border-white/50">

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">

            <div className="relative w-full md:w-96 group">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition" />
              <input
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                type="text"
                placeholder="Enter crop name (e.g., wheat)"
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition bg-gray-50 focus:bg-white"
              />
            </div>

            <button
              onClick={handleClick}
              disabled={loading}
              className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 font-semibold disabled:opacity-60"
            >
              <span className="flex items-center gap-2">
                <Search className={`w-5 h-5 ${loading ? "animate-pulse" : "group-hover:rotate-12 transition"}`} />
                {loading ? "Searching..." : "Search Crop"}
              </span>
            </button>

          </div>
        </div>

        {/* No Results */}
        {searched && !loading && array.length === 0 && (
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

        {/* Results */}
        {array.length > 0 && (
          <div className="space-y-6">
            {array.map((value) => (
              <div
                key={value._id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-5 gap-6 w-full text-gray-700">

                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold">{value.cropName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{value.Pickup_Location}</span>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-emerald-700">
                    <IndianRupee className="w-5 h-5" />
                    <span>{value.cropPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Weight className="w-5 h-5 text-teal-600" />
                    <span>{value.cropQuantity} kg</span>
                  </div>

                  <div className="flex items-center gap-2 text-blue-700 font-medium">
                    <Phone className="w-5 h-5" />
                    <span>{value.phoneNumber}</span>
                  </div>

                </div>
              </div>
            ))}

            {/* Counter */}
            <div className="text-center mt-8 text-gray-700 font-semibold">
              Showing{" "}
              <span className="text-emerald-700">{array.length}</span> result(s)
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GetCrop;

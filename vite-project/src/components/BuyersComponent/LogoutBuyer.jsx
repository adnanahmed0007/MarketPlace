import axios from "axios";
import React, { useState } from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutBuyer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:9808/api/auth/buy/buyer/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/loginbuyers"); // redirect after logout
      }
    } catch (e) {
      alert("Logout failed. Try again.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center text-white">

        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3">
          Logout Confirmation
        </h2>

        <p className="text-gray-300 mb-8">
          Are you sure you want to logout from your buyer account?
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleClick}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-60"
          >
            <LogOut className="w-5 h-5" />
            {loading ? "Logging out..." : "Logout"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default LogoutBuyer;

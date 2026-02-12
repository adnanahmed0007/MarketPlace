import axios from 'axios';
import React from 'react';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg"
const LogoutBuyer = () => {
  async function handleClick() {
    try {
      const response = await axios.post(
        "http://localhost:9808/api/auth/buy/buyer/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response && response.status === 200) {
        alert(response.data.message);
        console.log(response.data.message);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        alert(e.response.message);
        console.log(e);
      }
    }
  }

  return (
      <div
               className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-6 flex flex-col items-center"
               style={{ backgroundImage: `url(${img})` }}
             >
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition duration-300"
        >
          Logout Buyer
        </button>
      </div>
    </div>
  );
};

export default LogoutBuyer;

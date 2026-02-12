import React, { useState } from 'react';
import axios from 'axios';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const FarmersBuyer_data = () => {
  const [array, setArray] = useState([]);

  async function handleSubmit() {
    try {
      const response = await axios.get("http://localhost:9808/api/sell/farmer/data", {
        withCredentials: true,
      });
      if(response.data.response1.length==0)
      {
        alert("np data is presnet")
      }
     else{
      if(response&&response.status==200)
      {
        
        setArray(response.data.response1);
        if(setArray.length==0)
        {
          alert("no data is presnet")
        }
        console.log(response.data.response1);
      }
    }
      
    } catch (error) {
      if(error.response&&error.response.status==400)
      {
        alert("cookies expired reloging again")
        
      }
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen p-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl max-w-6xl mx-auto p-6">
        {/* Centered Heading */}
        <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
          🌾 Farmers' Crop Listings
        </h1>

        {/* Centered Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition text-lg font-semibold"
          >
            Fetch Buyer Data
          </button>
        </div>

        {/* Scrollable Table */}
        {array.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto rounded-lg shadow-inner">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead className="bg-green-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Crop Name</th>
                  <th className="px-6 py-3">Crop Price</th>
                  <th className="px-6 py-3">Crop Quantity</th>
                  <th className="px-6 py-3">Phone Number Buyer</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {array.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-green-50">
                    <td className="px-6 py-4">{value.Location_Buyer}</td>
                    <td className="px-6 py-4">{value.cropName}</td>
                    <td className="px-6 py-4">₹{value.cropPrice}</td>
                    <td className="px-6 py-4">{value.cropQuantity} kg</td>
                    <td className="px-6 py-4">{value.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-lg text-gray-600 mt-6">
            Submit to get data
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmersBuyer_data;

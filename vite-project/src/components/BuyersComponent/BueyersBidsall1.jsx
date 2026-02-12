import axios from 'axios';
import React, { useState } from 'react';
import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const BueyersBidsall1 = () => {
  const [arrayget, setArray] = useState([]);

  async function handleClick() {
    try {
      const response1 = await axios.get("http://localhost:9808/api/buy/all/bids/buyer", {
        withCredentials: true,
      });
      if (response1 && response1.status === 200) {
        alert(response1.data.mesaage);
      
        setArray(response1.data.response);
      
      }
    } catch (e) {
       if (e.response && e.response.status === 400) {
   
        alert(e.response.data.
message
);
        console.log(e);
      }
    }
  }
  async function  handleClick1(UserId) {
    try{
        const responseDelete=await axios.delete(`http://localhost:9808/api/buy/buyer/delte/${UserId}`,{withCredentials:true})
        if(responseDelete&&responseDelete.status==200)
        {
alert(responseDelete.data.
    message
    )
            console.log(responseDelete)
        }

    }
    catch(e)
    {
        console.log(e);
    }
    
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center pt-6 px-4"
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-white px-4 py-2 rounded-xl shadow">
        📋 All Buyer Bids
      </h1>

      <button
        onClick={handleClick}
        className="mb-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md shadow-md transition"
      >
        Show Bids
      </button>

      <div className="w-full max-w-4xl bg-white bg-opacity-90 shadow-md rounded-lg overflow-y-auto" style={{ maxHeight: '500px' }}>
        {arrayget.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Buyer Location</th>
                <th className="px-3 py-2 text-left">Crop Name</th>
                <th className="px-3 py-2 text-left">Crop Price</th>
                <th className="px-3 py-2 text-left">Crop Quantity</th>
                <th className="px-3 py-2 text-left">Phone Number</th>
                <th className="px-3 py-2 text-left">Delete </th> 
              </tr>
            </thead>
            <tbody>
              {arrayget.map((value, index) => (
                <tr key={index} className="border-b hover:bg-green-50">
                  <td className="px-3 py-2 capitalize">{value.Location_Buyer}</td>
                  <td className="px-3 py-2 capitalize">{value.cropName}</td>
                  <td className="px-3 py-2">₹{value.cropPrice}</td>
                  <td className="px-3 py-2">{value.cropQuantity} kg</td>
                  <td className="px-3 py-2">{value.phoneNumber}</td>
                  <td className="px-3 py-2">
                    <button   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200" onClick={()=>handleClick1(value._id)}>
                         Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 p-4">No bids found</p>
        )}
      </div>
    </div>
  );
};

export default BueyersBidsall1;

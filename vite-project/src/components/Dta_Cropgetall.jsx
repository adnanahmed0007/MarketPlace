import React, { useState } from 'react';
import axios from 'axios';

const Dta_Cropgetall = () => {
  const [array, setArray] = useState([]);

  async function handleClick() {
    try{
    const response = await axios.get("http://localhost:9808/api/sell/datagett", {
      withCredentials: true,
    });

    if (response) {
      setArray(response.data.datagett);
    }
  }
  catch(e)
  {
    console.log(e);
    alert("no data to show")
  }
    
  }
   async function  handleClick1(id) {
    const response=await axios.delete(`http://localhost:9808/api/sell//deletecrop/${id}`,
      {
        withCredentials:true,
      }
    
    )
    if(response)
    {
      alert("deleted")
    }
    
   }
  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center py-10 px-4">
      <button 
        onClick={handleClick} 
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Fetch Selling Crops
      </button>

      {/* Responsive Table Wrapper */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Crop Name</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Pickup Location</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {array.length > 0 ? (
                array.map((value, index) => (
                  <tr key={index} className="border-b hover:bg-green-50 text-gray-700">
                    <td className="px-4 py-3">{value.cropName}</td>
                    <td className="px-4 py-3">{value.cropQuantity} kg</td>
                    <td className="px-4 py-3">{value.Pickup_Location}</td>
                    <td className="px-4 py-3">{value.phoneNumber}</td>
                    <td className="px-4 py-3">₹{value.cropPrice}</td>
                    {/* Delete Button in the same row */}
                    <td className="px-4 py-3">
                      <button onClick={()=>handleClick1(value._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-600">
                    No crop data available. Click the button to fetch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dta_Cropgetall;

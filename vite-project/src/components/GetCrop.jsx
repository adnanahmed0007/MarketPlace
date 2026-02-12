 
 import React, { useState } from 'react';
 import axios from 'axios';
 
 const GetCrop = () => {
     const [cropName, setCropName] = useState("");
     const [array, setArray] = useState([]);
 
     async function handleClick() {
         try {
             if (cropName) {
                 const response = await axios.post("http://localhost:9808/api/sell/dtacrop", {
                     cropName:cropName.trim().toLowerCase(),
                 }, {
                     withCredentials: true,
                 });
 
                 if (response) {
                     console.log(response);
                     console.log(response.data.find_Crop);
                     setArray(response.data.find_Crop);
                 }
             } else {
                 alert("Enter the crop name");
             }
         } catch (e) {
             console.log(e);
         }
     }
 
     return (
         <div className="min-h-screen bg-green-100 flex flex-col items-center py-10">
             <div className="mb-6">
                 <input
                     onChange={(e) => setCropName(e.target.value)}
                     type="text"
                     placeholder="Enter the crop name"
                     className="px-4 py-2 border border-green-500 rounded-md focus:ring-2 focus:ring-green-600 outline-none"
                 />
             </div>
             <button
                 onClick={handleClick}
                 className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
             >
                 Submit
             </button>
 
             {array.length > 0 && (
                 <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                     <table className="w-full border-collapse">
                         <thead className="bg-green-600 text-white">
                             <tr>
                                 <th className="px-4 py-3 text-left">Crop Name</th>
                                 <th className="px-4 py-3 text-left">Pickup Location</th>
                                 <th className="px-4 py-3 text-left">Price</th>
                                 <th className="px-4 py-3 text-left">Quantity</th>
                                 <th className="px-4 py-3 text-left">Phone Number</th>
                             </tr>
                         </thead>
                         <tbody>
                             {array.map((value, index) => (
                                 <tr key={index} className="border-b hover:bg-green-50">
                                     <td className="px-4 py-3">{value.cropName}</td>
                                     <td className="px-4 py-3">{value.Pickup_Location}</td>
                                     <td className="px-4 py-3">₹{value.cropPrice}</td>
                                     <td className="px-4 py-3">{value.cropQuantity} kg</td>
                                     <td className="px-4 py-3">{value.phoneNumber}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             )}
         </div>
     );
 };
 
 export default GetCrop;
 
 
 import React, { useState } from 'react';
 import axios from "axios";
 import img from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";
 
 const BuyersBid = () => {
   const [cropName, setCropName] = useState("");
   const [cropQuantity, setCropQuantity] = useState(0);
   const [Location_Buyer, setLocationBuyer] = useState("");
   const [cropPrice, SetCropPrice] = useState(0);
   const [getdata, setdata] = useState([]);
 
   async function handleSubmit(e) {
     e.preventDefault();
     try {
       if (cropName && cropQuantity && Location_Buyer && cropPrice) {
         const response = await axios.post("http://localhost:9808/api/buy/buyer/bid", {
           cropName, cropPrice, cropQuantity, Location_Buyer
         }, { withCredentials: true });
         if(response&&response.status==200)
         {
          alert("we place your bid")
          console.log(response.data.chcek);
          setdata(response.data.chcek);
         }
          
         
       } else {
         alert("write all the detills");
       }
     } catch (e) {
       if (e.response && e.response.status === 400) {
         alert("something went wrogn");
       }
       console.log(e);
     }
   }
 
   return (
     <div
       className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4 py-10"
       style={{ backgroundImage: `url(${img})` }}
     >
       <form onSubmit={handleSubmit} className="bg-gray shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
         <h2 className="text-2xl font-semibold text-center text-gray-700">Place Your Bid</h2>
 
         <div>
           <label htmlFor="cropName" className="block text-gray-900 font-medium">Crop Name:</label>
           <input
             onChange={(e) => setCropName(e.target.value)}
             placeholder='enter the cropname'
             type="text"
             id="cropName"
             name="cropName"
             required
             className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
           />
         </div>
 
         <div>
           <label htmlFor="cropQuantity" className="block text-gray-900 font-medium">Crop Quantity (kg):</label>
           <input
             onChange={(e) => setCropQuantity(e.target.value)}
             placeholder='enter the cropquantity'
             type="number"
             id="cropQuantity"
             name="cropQuantity"
             required
             className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
           />
         </div>
 
         <div>
           <label htmlFor="Location_Buyer" className="block text-gray-900 font-medium">Location (Buyer):</label>
           <input
             onChange={(e) => setLocationBuyer(e.target.value)}
             placeholder='enter your location'
             type="text"
             id="Location_Buyer"
             name="Location_Buyer"
             required
             className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
           />
         </div>
 
         <div>
           <label htmlFor="cropPrice" className="block text-gray-900 font-medium">Crop Price (₹):</label>
           <input
             onChange={(e) => SetCropPrice(e.target.value)}
             placeholder='enter the cropprice'
             type="number"
             id="cropPrice"
             name="cropPrice"
             step="0.01"
             required
             className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
           />
         </div>
 
         <button
           type="submit"
           className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition duration-200"
         >
           Submit
         </button>
       </form>
 
       <div className="mt-6 w-full max-w-md bg-white shadow-md rounded-xl p-4">
         {getdata &&  
           <div  className="space-y-1 text-gray-700 mb-4">
             <p><strong>Crop Name:</strong> {getdata.cropName}</p>
             <p><strong>Crop Price:</strong> ₹{getdata.cropPrice}</p>
             <p><strong>Crop Quantity:</strong> {getdata.cropQuantity} kg</p>
             <p><strong>Location:</strong> {getdata.Location_Buyer}</p>
             <p><strong>Phone:</strong> {getdata.phoneNumber}</p>
           </div>
         }
       </div>
     </div>
   );
 };
 
 export default BuyersBid;
 

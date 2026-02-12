import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-white text-2xl font-bold mb-4 md:mb-0">Farmer Portal</h1>
        <nav className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4">
          <Link to="/" className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white rounded-md shadow hover:bg-blue-700 transition">
            Home
          </Link>
          <Link to="/login" className="px-5 py-2 text-sm md:text-base bg-red-500 text-white rounded-md shadow hover:bg-red-700 transition">
            Login
          </Link>
          <Link to="/sign" className="px-5 py-2 text-sm md:text-base bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-700 transition">
            Sign Up
          </Link>
          
          <Link to="/addcrops" className="px-5 py-2 text-sm md:text-base bg-teal-500 text-white rounded-md shadow hover:bg-teal-700 transition">
            Add Crop
          </Link>
          <Link to="/sellingcrops" className="px-5 py-2 text-sm md:text-base bg-pink-500 text-white rounded-md shadow hover:bg-pink-700 transition">
            Yours Selling Crops
          </Link>
          <Link to="/getcropdetails" className="px-5 py-2 text-sm md:text-base bg-gray-500 text-white rounded-md shadow hover:bg-gray-700 transition">
            Crop Details
          </Link>
          <Link to="/getalldata" className="px-5 py-2 text-sm md:text-base bg-orange-500 text-white rounded-md shadow hover:bg-orange-700 transition">
            All Crop Data
          </Link>
          <Link to="/userInfo" className="px-5 py-2 text-sm md:text-base bg-purple-500 text-white rounded-md shadow hover:bg-purple-700 transition">
            User Info
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;

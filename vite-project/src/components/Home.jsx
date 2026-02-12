import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "./HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg";

const Home = () => {
  return (
    <div className="bg-green-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img src={img1} alt="Farmer's Market" className="w-full h-[110vh] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-2">Welcome to Farmer's Market</h1>
          <p className="text-lg mb-4">Sell your crops directly & get fair prices</p>
          <Link to="/sign" className="bg-yellow-500 px-6 py-2 text-lg font-semibold rounded-lg hover:bg-yellow-600">
            Start Selling
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Why Choose Us?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our platform empowers farmers by providing a **direct-to-consumer marketplace**. Sell your crops without middlemen and get the best market price!
        </p>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto py-12 px-4 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Fair Prices</h3>
          <p className="text-gray-600">Sell directly to buyers & avoid middlemen commissions.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Easy to Use</h3>
          <p className="text-gray-600">Simple platform designed for farmers with **no tech knowledge**.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Secure Payments</h3>
          <p className="text-gray-600">Get paid securely & on time without any risk.</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-700 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Thousands of Farmers Today!</h2>
        <p className="text-lg mb-6">Start selling your crops & maximize your profits.</p>
        <Link to="/sign" className="bg-yellow-500 px-6 py-3 text-lg font-semibold rounded-lg hover:bg-yellow-600">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;

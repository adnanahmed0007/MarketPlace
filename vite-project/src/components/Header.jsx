import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sprout, ChevronDown } from 'lucide-react';

const Header = () => {
  const [showFarmers, setShowFarmers] = useState(false);
  const [showBuyers, setShowBuyers] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [farmersDropdownOpen, setFarmersDropdownOpen] = useState(false);
  const [buyersDropdownOpen, setBuyersDropdownOpen] = useState(false);

  const linkClasses = "px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm";

  const farmerLinks = [
    { to: "/login", label: "Login" },
    { to: "/sign", label: "Sign Up" },
    { to: "/aboutfarmer", label: "About Farmer" },
    { to: "/addcrops", label: "Add Crop" },
    { to: "/sellingcrops", label: "Your Crops" },
    { to: "/getcropdetails", label: "Crop Details" },
    { to: "/getalldata", label: "All Crops" },
    { to: "/userInfo", label: "User Info" },
    { to: "/getaboutfarmer", label: "Your About" },
    { to: "/upadtecrop", label: "Update Crop" },
    { to: "/farmersbuyerdata", label: "All Buyers" },
    { to: "/buyercropnamebid", label: "Buy CropName" },
    { to: "/buyercropnamelocation", label: "Buyer Location" },
    { to: "/buyercropnamequantity", label: "Buyer Quantity" },
    { to: "/logout", label: "Logout" },
  ];

  const buyerLinks = [
    { to: "/loginbuyers", label: "Login" },
    { to: "/signupbuyers", label: "Sign Up" },
    { to: "/buycroponly", label: "Buy Crop" },
    { to: "/buycropnamelocation", label: "By Location" },
    { to: "/buycropnamequantity", label: "By Quantity" },
    { to: "/buylocationquantity", label: "Location & Quantity" },
    { to: "/buyerinfo", label: "Buyer Info" },
    { to: "/buyerbid", label: "Place Bid" },
    { to: "/buyerallbisds", label: "Your Bids" },
    { to: "/allthebuyersBids", label: "All Bids" },
    { to: "/buyerbidscropwise", label: "Cropwise Bids" },
    { to: "/all/chats/buyer", label: "Messages" },
    { to: "/buyerlogout", label: "Logout" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 shadow-xl backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md group-hover:scale-110 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FarmerConnect</span>
          </Link>

          {/* Desktop Portal Toggles */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => {
                setShowFarmers(!showFarmers);
                setShowBuyers(false);
              }}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${showFarmers
                ? 'bg-white text-emerald-700 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              🌾 Farmer Portal
            </button>
            <button
              onClick={() => {
                setShowBuyers(!showBuyers);
                setShowFarmers(false);
              }}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${showBuyers
                ? 'bg-white text-cyan-700 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              🛒 Buyer Portal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        {(showFarmers || showBuyers) && (
          <nav className="hidden lg:flex items-center gap-3 mt-4 pt-4 border-t border-white/20 flex-wrap">
            <Link to="/" className={linkClasses}>
              Home
            </Link>

            {showFarmers && farmerLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClasses}>
                {link.label}
              </Link>
            ))}

            {showBuyers && buyerLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClasses}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/20 space-y-4 animate-slide-down">
            {/* Mobile Portal Toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFarmersDropdownOpen(!farmersDropdownOpen);
                  setBuyersDropdownOpen(false);
                }}
                className="flex-1 flex items-center justify-between px-4 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                🌾 Farmer Portal
                <ChevronDown className={`w-5 h-5 transition-transform ${farmersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setBuyersDropdownOpen(!buyersDropdownOpen);
                  setFarmersDropdownOpen(false);
                }}
                className="flex-1 flex items-center justify-between px-4 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                🛒 Buyer Portal
                <ChevronDown className={`w-5 h-5 transition-transform ${buyersDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {farmersDropdownOpen && (
                <div className="space-y-2 pl-4 animate-fade-in">
                  {farmerLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {buyersDropdownOpen && (
                <div className="space-y-2 pl-4 animate-fade-in">
                  {buyerLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
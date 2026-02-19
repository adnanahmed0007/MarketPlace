import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, Shield, Users, ArrowRight, Leaf } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-gray-900 to-black p-6 overflow-hidden">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className="text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-emerald-200/50 shadow-lg">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-900">India's Premier Agri-Marketplace</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Empowering Farmers,<br />Connecting Markets
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Direct trade platform eliminating middlemen. Fair prices for farmers, fresh produce for buyers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/sign"
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  I'm a Farmer
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                to="/signupbuyers"
                className="group relative px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 border-2 border-emerald-200"
              >
                <span className="flex items-center gap-2">
                  I'm a Buyer
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              {[
                { value: '10K+', label: 'Active Farmers' },
                { value: '5K+', label: 'Verified Buyers' },
                { value: '₹50Cr+', label: 'Trade Volume' },
                { value: '98%', label: 'Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-700">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose FarmerConnect?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for transparency, designed for growth, powered by trust
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <TrendingUp className="w-12 h-12" />,
              title: 'Direct Market Access',
              description: 'Sell directly to buyers without intermediaries. Keep 100% of your profits and set your own prices.',
              gradient: 'from-emerald-500 to-teal-500'
            },
            {
              icon: <Shield className="w-12 h-12" />,
              title: 'Secure Transactions',
              description: 'Bank-grade security with escrow protection. Your payments are safe and guaranteed.',
              gradient: 'from-teal-500 to-cyan-500'
            },
            {
              icon: <Users className="w-12 h-12" />,
              title: 'Transparent Bidding',
              description: 'Real-time bidding system. See all offers and choose the best deal for your crops.',
              gradient: 'from-cyan-500 to-blue-500'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              <div className="mt-6 flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 text-white animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Start trading in minutes with our streamlined process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up as farmer or buyer' },
              { step: '02', title: 'List Your Crops', desc: 'Add details and photos' },
              { step: '03', title: 'Receive Bids', desc: 'Get competitive offers' },
              { step: '04', title: 'Complete Trade', desc: 'Secure payment & delivery' }
            ].map((item, index) => (
              <div
                key={index}
                className="relative text-center text-white animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl">
                    <span className="text-3xl font-bold">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-white/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-emerald-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 md:p-16 shadow-2xl animate-fade-in-up">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative text-center text-white space-y-6">
            <Sprout className="w-16 h-16 mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-xl text-emerald-50 max-w-2xl mx-auto">
              Join thousands of farmers and buyers who trust our platform for fair, transparent trading
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                to="/sign"
                className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                Start as Farmer
              </Link>
              <Link
                to="/signupbuyers"
                className="px-8 py-4 bg-emerald-800 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 border-2 border-white/30"
              >
                Start as Buyer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-bold text-white">FarmerConnect</span>
          </div>
          <p className="text-sm">© 2026 FarmerConnect. Empowering agriculture through technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
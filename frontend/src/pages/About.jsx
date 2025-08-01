import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-white text-gray-700 max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#E53935]">
          ABOUT <span className="text-gray-900">ZOOMIGO</span>
        </h1>
        <div className="w-20 h-1 bg-[#E53935] mx-auto mt-4"></div>
      </div>

      {/* Image + Description - Reversed layout for better visual flow */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-16">
        {/* Image container with improved styling */}
        <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
          <img
            className="w-full h-auto object-cover min-h-[300px]"
            src={assets.pointing_man} 
            alt="Zoomigo Rental Service"
          />
          {/* Optional overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E53935]/10 to-transparent"></div>
        </div>

        {/* Text content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-bold text-[#E53935]">Zoomigo</span>, your premier choice for reliable and affordable car rentals. We're committed to providing exceptional service that puts you in control of your journey.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you need a vehicle for business travel, family vacations, or daily commuting, Zoomigo delivers a seamless rental experience with our modern fleet, transparent pricing, and 24/7 customer support.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-8">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To revolutionize car rentals through innovative technology, exceptional service, and a customer-first approach that makes every journey memorable.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          WHY CHOOSE <span className="text-[#E53935]">ZOOMIGO</span>
        </h2>
        <div className="w-20 h-1 bg-[#E53935] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FFDAD8]">
          <div className="text-[#E53935] text-4xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Options</h3>
          <p className="text-gray-600">
            Choose from our diverse fleet of vehicles with flexible rental periods to match your schedule perfectly.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FFDAD8]">
          <div className="text-[#E53935] text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Best Value</h3>
          <p className="text-gray-600">
            Competitive pricing with no hidden fees - just honest, transparent rates for quality vehicles.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#FFDAD8]">
          <div className="text-[#E53935] text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Booking</h3>
          <p className="text-gray-600">
            Our intuitive platform lets you reserve your perfect vehicle in just a few taps.
          </p>
        </div>
      </div>

      {/* Additional Section */}
      <div className="bg-[#FFF1F0] p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Commitment</h2>
        <p className="text-center text-lg max-w-3xl mx-auto">
          At Zoomigo, we're dedicated to providing safe, clean, and well-maintained vehicles with exceptional customer service at every step of your rental experience.
        </p>
      </div>
    </div>
  );
};

export default About;
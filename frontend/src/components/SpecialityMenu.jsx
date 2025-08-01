import React from 'react';
import { Link } from 'react-router-dom';
import { typeData } from '../assets/assets';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-12 text-gray-800">
      <h1 className="text-3xl font-medium">Browse by Vehicle Type</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Explore our wide range of vehicles by type and find the perfect ride for your journey.
      </p>

      <div className="flex sm:justify-center gap-4 pt-3 w-full overflow-x-auto px-4 scrollbar-hide">
        {typeData.map((item, index) => (
          <Link
            key={index}
            to={`/cars/${item.type}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-300"
          >
            {/* Perfectly fitted rounded container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 rounded-full bg-gray-100 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.type} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-medium">{item.type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
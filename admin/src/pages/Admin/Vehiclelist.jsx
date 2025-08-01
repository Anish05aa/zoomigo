import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const VehicleList = () => {
  const { vehicles, adminToken, getAllVehicles, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllVehicles();
    }
  }, [adminToken]);

  return (
    <div className="m-5 overflow-auto">
      <h1 className="text-2xl font-semibold text-black mb-4">All Vehicles</h1>

      <div className="flex flex-wrap gap-5">
        {vehicles.map((item, index) => (
          <div
          key={index}
          className="w-64 border border-gray-200 rounded-xl shadow group hover:shadow-lg transition duration-500 
                     bg-white hover:bg-[#E53935] cursor-pointer"
        >
          <div className="overflow-hidden h-40">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        
          <div className="p-4 transition-all duration-500 
                          text-black group-hover:text-white">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-700 text-sm group-hover:text-gray-300">
              {item.category} • ₹{item.pricePerDay}/day
            </p>
        
            {/* Ownership Info */}
            <p className="text-sm mt-2">
              <span className="font-medium">Owned By: </span>
              {item.isSystemOwned ? (
                <span className="text-[#ffb3a9] font-medium">System</span>
              ) : (
                <span className="text-[#ffb3a9] font-medium">Owner</span>
              )}
            </p>
        
            {/* Availability */}
            <div className="mt-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => changeAvailability(item._id)}
                className="accent-white cursor-pointer"
              />
              <span className="group-hover:text-gray-300">Available</span>
            </div>
        
            {/* Edit Button */}
            <button
              className="mt-4 w-full py-1.5 rounded bg-white text-[#E53935] font-semibold text-sm 
                         hover:bg-gray-100 transition group-hover:bg-white group-hover:text-[#E53935]"
            >
              Edit
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default VehicleList;

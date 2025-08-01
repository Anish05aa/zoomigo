import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const VehicleList = () => {
  const { vehicles, adminToken, getAllVehicles,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllVehicles();
    }
  }, [adminToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium text-[#43B17E]'>All Vehicles</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {vehicles.map((item, index) => (
          <div
            className='border border-[#43B17E] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
          >
            <img
              className='bg-[#ecfdf5] group-hover:bg-[#43B17E] transition-all duration-500 w-full h-40 object-cover'
              src={item.image}
              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>
                {item.category} • ₹{item.pricePerDay}/day
              </p>

              {/* Ownership Info */}
              <p className='text-sm mt-2'>
                <span className='font-semibold'>Owned By: </span>
                {item.isSystemOwned ? (
                  <span className='text-[#43B17E]'>System-Owned</span>
                ) : (
                  <span className='text-orange-500'>Owner-Owned</span>
                )}
              </p>

              {/* Availability */}
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="cursor-pointer transition-colors accent-green-500"
                />
                <p>Available</p>
              </div>

              {/* Edit Button */}
              <div className='mt-3'>
                <button
                  className='px-3 py-1 bg-[#43B17E] text-white rounded hover:bg-[#379c67] transition-all text-sm w-full'
                  // onClick={() => handleEdit(item._id)} // Add handler if needed
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;

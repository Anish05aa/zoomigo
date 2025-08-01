import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopVehicles = () => {
  const navigate = useNavigate();
  const { vehicles } = useContext(AppContext);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className='text-center py-20 text-desc-dark'>
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-heading-dark md:mx-10'>
      <h1 className='text-3xl font-medium text-heading-dark'>Top Vehicles to Rent</h1>
      <p className='sm:w-1/3 text-center text-sm text-desc-dark'>
        Explore our top-rated vehicles for every journey.
      </p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {vehicles.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/book-car/${item._id}`); scrollTo(0, 0); }}
            key={index}
            className='border border-[#FFDAD8] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-8px] transition-all duration-500 bg-white shadow-sm hover:shadow-md'
          >
            <img 
              className='bg-[#FFF1F0] w-full h-[160px] object-cover' 
              src={item.image} 
              alt={item.name} 
            />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-[#E53935]' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 ${item.available ? 'bg-[#E53935]' : 'bg-gray-400'} rounded-full`}></div>
                <p>{item.available ? 'Available' : 'Unavailable'}</p>
              </div>
              <p className='text-black text-lg font-medium mt-1'>{item.name}</p>
              <div className='flex items-center text-yellow-500 text-sm mt-1'>
                {'★'.repeat(Math.floor(item.rating || 4))}
                {'☆'.repeat(5 - Math.floor(item.rating || 4))}
                <span className='ml-1 text-gray-500 text-xs'>({item.rating || '4'})</span>
              </div>
              <p className='text-gray-700 text-sm mt-1'>₹{item.pricePerDay} / day</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/cars'); scrollTo(0, 0); }}
        className='bg-[#FFE5E3] text-[#E53935] px-12 py-3 rounded-full mt-10 hover:bg-[#ff6f61]/20 transition-all'
      >
        View More Vehicles
      </button>
    </div>
  );
};

export default TopVehicles;
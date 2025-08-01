import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // ✅ only this

const TopVehicles = () => {
  const navigate = useNavigate();
  const { vehicles } = useContext(AppContext); // ✅ from context

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className='text-center py-20 text-gray-500'>
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Vehicles to Rent</h1>
      <p className='sm:w-1/3 text-center text-sm'>Explore our top-rated vehicles for every journey.</p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {vehicles.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/book-car/${item._id}`); scrollTo(0, 0); }}
            key={index}
            className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-sm'
          >
            <img className='w-full h-40 object-cover bg-gray-50' src={item.image} alt={item.name} />
            <div className='p-4'>
              <p className='text-lg font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.category}</p>

              <div className='flex items-center text-yellow-500 text-sm mt-1'>
                {'★'.repeat(Math.floor(item.stars || 4))}
                {'☆'.repeat(5 - Math.floor(item.stars || 4))}
                <span className='ml-1 text-gray-500'>({item.stars || '4'})</span>
              </div>

              <p className='text-sm text-gray-700 mt-1'>₹{item. pricePerDay} / day</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/cars'); scrollTo(0, 0); }}
        className='bg-green-100 text-gray-700 px-12 py-3 rounded-full mt-10'
      >
        More
      </button>
    </div>
  );
};

export default TopVehicles;

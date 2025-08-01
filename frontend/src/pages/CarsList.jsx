import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CarsList = () => {
  const { category } = useParams();
  const [filterCars, setFilterCars] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { vehicles } = useContext(AppContext);

  const applyFilter = () => {
    if (category) {
      setFilterCars(vehicles.filter(car =>
        car.category.toLowerCase() === category.toLowerCase()
      ));
    } else {
      setFilterCars(vehicles);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [vehicles, category]);

  return (
    <div className='md:mx-10 mb-10'>
      <p className='text-desc-dark'>Browse vehicles by category</p>

      <div className='flex flex-col sm:flex-row items-start gap-4 mt-5'>
        {/* Mobile filter toggle */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#43B17E] text-white' : ''
            }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Type Filter Sidebar */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['Car', 'SUV', 'Van', 'Truck', 'Bike'].map((t, idx) => (
            <p
              key={idx}
              onClick={() => (category?.toLowerCase() === t.toLowerCase() ? navigate('/cars') : navigate(`/cars/${t}`))}
              className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category?.toLowerCase() === t.toLowerCase() ? 'bg-[#E53935] text-white' : ''
                }`}
            >
              {t}
            </p>
          ))}
        </div>

        {/* Vehicle Cards */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {filterCars.map((item, index) => (
            <div
              onClick={() => navigate(`/book-car/${item._id}`)}
              key={index}
              className='border border-[#FFDAD8] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-8px] transition-all duration-500 bg-white shadow-sm hover:shadow-md'
            >
              <img
                className='bg-[#FFF1F0] w-full h-[160px] object-cover'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                {/* Availability Badge - Made more compact */}
                <div className={`flex items-center gap-1.5 text-xs ${item.available ? 'text-[#E53935]' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 ${item.available ? 'bg-[#E53935]' : 'bg-gray-400'} rounded-full`}></div>
                  <span>{item.available ? 'Available' : 'Unavailable'}</span>
                </div>

                {/* Vehicle Name - Slightly tighter spacing */}
                <p className='text-black text-lg font-semibold mt-2'>{item.name}</p>

                {/* Category Tag - Enhanced visibility */}
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  <span className='text-xs bg-[#FFE5E3] text-[#E53935] px-2 py-1 rounded-full'>
                    {item?.category?.toUpperCase() || 'DEFAULT'}
                  </span>
                  {/* Optional: Add transmission type if available */}
                  {item.type && (
                    <span className='text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full'>
                      {item.type}
                    </span>
                  )}
                </div>

                {/* Rating - Better alignment */}
                <div className='flex items-baseline mt-2'>
                  <div className='flex text-yellow-500 text-sm'>
                    {'★'.repeat(Math.floor(item.rating || 4))}
                    {'☆'.repeat(5 - Math.floor(item.rating || 4))}
                  </div>
                  <span className='ml-1.5 text-gray-500 text-xs'>({item.rating || '4'})</span>
                </div>

                {/* Price - More emphasis */}
                <p className='text-gray-900 font-medium mt-2 text-sm'>
                  ₹{item.pricePerDay?.toLocaleString() || 'DEFAULT'} <span className='text-gray-500 font-normal'>/ day</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsList;
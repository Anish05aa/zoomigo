import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Cars = () => {
  const { type } = useParams(); // dynamic param like 'SUV', 'Van'
  const [filterCars, setFilterCars] = useState([]); //this helps to filter the vehicles based on type
  const [showFilter, setShowFilter] = useState(false); //colour change on filter toggle
  const navigate = useNavigate();
  const { vehicles } = useContext(AppContext);

  const applyFilter = () => {
    if (type) {
      setFilterCars(vehicles.filter(car => car.type === type));
    } else {
      setFilterCars(vehicles);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [vehicles, type]);

  return (
    <div className='md:mx-10'>
      <p className='text-gray-600'>Browse vehicles by category</p>

      <div className='flex flex-col sm:flex-row items-start gap-4 mt-5'>
        {/* Filter toggle for mobile */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#43B17E] text-white' : ''}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Type Filter Sidebar */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['Car', 'SUV', 'Van', 'Truck', 'Bike'].map((t, idx) => (
            <p
              key={idx}
              onClick={() => (type === t ? navigate('/cars') : navigate(`/cars/${t}`))}
              className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${type === t ? 'bg-[#43B17E] text-white' : ''}`}
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
      </div>
    </div>
  );
};

export default Cars;

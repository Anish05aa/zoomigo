import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedVehicles = ({ vehicleId, category }) => {
  const { vehicles } = useContext(AppContext);
  const navigate = useNavigate();

  const [relVehicles, setRelVehicles] = useState([]);

  useEffect(() => {
    if (vehicles.length > 0 && category) {
      const vehicleData = vehicles.filter((v) => v.type === category && v._id !== vehicleId);
      setRelVehicles(vehicleData);
    }
  }, [vehicles, vehicleId, category]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Vehicles to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Browse through our top-rated vehicles that match your preferences.
      </p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relVehicles.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/book-car/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className='border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
          >
            <img className='bg-green-50 w-full h-[160px] object-cover' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Unavailable'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-yellow-500 text-sm'>★★★★★</p>
              <p className='text-gray-600 text-sm'>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/cars');
          scrollTo(0, 0);
        }}
        className='bg-green-100 text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        More
      </button>
    </div>
  );
};

export default RelatedVehicles;

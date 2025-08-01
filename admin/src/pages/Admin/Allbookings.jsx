import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllBookings = () => {
  const { currency } = useContext(AppContext);
  const { adminToken, bookings, getAllBookings, cancelBooking } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (adminToken) {
      getAllBookings();
    }
  }, [adminToken]);

  useEffect(() => {
    if (bookings.length >= 0) {
      setLoading(false);
    }
  }, [bookings]);

  if (loading) return <div className="p-5 text-center text-gray-700">Loading bookings...</div>;
  if (bookings.length === 0) return <div className="p-5 text-center text-gray-700">No bookings found</div>;

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-semibold text-black'>All Bookings</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Table Head */}
        <div className='
          py-3 px-6 border-b justify-between max-sm:gap-2 
          sm:grid grid-cols-[0.5fr_3fr_3fr_1.75fr_1.75fr_1fr_1fr] items-center bg-gray-100'>
          <p className='text-black font-medium'>#</p>
          <p className='text-black font-medium'>User</p>
          <p className='text-black font-medium'>Vehicle</p>
          <p className='text-black font-medium'>Pickup Date</p>
          <p className='text-black font-medium'>Dropoff Date</p>
          <p className='text-black font-medium'>Amount</p>
          <p className='text-black font-medium'>Action</p>
        </div>

        {/* Table Rows */}
        {bookings.map((item, index) => {
          const userImage = item.userData?.image || assets.default_user;
          const userName = item.userData?.name || 'Unknown User';

          const vehicleImage = item.vehicleData?.image || assets.default_vehicle;
          const vehicleName = item.vehicleData?.name || 'Unknown Vehicle';
          const vehicleType = item.vehicleData?.type || item.vehicleData?.category || 'Unknown Type';

          return (
            <div
              key={index}
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_3fr_1.75fr_1.75fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50'
            >
              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={userImage} alt="User" />
                <p>{userName}</p>
              </div>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded bg-gray-200 object-cover' src={vehicleImage} alt="Vehicle" />
                <p>{vehicleName} ({vehicleType})</p>
              </div>

              <p>{new Date(item.pickupDate).toLocaleDateString()}</p>
              <p>{new Date(item.dropoffDate).toLocaleDateString()}</p>
              <p>{currency}{item.amount}</p>

              {item.isCancelled ? (
                <p className='text-[#E53935] font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-600 font-medium'>Completed</p>
              ) : (
                <img
                  onClick={() => cancelBooking(item._id)}
                  className='w-6 cursor-pointer'
                  src={assets.cancel_icon}
                  alt="Cancel"
                  title="Cancel Booking"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBookings;

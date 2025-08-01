import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { adminToken, getDashData, dashData, cancelBooking } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getDashData();
    }
  }, [adminToken]);

  return (
    <div className="m-5">
      {/* Dashboard Stats */}
      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.car_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.vehicles}</p>
            <p className='text-gray-400'>Total Vehicles</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.booking_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.bookings}</p>
            <p className='text-gray-400'>Total Bookings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.user_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.users}</p>
            <p className='text-gray-400'>Total Users</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.owner_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.ownersCount}</p>
            <p className='text-gray-400'>Owners</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.system_owned_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.systemOwnedCount}</p>
            <p className='text-gray-400'>System-Owned</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.owner_owned_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.ownerOwnedCount}</p>
            <p className='text-gray-400'>Owner-Owned</p>
          </div>
        </div>

      </div>


      {/* Latest Bookings Table Head */}
      <div className='
        grid-flow-col py-3 px-6 border-b justify-between max-sm:gap-2 
        sm:grid grid-cols-[0.5fr_3fr_3fr_1.75fr_1.75fr_1fr_1fr] items-center bg-gray-50'>
        <p>#</p>
        <p>User</p>
        <p>Vehicle</p>
        <p>Pickup Date</p>
        <p>Dropoff Date</p>
        <p>Amount</p>
        <p>Action</p>
      </div>

      {/* Latest Bookings List */}
      <div>
        {dashData.latestBookings?.length > 0 ? (
          dashData.latestBookings.map((item, index) => {
            const userImage = item.userData?.image || assets.user_icon;
            const userName = item.userData?.name || 'Unknown';

            const vehicleImage = item.vehicleData?.image || assets.car_icon;
            const vehicleName = item.vehicleData?.name || 'Unknown';
            const vehicleType = item.vehicleData?.type || item.vehicleData?.category || 'Type';

            return (
              <div
                key={index}
                className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_3fr_1.75fr_1.75fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
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
                <p>₹{item.amount}</p>

                {item.isCancelled ? (
                  <p className='text-red-400 font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 font-medium'>Completed</p>
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
          })
        ) : (
          <p className="text-gray-400 px-6 py-4">No recent bookings available.</p>
        )}
      </div>
    </div>
  );
};



      export default AdminDashboard;

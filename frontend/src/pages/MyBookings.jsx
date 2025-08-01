import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyBookings = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { vehicles } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      toast.error("Failed to load bookings. Please try again later.");
      console.error(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-booking`, 
        { bookingId }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (data.success) {
        toast.success(data.message || "Booking cancelled successfully");
        // Update local state immediately for better UX
        setBookings(prev => prev.map(booking => 
          booking._id === bookingId ? { ...booking, isCancelled: true } : booking
        ));
      } else {
        toast.error(data.message || "Could not cancel booking. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        "Something went wrong. Please try again later."
      );
      console.error(error);
    }
  };

  // ... (keep your existing payment-related functions unchanged)

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);

  return (
    <div className="bg-white min-h-screen px-4 sm:px-8 py-12 text-black">
      <p className='pb-3 font-semibold text-xl border-b border-gray-300'>My Bookings</p>

      <div>
        {bookings.length === 0 && (
          <p className="text-sm text-gray-700 py-4">No bookings found.</p>
        )}

        {bookings.map((item, index) => {
          const vehicle = vehicles.find(v => v._id === item.vehicleId);
          return (
            <div key={index} className='grid grid-cols-[1fr_2fr] sm:flex gap-4 sm:gap-6 py-4 border-b border-gray-300'>
              <div>
                <img className='w-32 rounded bg-gray-100' src={vehicle?.image} alt={vehicle?.name} />
              </div>
              <div className='flex-1 text-sm'>
                <p className='text-black font-semibold'>{vehicle?.name}</p>
                <p className="text-gray-700">{vehicle?.type}</p>
                <p className='text-gray-700 font-medium mt-1'>Booking Details:</p>
                <p className='text-sm text-gray-700'>Pickup: {formatDate(item.pickupDate)}</p>
                <p className='text-sm text-gray-700'>Dropoff: {formatDate(item.dropoffDate)}</p>
                <p className='text-sm mt-1 text-gray-700'><span className='font-medium'>Location:</span> {item.location}</p>
              </div>

              <div className='flex flex-col gap-2 justify-end'>
                {item.isCancelled ? (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Booking Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                    Booking Completed
                  </button>
                ) : item.payment ? (
                  <>
                    <button className='min-w-48 py-2 border rounded text-black bg-gray-100'>
                      Paid
                    </button>
                    <button
                      onClick={() => cancelBooking(item._id)}
                      className='text-sm text-gray-700 sm:min-w-48 py-2 border rounded-full hover:bg-black hover:text-white transition-all duration-300'
                    >
                      Cancel Booking
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handlePayment(item._id)}
                      className='flex items-center justify-center gap-2 text-sm text-black sm:min-w-48 py-2 border rounded-full hover:bg-[#ff6f61] hover:text-white transition-all duration-300'
                    >
                      <img src={assets.razorpay_logo} alt="Razorpay" className="h-3 w-auto object-contain" />
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelBooking(item._id)}
                      className='text-sm text-gray-700 sm:min-w-48 py-2 border rounded-full hover:bg-black hover:text-white transition-all duration-300'
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
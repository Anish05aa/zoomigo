import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyBookings = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { vehicles } = useContext(AppContext);

  const [bookings, setBookings] = useState([]);

  

  const months = [
    '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; // Fix: months[d.getMonth()]
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
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);


  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-booking`, { bookingId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success(data.message);
        getUserBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Vehicle Booking Payment',
      description: 'Payment for car rental',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay`, response, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
            toast.success('Payment Successful');
            getUserBookings();
            // navigate('/my-bookings');
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { bookingId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);


  // Temporary static layout with empty bookings array
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300'>My Bookings</p>
      <div>
        {bookings.length === 0 && (
          <p className="text-sm text-gray-500 py-4">No bookings found. (API integration pending)</p>
        )}
        {bookings.map((item, index) => {
          const vehicle = vehicles.find(v => v._id === item.vehicleId);
          return (
            <div key={index} className='grid grid-cols-[1fr_2fr] sm:flex gap-4 sm:gap-6 py-2 border-b border-gray-300'>
              <div>
                <img className='w-32 bg-green-50' src={vehicle?.image} alt={vehicle?.name} />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{vehicle?.name}</p>
                <p>{vehicle?.type}</p>
                <p className='text-zinc-700 font-medium mt-1'>Booking Details:</p>
                <p className='text-xs'>Pickup: {formatDate(item.pickupDate)}</p>
                <p className='text-xs'>Dropoff: {formatDate(item.dropoffDate)}</p>
                <p className='text-sm mt-1'><span className='text-neutral-700 font-medium'>Location:</span> {item.location}</p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.isCancelled && item.payment && !item.isCompleted && (
                  <button className='min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>
                )}
                {!item.isCancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => handlePayment(item._id)} className='flex items-center justify-center gap-2 text-sm text-stone-500 sm:min-w-48 py-2 border rounded-full hover:bg-[#43B17E] hover:text-white transition-all duration-300'>
                    <img src={assets.razorpay_logo} alt="Razorpay" className="h-3 w-auto object-contain" />
                    Pay Online
                  </button>
                )}
                {!item.isCancelled && !item.isCompleted && (
                  <button onClick={() => cancelBooking(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded-full hover:bg-red-500 hover:text-white transition-all duration-300'>
                    Cancel Booking
                  </button>
                )}
                {item.isCancelled && !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Booking Cancelled</button>
                )}
                {item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Booking Completed</button>
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

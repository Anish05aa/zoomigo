import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import RelatedVehicles from '../components/RelatedVehicles'; // ✅ Uncommented
import { AppContext } from '../context/AppContext';

const Bookings = () => {
  const { carId: vehicleId } = useParams(); // ✅ Alias carId to vehicleId

  const {
    vehicles,
    currencySymbol,
    backendUrl,
    token,
    getVehiclesData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const formatDisplayDate = (d) =>
    typeof d === "string" ? d : d.toISOString().split("T")[0];

  const fetchVehicleInfo = async () => {
    const info = vehicles.find((v) => v._id === vehicleId);
    setVehicleInfo(info);
  };

  const fetchAvailableDates = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/vehicle-available-dates/" + vehicleId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setAvailableDates(data.availableDates);
        setBookedDates(data.bookedDates.map((d) => new Date(d)));
      }
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const bookVehicle = async () => {
    if (!token) {
      toast.warn("Login to book a vehicle");
      return navigate("/login");
    }

    if (!pickupDate || !dropoffDate) {
      return toast.warn("Select both pickup and dropoff dates");
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-vehicle",
        {
          vehicleId,
          pickupDate: formatDate(pickupDate),
          dropoffDate: formatDate(dropoffDate),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getVehiclesData();
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (vehicleInfo) {
      fetchAvailableDates();
    }
  }, [vehicleInfo]);

  useEffect(() => {
    fetchVehicleInfo();
  }, [vehicles, vehicleId]);

  return vehicleInfo && (
    <div>
      {/* Vehicle details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img
            className='bg-green-100 w-full sm:max-w-72 rounded-lg'
            src={vehicleInfo.image}
            alt=''
          />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {vehicleInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{vehicleInfo.model} - {vehicleInfo.category}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {vehicleInfo.type}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>
              About <img src={assets.info_icon} alt='' />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {vehicleInfo.description}
            </p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Booking fee:{' '}
            <span className='text-lg font-extrabold text-gray-600'>
              {currencySymbol}{vehicleInfo.pricePerDay}
            </span>
          </p>
        </div>
      </div>

      {/* Show Available Dates */}
      <div className="mt-6">
        <p className="text-gray-700 font-medium">Available Dates:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {availableDates.length > 0 ? (
            availableDates.map((date, index) => (
              <p
                key={index}
                className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
              >
                {date}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No available dates yet.</p>
          )}
        </div>
      </div>

      {/* Show Booked Dates */}
      <div className="mt-4">
        <p className="text-gray-700 font-medium">Booked Dates:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {bookedDates.length > 0 ? (
            bookedDates.map((date, index) => (
              <p
                key={index}
                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full"
              >
                {formatDisplayDate(date)}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">No dates are booked yet.</p>
          )}
        </div>
      </div>

      {/* Booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Select Booking Duration</p>

        <div className='flex flex-col'>
          <label className='text-sm mb-1'>Pickup Date</label>
          <DatePicker
            selected={pickupDate}
            onChange={(date) => setPickupDate(date)}
            minDate={new Date()}
            excludeDates={bookedDates}
            placeholderText="Select pickup date"
            className='border px-3 py-2 rounded-md'
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className='flex flex-col'>
          <label className='text-sm mb-1'>Dropoff Date</label>
          <DatePicker
            selected={dropoffDate}
            onChange={(date) => setDropoffDate(date)}
            minDate={pickupDate || new Date()}
            excludeDates={bookedDates}
            placeholderText="Select dropoff date"
            className='border px-3 py-2 rounded-md'
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button
          onClick={bookVehicle}
          className='bg-[#43B17E] text-white text-sm font-light px-14 py-3 rounded-full my-6'
        >
          Book Vehicle
        </button>
      </div>

      {/* Related Vehicles */}
      <RelatedVehicles
        vehicleId={vehicleInfo._id}
        category={vehicleInfo.category}
      />
    </div>
  );
};

export default Bookings;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import RelatedVehicles from '../components/RelatedVehicles';
import { AppContext } from '../context/AppContext';

const Bookings = () => {
  const { carId: vehicleId } = useParams();
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
      toast.error("Unable to process booking. Please try again.");
    }
  };

  const bookVehicle = async () => {
    if (!token) {
      toast.warn("Please log in to book your ride.");
      return navigate("/login");
    }

    if (!pickupDate || !dropoffDate) {
      return toast.warn("Both pickup and dropoff dates are required.");
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
        toast.success("Your booking was successful!");
        getVehiclesData();
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Booking couldn't be completed.");
      }
    } catch (error) {
      toast.error("Unable to process booking. Please try again.");
    }
  };

  useEffect(() => {
    if (vehicleInfo) fetchAvailableDates();
  }, [vehicleInfo]);

  useEffect(() => {
    fetchVehicleInfo();
  }, [vehicles, vehicleId]);

  return vehicleInfo && (
    <div>
      {/* Vehicle Info */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img
            className='bg-gray-100 w-full sm:max-w-72 rounded-lg'
            src={vehicleInfo.image}
            alt={vehicleInfo.name}
          />
        </div>

        <div className='flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-semibold text-black'>
            {vehicleInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='Verified' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-700'>
            <p>{vehicleInfo.model} - {vehicleInfo.category}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full text-black'>
              {vehicleInfo.type}
            </button>
          </div>

          <div className='mt-4'>
            <p className='flex items-center gap-1 text-sm font-medium text-black'>
              About <img src={assets.info_icon} alt='Info' />
            </p>
            <p className='text-sm text-gray-700 mt-1'>
              {vehicleInfo.description}
            </p>
          </div>

          <p className='text-gray-700 font-medium mt-4'>
            Booking Fee:{' '}
            <span className='text-lg font-bold text-black'>
              {currencySymbol}{vehicleInfo.pricePerDay}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Form (moved up) */}
      <div className='sm:ml-72 sm:pl-4 mt-6 font-medium text-black'>
        <p className="mb-2">Select Booking Duration</p>

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

        <div className='flex flex-col mt-3'>
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
          className='bg-[#E53935] hover:bg-[#ff6f61] transition-all duration-200 text-white text-sm font-medium px-14 py-3 rounded-full mt-6'
        >
          Book Vehicle
        </button>
      </div>

      {/* Available Dates */}
      <div className="mt-10 px-4 sm:px-0">
        <p className="text-black font-semibold">Available Dates:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {availableDates.length > 0 ? (
            availableDates.map((date, index) => (
              <p
                key={index}
                className="text-sm bg-[#FFE5E3] text-[#E53935] px-3 py-1 rounded-full"
              >
                {date}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-700">Currently no available dates.</p>
          )}
        </div>
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

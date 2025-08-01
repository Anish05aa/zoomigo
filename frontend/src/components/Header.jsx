import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-[#1a1a1a] via-[#3a1c1c] to-[#E53935] rounded-lg px-6 md:px-10 lg:px-20'>

      {/*--------Left side---------------*/}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-heading-light font-semibold leading-tight'>
          Book Your Ride <br /> With Trusted Cars
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-desc-light text-sm font-light'>
          <img src={assets.group_profiles} className='w-25' alt="car profiles" />
          <p>
            Discover a wide range of reliable cars <br className='hidden sm:block' /> and rent your ride in just a few clicks.
          </p>
        </div>

        <a
          href="#speciality"
          className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#121212] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'
        >
          Book Now <img src={assets.arrow_icon} className='w-3' alt="arrow" />
        </a>
      </div>

      {/*--------Right side---------------*/}
      <div className='md:w-1/2 relative'>
        <img
          src={assets.veh2}
          className='w-full md:absolute bottom-0 h-auto rounded-lg'
          alt="header car"
        />
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to DriveEase, your trusted partner for reliable and affordable car rentals. At DriveEase, we understand the importance of flexibility, comfort, and convenience when it comes to your travel needs.</p>
          <p>DriveEase is committed to providing a seamless vehicle rental experience. Whether you're planning a weekend getaway, a business trip, or need a ride for daily errands, we are here with a range of vehicles and flexible rental plans to support your journey.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at DriveEase is to become your go-to car rental platform — delivering exceptional service, an easy-to-use system, and a diverse fleet of vehicles that cater to every lifestyle and budget.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 md:gap-2 lg:gap-4'>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#43B17E] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>Flexibility</b>
          <p>Wide range of rental durations and vehicle options to suit your needs.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#43B17E] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>Affordability</b>
          <p>Competitive pricing with no hidden charges — value you can count on.</p>
        </div>
        <div className='border border-gray-400 rounded-2xl px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#43B17E] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer hover:scale-110'>
          <b>Convenience</b>
          <p>Easy online booking, real-time availability, and a responsive support team.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='text-center text-2xl pt-10 text-gray-500'>
      <div>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500 text-start'>1234 AutoDrive Street<br />Suite 200, San Francisco, CA</p>
          <p className='text-gray-500 text-start'>Tel: (415) 987‑6543<br />Email: support@driveease.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at DRIVEEASE</p>
          <p className='text-gray-500'>Join our growing team and help shape the future of car rentals.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

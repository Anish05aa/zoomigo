import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/*--------- Left Section --------*/}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="CRS Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Your reliable partner for seamless car rentals. Rent top-rated vehicles anytime, anywhere — fast, affordable, and hassle-free.
          </p>
        </div>

        {/*--------- Middle Section --------*/}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/*--------- Right Section --------*/}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-987-654-3210</li>
            <li>support@carrentalhub.com</li>
          </ul>
        </div>
      </div>

      {/*--------- Copyright --------*/}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© 2025 CarRentalHub. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

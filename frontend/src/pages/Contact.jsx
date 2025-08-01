import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='text-center pt-10 md:mx-10'>
      {/* Heading */}
      <div>
        <p className='text-3xl font-semibold text-heading-dark'>
          CONTACT <span className='text-[#ff6f61]'>US</span>
        </p>
        <p className='mt-2 text-sm text-desc-dark'>We’re here to help — reach out to Zoomigo anytime.</p>
      </div>

      {/* Contact Info Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        {/* Contact Image */}
        <img
          className='w-full md:max-w-[360px] rounded-xl shadow-md'
          src={assets.contact_image}
          alt="Contact Zoomigo"
        />

        {/* Office Info */}
        <div className='flex flex-col justify-center items-start gap-6 text-left'>
          {/* Office Address */}
          <div>
            <p className='font-semibold text-lg text-heading-dark'>OUR OFFICE</p>
            <p className='text-desc-dark leading-6 mt-1'>
              1234 AutoDrive Street<br />
              Suite 200, San Francisco, CA
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <p className='text-desc-dark leading-6'>
              Tel: (415) 987‑6543<br />
              Email: support@zoomigo.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className='font-semibold text-lg text-heading-dark mt-4'>Careers at ZOOMIGO</p>
            <p className='text-desc-dark mt-1'>
              Join our growing team and help shape the future of car rentals with Zoomigo.
            </p>
            <button className='mt-4 px-6 py-2 rounded bg-[#ff6f61] text-white hover:opacity-90 transition-all duration-300'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

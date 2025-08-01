import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='relative bg-gradient-to-r from-[#E53935] to-[#c62828] rounded-xl overflow-hidden my-12 mx-4 md:mx-10 shadow-xl'>
      {/* Background pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute inset-0 bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==")]'></div>
      </div>

      <div className='relative flex flex-col md:flex-row items-center z-10'>
        {/* Text Content */}
        <div className='flex-1 px-8 py-12 md:py-16 lg:py-20 text-center md:text-left'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4'>
            Your Journey Begins Here
          </h1>
          <p className='text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto md:mx-0'>
            Discover premium vehicles at unbeatable prices. <br className='hidden sm:block' />
            Trusted by thousands of happy travelers.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
            <button
              onClick={() => {
                navigate('/cars');
                scrollTo(0, 0);
              }}
              className='bg-white text-[#100e0e] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl'
            >
              Browse Vehicles
            </button>
            <button
              onClick={() => {
                navigate('/login');
                scrollTo(0, 0);
              }}
              className='border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all'
            >
              Sign Up Now
            </button>
          </div>
        </div>

        {/* Image */}
        <div className='w-full md:w-1/2 lg:w-[40%] relative mt-8 md:mt-0'>
          <img
            className='w-full h-auto max-h-[400px] object-contain'
            src={assets.woman}
            alt='Happy customer with Zoomigo'
          />
          <div className='absolute -bottom-6 -right-6 bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg'>
            <div className='bg-[#E53935] text-white rounded-full p-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badge at bottom */}
      <div className='bg-black/20 text-white text-center py-3 text-sm'>
        <p>Trusted by 10,000+ customers worldwide ★★★★★</p>
      </div>
    </div>
  );
};

export default Banner;
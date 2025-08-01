


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleRoleSelection = () => {
    if (role === 'Admin') {
      navigate('/admin/login'); // Matches the route in App.jsx
    } else {
      navigate('/owner-login');
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-6 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-md bg-white'>
        <p className='text-2xl font-semibold text-center'>
          Welcome to <span className='text-[#43B17E]'>Car Rental</span>
        </p>
        
        <div className='flex flex-col gap-4'>
          <p className='text-center'>Select your login type:</p>
          
          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => setRole('Admin')}
              className={`px-4 py-2 rounded-md ${role === 'Admin' ? 'bg-[#43B17E] text-white' : 'bg-gray-200'}`}
            >
              Admin
            </button>
            <button
              onClick={() => setRole('Owner')}
              className={`px-4 py-2 rounded-md ${role === 'Owner' ? 'bg-[#43B17E] text-white' : 'bg-gray-200'}`}
            >
              Owner
            </button>
          </div>
          
          <button
            onClick={handleRoleSelection}
            className='bg-[#43B17E] text-white w-full py-2 rounded-md text-base hover:bg-[#369b6b] transition duration-300 mt-4'
          >
            Continue to {role} Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
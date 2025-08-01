import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleRoleSelection = () => {
    if (role === 'Admin') {
      navigate('/admin/login');
    } else {
      navigate('/owner-login');
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-white'>
      <div className='flex flex-col gap-6 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-desc-dark text-sm shadow-md bg-white'>
        <p className='text-2xl font-semibold text-center text-heading-dark'>
          Welcome to <span className='text-[#E53935]'>Zoomigo</span>
        </p>

        <div className='flex flex-col gap-4'>
          <p className='text-center text-desc-dark'>Select your login role:</p>

          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => setRole('Admin')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                role === 'Admin'
                  ? 'bg-primary-red text-heading-light'
                  : 'bg-gray-200 text-heading-dark hover:bg-gray-300'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setRole('Owner')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                role === 'Owner'
                  ? 'bg-primary-red text-heading-light'
                  : 'bg-gray-200 text-heading-dark hover:bg-gray-300'
              }`}
            >
              Owner
            </button>
          </div>

          <button
            onClick={handleRoleSelection}
            className='bg-primary-red text-white w-full py-2 rounded-md text-base font-semibold hover:bg-red-600 transition duration-300 mt-4'
          >
            Continue as {role}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

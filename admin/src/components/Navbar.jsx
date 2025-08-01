import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { OwnerContext } from '../context/OwnerContext';

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { Otoken, setOtoken } = useContext(OwnerContext);
  const navigate = useNavigate();

  const logout = () => {
    if (adminToken) {
      setAdminToken('');
      localStorage.removeItem('adminToken');
      navigate('/admin-login'); // Redirect to admin login after logout
    } else if (Otoken) {
      setOtoken('');
      localStorage.removeItem('ownerToken');
      navigate('/owner-login'); // Redirect to owner login after logout
    } else {
      navigate('/'); // Fallback for no token scenario
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img 
          className='w-36 sm:w-40 cursor-pointer' 
          src={assets.logo} 
          alt="CRS Logo" 
          onClick={() => navigate(adminToken ? '/admin/dashboard' : '/owner/dashboard')}
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {adminToken ? 'Admin' : 'Owner'}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-[#E53935] text-white text-sm px-10 py-2 rounded-full hover:bg-[#ff6f61]'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, setUserData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    if (window.innerWidth < 768) {
      setShowProfileMenu(!showProfileMenu);
    }
  };

  const logout = () => {
    setToken(false);
    setUserData(false); // also reset userData
    localStorage.removeItem('token');
    // navigate('/login');
  };


  return (
    <div className='max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 bg-white text-black'>
      <img onClick={() => navigate('/')} className='w-40 lg:w-44 cursor-pointer' src={assets.logo} alt="logo" />

      <ul className='hidden md:flex items-start gap-4 font-medium'>
        {[
          { to: '/', label: 'HOME' },
          { to: '/cars', label: 'ALL VEHICLES' },
          // { to: '/my-bookings', label: 'MY BOOKINGS' },
          { to: '/about', label: 'ABOUT' },
          { to: '/contact', label: 'CONTACT' }
        ].map(({ to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active group' : 'group')}>
            <li className='py-1 px-2 hover:text-[#E53935] transition-colors duration-200'>{label}</li>
            <hr className='border-none h-0.5 bg-[#E53935] w-1/2 m-auto hidden group-[.active]:block' />
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-4'>
        {
          token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative' onClick={handleProfileClick}>
              <img src={userData.image} alt="User" className='w-8 rounded-full' />
              <img src={assets.dropdown_icon} alt="Dropdown" className='w-2.5' />
              <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-black z-20 ${showProfileMenu ? 'block' : 'hidden'} group-hover:block`}>
                <div className='min-w-48 bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-[#E53935] transition-colors duration-200 cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-bookings')} className='hover:text-[#E53935] transition-colors duration-200 cursor-pointer'>My Bookings</p>
                  <p onClick={logout} className='hover:text-[#E53935] transition-colors duration-200 cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className='bg-[#E53935] hover:bg-[#ff6f61] text-white px-6 py-2 rounded-full font-light hidden md:block transition-all duration-300'
              onClick={() => navigate('/login')}>
              Create Account
            </button>
          )
        }

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />

        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-10 overflow-hidden bg-white text-black transition-all`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-300'>
            <img className='w-44' src={assets.logo} alt="Logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            {[
              { to: '/', label: 'Home' },
              { to: '/cars', label: 'All VEHICLES' },
              // { to: '/my-bookings', label: 'My Bookings' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' }
            ].map(({ to, label }) => (
              <NavLink key={to} onClick={() => setShowMenu(false)} to={to}>
                <p className='px-4 py-2 hover:text-[#E53935] transition-colors duration-200'>{label}</p>
              </NavLink>
            ))}
            {
              token &&
              <div className='flex flex-col mt-4 gap-2 text-center'>
                <p onClick={() => { setShowMenu(false); navigate('/my-profile'); }} className='hover:text-[#E53935] transition-colors duration-200 cursor-pointer'>My Profile</p>
                <p onClick={() => { setShowMenu(false); logout(); }} className='hover:text-[#E53935] transition-colors duration-200 cursor-pointer'>Logout</p>
              </div>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

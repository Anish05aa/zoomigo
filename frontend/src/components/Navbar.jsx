import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();

  // Replace with context later
  // const token = true;
  const {token,settoken,userData}=useContext(AppContext);
  // const userData = {
  //   image: assets.user_icon, // Replace with actual user image from context later
  // };

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    if (window.innerWidth < 768) {
      setShowProfileMenu(!showProfileMenu);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-40 lg:w-44 cursor-pointer' src={assets.logo} alt="logo" />

      <ul className='hidden md:flex items-start gap-3 font-medium'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active group' : 'group')}>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-[#28a745] w-1/2 m-auto hidden group-[.active]:block' />
        </NavLink>
        <NavLink to='/cars' className={({ isActive }) => (isActive ? 'active group' : 'group')}>
          <li className='py-1'>ALL CARS</li>
          <hr className='border-none outline-none h-0.5 bg-[#28a745] w-1/2 m-auto hidden group-[.active]:block' />
        </NavLink>
        <NavLink to='/my-bookings' className={({ isActive }) => (isActive ? 'active group' : 'group')}>
          <li className='py-1'>MY BOOKINGS</li>
          <hr className='border-none outline-none h-0.5 bg-[#28a745] w-1/2 m-auto hidden group-[.active]:block' />
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? 'active group' : 'group')}>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-[#28a745] w-1/2 m-auto hidden group-[.active]:block' />
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => (isActive ? 'active group' : 'group')}>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-[#28a745] w-1/2 m-auto hidden group-[.active]:block' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
          token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative' onClick={handleProfileClick}>
              <img src={userData.image} alt="User" className='w-8 rounded-full' />
              <img src={assets.dropdown_icon} alt="Dropdown" className='w-2.5' />
              <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${showProfileMenu ? 'block' : 'hidden'} group-hover:block`}>
                <div className='min-w-48 bg-[#d4edda] rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-bookings')} className='hover:text-black cursor-pointer'>My Bookings</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button className='bg-[#28a745] text-white px-6 py-2 rounded-full font-light hidden md:block' onClick={() => navigate('/login')}>
              Create Account
            </button>
          )
        }

        {/* Mobile Menu Icon */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu" />

        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-10 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-44' src={assets.logo} alt="Logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2'>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/cars'><p className='px-4 py-2'>All Cars</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/bookings'><p className='px-4 py-2'>My Bookings</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2'>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2'>Contact</p></NavLink>
            {
              token &&
              <div className='flex flex-col mt-4 gap-2 text-center'>
                <p onClick={() => { setShowMenu(false); navigate('/my-profile'); }} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => { setShowMenu(false); logout(); }} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

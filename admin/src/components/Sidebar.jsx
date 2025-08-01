import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { OwnerContext } from '../context/OwnerContext';

const Sidebar = () => {
  // CORRECTED: Using the exact property names from contexts
  const { adminToken } = useContext(AdminContext); // Changed from admintoken
  const { Otoken } = useContext(OwnerContext);    // Changed from otoken

  // Debugging log - remove in production
  console.log('Sidebar render - adminToken:', adminToken, 'Otoken:', Otoken);

  return (
    <div className='min-h-screen bg-white border-r'>
      {adminToken ? ( // Changed from admintoken
        <ul className='text-[#515151] mt-5'>
          <NavLink
            to={'/admin/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#ff6f61]' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/admin/all-bookings'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#ff6f61]' : ''
              }`
            }
          >
            <img src={assets.booking_icon} alt="Bookings" />
            <p className='hidden md:block'>Bookings</p>
          </NavLink>

          <NavLink
            to={'/admin/add-vehicle'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#ff6f61]' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Vehicle" />
            <p className='hidden md:block'>Add Vehicle</p>
          </NavLink>

          

          <NavLink
            to={'/admin/all-vehicles'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#ff6f61]' : ''
              }`
            }
          >
            <img  />
            <p className='hidden md:block'>Vehicles List</p>
          </NavLink>
        </ul>
      ) : Otoken ? ( // Changed from otoken
        <ul className='text-[#515151] mt-5'>
          <NavLink
            to={'/owner-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#43B17E]' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to={'/owner/bookings'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#43B17E]' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="My Bookings" />
            <p className='hidden md:block'>My Bookings</p>
          </NavLink>

          <NavLink
            to={'/owner/earnings'}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-[#43B17E]' : ''
              }`
            }
          >
            <img src={assets.money_icon} alt="Earnings" />
            <p className='hidden md:block'>Earnings</p>
          </NavLink>
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;
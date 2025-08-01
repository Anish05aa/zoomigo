import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AdminContext } from './context/AdminContext';
import { OwnerContext } from './context/OwnerContext';
import Addvehicle from './pages/Admin/Addvehicle';
import AdminLogin from './pages/Admin/AdminLogin';
import Allbookings from './pages/Admin/Allbookings';
import Dashboard from './pages/Admin/Dashboard';
import Vehiclelist from './pages/Admin/Vehiclelist';
import Login from './pages/Login';
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import OwnerLogin from './pages/Owner/OwnerLogin';

const App = () => {
  const { adminToken } = useContext(AdminContext);
  const { Otoken } = useContext(OwnerContext);

  return (
    <>
      <ToastContainer />
      
      {adminToken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/add-vehicle" element={<Addvehicle />} />
              <Route path="/admin/all-vehicles" element={<Vehiclelist />} />
              <Route path="/admin/all-bookings" element={<Allbookings />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : Otoken ? (
        <div className="bg-[#F8F9FD]">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path="*" element={<Navigate to="/owner/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
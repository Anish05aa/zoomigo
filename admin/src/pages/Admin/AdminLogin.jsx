import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const Login = () => {
  const [role] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        localStorage.removeItem('ownerToken');
        toast.success('🚗 Welcome to Zoomigo! Login successful')
        navigate('/admin/dashboard');
      } else {
        toast.error(data.message || 'Invalid Credentials', { position: "top-center" });
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={handleLogin} className='min-h-[80vh] flex items-center justify-center bg-white'>
      <div className='flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-desc-dark text-sm shadow-md bg-white'>
        <p className='text-2xl font-semibold text-center text-heading-dark'>
          <span className='text-[#E53935]'>{role}</span> Login
        </p>

        <div className='w-full'>
          <p className='text-sm font-medium mb-1'>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935]'
          />
        </div>

        <div className='w-full'>
          <p className='text-sm font-medium mb-1'>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 rounded w-full p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935]'
          />
        </div>

        <button
          type='submit'
          className='bg-primary-red text-white w-full py-2 rounded-md text-base font-semibold hover:bg-red-600 transition duration-300 mt-2'
        >
          Login as Admin
        </button>
      </div>
    </form>
  );
};

export default Login;

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (role === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          console.log("Admin login successful:", data); // ✅ Safe to access `data` here
          localStorage.setItem('adminToken', data.token);
          setAdminToken(data.token);
          localStorage.removeItem('ownerToken');
          navigate('/admin/dashboard');
        } else {
          toast.error(data.message || 'Invalid Credentials', { position: "top-center" });
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };
  

  return (
    <form onSubmit={handleLogin} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-md bg-white'>
        <p className='text-2xl font-semibold text-center'>
          <span className='text-[#43B17E]'>{role}</span> Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-300 rounded w-full p-2 mt-1'
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 rounded w-full p-2 mt-1'
          />
        </div>

        <button
          type='submit'
          className='bg-[#43B17E] text-white w-full py-2 rounded-md text-base hover:bg-[#369b6b] transition duration-300'
        >
          Login
        </button>

      </div>
    </form>
  );
};

export default Login;
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OwnerContext } from '../../context/OwnerContext';

const OwnerLogin = () => {
  const { setOtoken, backendUrl } = useContext(OwnerContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email } = decoded;

      const { data } = await axios.post(`${backendUrl}/api/owner/google-login`, {
        name,
        email
      });

      if (data.success) {
        localStorage.setItem('ownerToken', data.token);
        setOtoken(data.token);
        toast.success('🚗 Welcome to Zoomigo! Login successful');
        navigate('/owner/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.", { position: 'top-center' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border shadow-md p-8 rounded-xl w-[350px] sm:w-[400px] text-black">
        <h2 className="text-2xl font-bold text-center text-heading-dark mb-4">
          Owner Login
        </h2>
        <p className="text-sm text-center text-desc-dark mb-6">
          Securely sign in with your Google account to manage your Zoomigo vehicles.
        </p>
        <div className="flex justify-center">
          <GoogleLogin 
            onSuccess={handleSuccess}
            onError={() => toast.error("Google login failed. Try again.", { position: 'top-center' })}
          />
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;

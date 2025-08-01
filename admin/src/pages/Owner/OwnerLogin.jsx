import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Fixed import
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OwnerContext } from "../../context/OwnerContext"; // If moving up two levels

const OwnerLogin = () => {
  const { setOtoken, backendUrl } = useContext(OwnerContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // Fixed function name
      const { name, email } = decoded;

      const { data } = await axios.post(`${backendUrl}/api/owner/google-login`, {
        name,
        email
      });

      if (data.success) {
        localStorage.setItem('ownerToken', data.token);
        setOtoken(data.token);
        toast.success('Login successful');
        navigate('/owner/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg flex flex-col gap-4 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Owner Login</h2>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={() => toast.error("Google login failed")}
        />
      </div>
    </div>
  );
};

export default OwnerLogin;
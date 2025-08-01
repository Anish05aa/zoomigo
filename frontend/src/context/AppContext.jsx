import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { vehicles as dummyVehicles } from '../assets/assets';


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Future vehicle-related data (was 'doctors' in HMS)
    
    const [vehicles, setVehicles] = useState([]);


    // Auth-related states (may use in future)
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [userData, setUserData] = useState(false);

    // 🚫 Commented: for future use — fetch car list from backend
    
    const getVehiclesData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/vehicles/list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setVehicles(data.vehicles);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    // 🚫 Commented: for future use — fetch user profile
    
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    
   
useEffect(() => {
    setVehicles(dummyVehicles); // ✅ this sets vehicles context from static data
  }, []);

    const value = {
        vehicles,
        getVehiclesData, // Enable later
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData // Enable later
    };

    // 🚫 Commented: Auto-fetch car data on mount
    useEffect(() => {
        getVehiclesData();
    }, []);


    // 🚫 Commented: Auto-load profile if token exists
    
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);
    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

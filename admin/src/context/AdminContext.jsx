import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
    const [dashData, setdashData] = useState({});

    const [vehicles, setVehicles] = useState([]);
    const [backendUrl] = useState(import.meta.env.VITE_BACKEND_URL);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setToken(storedToken);
            console.log("Token loaded from storage:", storedToken);
        }
    }, []);

    const updateToken = (newToken) => {
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
    };

    const getAllVehicles = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-vehicles`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setVehicles(data.vehicles);
            } else {
                toast.error(data.message || 'Failed to fetch vehicles');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const changeAvailability = async (vehId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { vehId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message || 'Vehicle availability updated successfully');
                getAllVehicles();  // Refresh list after change
            } else {
                toast.error(data.message || 'Failed to update vehicle availability');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/all-bookings`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
                    }
                }
            );

            if (data.success) {
                setBookings(data.bookings);
                console.log(data.bookings);
            } else {
                toast.error(data.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    const cancelBooking = async (bookingId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/cancel-booking`,
                { bookingId },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success(data.message || 'Booking cancelled successfully');
                getDashData(); // refresh latest bookings if you're on dashboard
                getAllBookings?.(); // optional: call this if you're on bookings list page
            } else {
                toast.error(data.message || 'Failed to cancel booking');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (data.success) {
                setdashData(data.dashData);
                console.log(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };



    // Add this to your context value
    const value = {
        adminToken: token,
        setAdminToken: updateToken,
        backendUrl,
        vehicles,
        getAllVehicles,
        changeAvailability,
        getAllBookings,
        bookings,
        setBookings,
        dashData,
        getDashData,
        cancelBooking,
        // Add refresh function
        refreshDashboard: async () => {
            await getDashData();
            await getAllBookings();
            await getAllVehicles();
        }
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;

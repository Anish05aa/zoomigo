import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import BookCar from './pages/BookCar';
import { ToastContainer } from 'react-toastify';
import ChatWidget from './components/Chatbot';
import Footer from './components/Footer';
import About from './pages/About';
import Bookings from './pages/Bookings'; // ✅ FIXED
import CarsList from './pages/CarsList'; // ✅ FIXED
import Contact from './pages/Contact';
import Home from './pages/Home'; // ✅ FIXED
import Login from './pages/Login';
import MyBookings from './pages/MyBookings'; // ✅ FIXED
import Profile from './pages/Profile';


const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className='mx-4 sm:mx-[10%]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/cars/:type" element={<CarsList />} />
          <Route path="/login" element={<Login />} />
          <Route path='/about' element={<About />} />  
          <Route path='/contact' element={<Contact />} />  
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/book-car/:carId" element={<Bookings />} />
        </Routes>
        <Footer />
      </div>
      <ChatWidget /> {/* Moved outside layout container */}
    </>
  );
};

export default App;

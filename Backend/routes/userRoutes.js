import express from 'express';
import { bookVehicle, cancelBooking, getAvailableDates, getUserBookings, getUserProfile, loginUser, paymentRazorpay, registerUser, updateUserProfile, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser, getUserProfile);
userRouter.post('/update-profile',upload.single("image"),authUser, updateUserProfile);
userRouter.post('/book-vehicle',authUser,bookVehicle );
userRouter.get('/vehicle-available-dates/:vehicleId', authUser, getAvailableDates);
userRouter.get('/bookings', authUser, getUserBookings);
userRouter.post('/cancel-booking', authUser, cancelBooking);
userRouter.post('/payment-razorpay',authUser,paymentRazorpay);
userRouter.post('/verify-razorpay',authUser,verifyRazorpay);


export default userRouter;
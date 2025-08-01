// routes/adminRouter.js
import express from 'express';
import { addVehicle, adminDashboard, adminLogin, bookingsAdmin, cancelBooking, getAllVehicles } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/vehicleController.js';
import adminauth from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-vehicle', adminauth,upload.single('image'), addVehicle);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-vehicles',adminauth,getAllVehicles)
adminRouter.post('/change-availability',adminauth, changeAvailability);
adminRouter.get('/all-bookings',adminauth, bookingsAdmin);
adminRouter.get('/dashboard', adminauth, adminDashboard);
adminRouter.post('/cancel-booking', adminauth, cancelBooking);



export default adminRouter;

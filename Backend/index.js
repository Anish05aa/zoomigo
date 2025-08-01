import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectcloudinary from './config/cloudinary.js';
import connectDB from './config/db.js';
import adminRouter from './routes/adminRouter.js';
import ownerRouter from './routes/ownerRouter.js';
import userRouter from './routes/userRoutes.js';
import vehicleRouter from './routes/vehicleRouter.js';





const app = express();
const PORT = process.env.PORT || 4000;

// Single CORS configuration
app.use(cors({
  origin: ['http://localhost:5176', 'http://localhost:5174'], // Make sure this matches your frontend URL
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
connectcloudinary();

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/vehicles', vehicleRouter); 
app.use('/api/user',userRouter);
app.use('/api/owner', ownerRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
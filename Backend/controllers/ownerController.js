import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
// Make sure this matches your model file
import bookingModel from '../models/bookingmodel.js';
import OwnerModel from '../models/ownermodel.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleOwnerLoginController = async (req, res) => {
  try {
    const { name, email } = req.body; // Changed from credential to direct data

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if owner exists or create new
    let owner = await OwnerModel.findOne({ email });

    if (!owner) {
      owner = await OwnerModel.create({
        email,
        name: name || 'Google User',
        phone: 'Not provided',
        address: {}
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: owner._id, email: owner.email, role: 'owner' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};




export const getOwnerDashboard = async (req, res) => {
  try {
    const ownerEmail = req.owner?.email;
    
    if (!ownerEmail) {
      return res.status(400).json({
        success: false,
        message: "Owner authentication failed - no email found"
      });
    }

    console.log(`Fetching dashboard for owner: ${ownerEmail}`);

    // 1. Get all bookings for this owner's vehicles
    const bookings = await bookingModel.find({
      "vehicleData.ownerEmail": ownerEmail
    })
    .sort({ createdAt: -1 }) // Newest first
    .lean();

    console.log(`Found ${bookings.length} bookings`);

    // 2. Calculate statistics
    const totalEarnings = bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0);
    const activeBookings = bookings.filter(b => !b.isCancelled && !b.isCompleted).length;
    const cancelledBookings = bookings.filter(b => b.isCancelled).length;

    // 3. Get unique vehicle count
    const vehicleIds = new Set();
    bookings.forEach(booking => {
      if (booking.vehicleData?._id) {
        vehicleIds.add(booking.vehicleData._id.toString());
      }
    });

    // 4. Prepare response
    res.json({
      success: true,
      stats: {
        totalVehicles: vehicleIds.size,
        totalBookings: bookings.length,
        activeBookings,
        cancelledBookings,
        totalEarnings,
        recentBookings: bookings.slice(0, 5) // Already sorted by date
      }
    });

  } catch (error) {
    console.error("Dashboard error:", {
      message: error.message,
      stack: error.stack,
      ownerEmail: req.owner?.email
    });
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
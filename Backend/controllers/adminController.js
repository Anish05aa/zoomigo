import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import connectCloudinary from "../config/cloudinary.js";
import bookingModel from "../models/bookingmodel.js";
import ownerModel from "../models/ownerModel.js";
import userModel from "../models/usermodel.js";
import Vehicle from "../models/vehiclemodel.js";

connectCloudinary();

export const addVehicle = async (req, res) => {
  try {
    console.log('Incoming request:', {
      body: req.body,
      file: req.file ? true : false
    });

    const {
      name,
      pricePerDay,
      category,
      description,
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerId,
      date
    } = req.body;

    // Parse location and ownerAddress
    const location = typeof req.body.location === 'string'
      ? JSON.parse(req.body.location)
      : req.body.location;

    const ownerAddress = typeof req.body.ownerAddress === 'string'
      ? JSON.parse(req.body.ownerAddress)
      : req.body.ownerAddress;

    // Validate required fields
    if (!name || !pricePerDay || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required vehicle fields"
      });
    }

    if (!location?.line1 || !location?.city || !location?.state || !location?.country) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete location information"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vehicle image is required"
      });
    }

    // Upload image
    const { secure_url } = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      { folder: "vehicles" }
    );

    // Determine if system-owned
    const isSystemOwned = !ownerName && !ownerEmail && !ownerPhone;

    // Create vehicle document - use consistent model name (Vehicle)
    const newVehicle = new Vehicle({
      name,
      pricePerDay: Number(pricePerDay),
      category,
      description,
      image: secure_url,
      location: {
        line1: location.line1,
        city: location.city,
        state: location.state,
        country: location.country
      },
      date: new Date(date),
      ownerName: ownerName || null,
      ownerEmail: ownerEmail || null,
      ownerPhone: ownerPhone || null,
      ownerAddress: ownerAddress || null,
      isSystemOwned, // This will be true if all owner fields are empty
      available: true
    });
    console.log('New vehicle data:', newVehicle);
    await newVehicle.save();

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle: newVehicle
    });

  } catch (error) {
    console.error('Add vehicle error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  }
};

// api to get allvehicles 
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      vehicles
    });
  } catch (err) {
    console.error("Get All Vehicles Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching vehicle list",
      error: err.message
    });
  }
};


// api to get all bookings list for admin panel
export const bookingsAdmin = async (req, res) => {

  try {

    const bookings = await bookingModel.find({})
    res.json({ success: true, bookings });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error in fetching appointments", error: error.message });
  }
}


// Cancel a booking by admin
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Mark booking as cancelled

    await bookingModel.findByIdAndUpdate(bookingId, { isCancelled: true });

    return res.json({ success: true, message: "Booking cancelled successfully" });

  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



export const adminDashboard = async (req, res) => {
  try {
    // Fetch all documents
    const vehicles = await Vehicle.find({});
    const users = await userModel.find({});
    const owners = await ownerModel.find({});
    const bookings = await bookingModel.find({}).populate("vehicleData");

    // Latest 5 bookings (keep as is ✅)
    const latestBookings = bookings.reverse().slice(0, 5);

    // System-owned = no ownerEmail | Owner-owned = has ownerEmail
    const systemOwnedCount = vehicles.filter(v => v.isSystemOwned === true).length;
    const ownerOwnedCount = vehicles.filter(v => v.isSystemOwned === false).length;


    // Construct dashboard data
    const dashData = {
      users: users.length,
      ownersCount: owners.length,
      vehicles: vehicles.length,
      systemOwnedCount,
      ownerOwnedCount,
      bookings: bookings.length,
      latestBookings,
    };

    return res.json({ success: true, dashData });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import moment from "moment";
import razorpay from "razorpay";
import validator from "validator";
import bookingModel from "../models/bookingmodel.js";
import userModel from "../models/usermodel.js";
import vehicleModel from "../models/vehiclemodel.js";


// API to register user



const registerUser = async (req, res) => {

    try {

        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hashing user-password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();


        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.json({ success: true, message: "User registered successfully", user, token });

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "error", error: err.message });
    }
}


//  API for user login

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // comparing password with hashed password

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // if(!isPasswordValid) {
        //     return res.json({ success: false, message: "Invalid password" });
        // }
        // generating JWT token

        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
            res.json({ success: true, message: "User logged in successfully", user, token });
        }
        else {
            res.json({ success: false, message: "Invalid password" });
        }


    } catch (error) {
        console.error(err);
        res.json({ success: false, message: "error", error: err.message });
    }
}

// / api to get user profile data
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Use decoded token from middleware
        const userData = await userModel.findById(userId).select("-password");

        res.json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// api to update user profile data
const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body;
        const userId = req.user.id;
        const imagefile = req.file;

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        const updatedFields = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        };

        if (imagefile) {
            // Upload from buffer instead of path
            const imageUpload = await cloudinary.uploader.upload(
                `data:${imagefile.mimetype};base64,${imagefile.buffer.toString('base64')}`,
                {
                    resource_type: "image",
                    folder: "user-profiles"
                }
            );
            updatedFields.image = imageUpload.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// api to book the vehicle


const bookVehicle = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware
        const { vehicleId, pickupDate, dropoffDate } = req.body;

        const newPickup = new Date(pickupDate);
        const newDropoff = new Date(dropoffDate);

        // ✅ Check if vehicle is already booked in this range
        const existingBookings = await bookingModel.find({
            vehicleId,
            $or: [
                {
                    pickupDate: { $lte: newDropoff },
                    dropoffDate: { $gte: newPickup }
                }
            ]
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Vehicle is already booked for the selected dates."
            });
        }

        // validate dates
        if (!pickupDate || !dropoffDate) {
            return res.status(400).json({ success: false, message: "Pickup and dropoff dates are required" });
        }

        // generate list of booked dates
        const start = moment(pickupDate);
        const end = moment(dropoffDate);
        const bookedDates = [];

        while (start <= end) {
            bookedDates.push(start.format("YYYY-MM-DD"));
            start.add(1, "day");
        }

        const totalDays = bookedDates.length;

        // fetch vehicle
        const vehicleData = await vehicleModel.findById(vehicleId);
        if (!vehicleData) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        // calculate price
        const amount = totalDays * vehicleData.pricePerDay;

        // fetch user
        const userData = await userModel.findById(userId).select("-password");

        const bookingData = {
            userId,
            vehicleId,
            pickupDate,
            dropoffDate,
            bookedDates,
            totalDays,
            amount,
            payment: false, // set to true after payment
            userData,
            vehicleData,
        };

        // save booking
        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Vehicle booked successfully",
            bookingId: newBooking._id,
        });

    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while booking",
            error: error.message,
        });
    }
};


// controller/userController.js

// API to get available dates for booking
const getAvailableDates = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        // Fetch existing bookings for the vehicle
        const bookings = await bookingModel.find({ vehicleId });

        const bookedSet = new Set();

        // Convert all booked date ranges into a Set
        bookings.forEach(booking => {
            const pickup = new Date(booking.pickupDate);
            const dropoff = new Date(booking.dropoffDate);
            for (
                let date = new Date(pickup);
                date <= dropoff;
                date.setDate(date.getDate() + 1)
            ) {
                bookedSet.add(new Date(date).toDateString());
            }
        });

        // Build next 15 days from today
        const today = new Date();
        const next15Days = [];
        for (let i = 0; i < 15; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            next15Days.push(date.toISOString().split("T")[0]);
        }

        // Collect bookedDates and availableDates
        const bookedDates = [];
        const availableDates = [];

        next15Days.forEach(dateStr => {
            const dateObj = new Date(dateStr);
            const readable = dateObj.toDateString();
            if (bookedSet.has(readable)) {
                bookedDates.push(dateStr);
            } else {
                availableDates.push(dateStr);
            }
        });

        res.json({
            success: true,
            message: "Available dates fetched",
            availableDates,
            bookedDates,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// API to get user bookings
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.error("getUserBookings error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// Cancel a vehicle booking
const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id; // Authenticated user
        const { bookingId } = req.body;

        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.userId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized to cancel this booking" });
        }

        // Optional: if you have a 'cancelled' flag, mark it
        booking.cancelled = true;
        await booking.save();

        // Optional: If you track booked slots separately in the vehicle model, remove them
        // Example logic for reference only:
        /*
        const vehicle = await vehicleModel.findById(booking.vehicleId);
        if (vehicle && vehicle.slots_booked) {
            for (let d = new Date(booking.pickupDate); d <= booking.dropoffDate; d.setDate(d.getDate() + 1)) {
                const dateKey = new Date(d).toISOString().split('T')[0];
                vehicle.slots_booked[dateKey] = (vehicle.slots_booked[dateKey] || []).filter(uid => uid !== userId);

                if (vehicle.slots_booked[dateKey].length === 0) {
                    delete vehicle.slots_booked[dateKey];
                }
            }
            await vehicle.save();
        }
        */

        return res.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("Cancel Booking Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// api to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {

    try {
        const { bookingId } = req.body;

        const bookingData = await bookingModel.findById(bookingId);

        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // creating options for razorpay payment
        const options = {
            amount: bookingData.amount * 100, // Amount in paise
            currency: process.env.CURRENCY,
            receipt: bookingId,

        }

        // creating order in razorpay
        const order = await razorpayInstance.orders.create(options);

        res.json({ success: true, order });
    } catch (error) {
        console.error("Cancel booking Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }






}


// api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {

    try {
        
        const {razorpay_order_id} = req.body;
        const  orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log(orderInfo);

        if (orderInfo.status=='paid') {
            await bookingModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment successfully" });
        }
        else{
            res.json({ success: false, message: "Payment failed" });
        }

    } catch (error) {
        console.error("Verify Razorpay Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}


export { bookVehicle, cancelBooking, getAvailableDates, getUserBookings, getUserProfile, loginUser, paymentRazorpay, registerUser, updateUserProfile, verifyRazorpay };


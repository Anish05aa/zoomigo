import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  vehicleData: {
    type: Object,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  pickupDate: {
    type: String,
    required: true,
  },
  dropoffDate: {
    type: String,
    required: true,
  },
  bookedDates: {
    type: [String], // array of 'YYYY-MM-DD' format dates
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const bookingModel = mongoose.models.booking || mongoose.model("bookings", bookingSchema);

export default bookingModel;

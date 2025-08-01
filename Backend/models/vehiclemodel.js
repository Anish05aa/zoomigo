import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Vehicle name is required"] 
  },
  image: { 
    type: String, 
    required: [true, "Vehicle image is required"] 
  },
  category: { 
    type: String, 
    required: [true, "Vehicle category is required"] 
  },
  pricePerDay: { 
    type: Number, 
    required: [true, "Daily price is required"],
    min: [0, "Price cannot be negative"]
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3
  },
  gearType: {
    type: String,
    enum: ['automatic', 'manual'],
    default: 'automatic'
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    default: 'petrol'
  },
  location: {
    line1: { 
      type: String, 
      required: [true, "Address line 1 is required"] 
    },
    city: { 
      type: String, 
      required: [true, "City is required"] 
    },
    state: { 
      type: String, 
      required: [true, "State is required"] 
    },
    country: { 
      type: String, 
      required: [true, "Country is required"] 
    }
  },
  date: { 
    type: Date, 
    required: [true, "Date is required"] 
  },
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Owner', 
    default: null 
  },
  ownerName: { 
    type: String, 
    default: null 
  },
  ownerEmail: { 
    type: String, 
    default: null 
  },
  ownerPhone: { 
    type: String, 
    default: null 
  },
  ownerAddress: {
    line1: { 
      type: String, 
      default: null 
    },
    city: { 
      type: String, 
      default: null 
    },
    state: { 
      type: String, 
      default: null 
    },
    country: { 
      type: String, 
      default: null 
    }
  },
  isSystemOwned: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
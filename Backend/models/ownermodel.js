import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Owner name is required"]
    },
    email: {
      type: String,
      required: [true, "Owner email is required"],
      unique: true
    },
    phone: {
      type: String,
      required: [true, "Owner phone is required"]
    },
    address: {
      line1: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  const ownerModel = mongoose.models.owners || mongoose.model("owners", ownerSchema);
  export default ownerModel;  
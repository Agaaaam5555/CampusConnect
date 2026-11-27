import mongoose from "mongoose";

const ZONES = ["Main Gate", "Library", "Block A", "Block B", "Canteen", "Hostel", "Sports Ground"];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  skillsOffered: { type: [String], default: [] },
  campusZone: { type: String, enum: ZONES, default: "Library" },
  reputationPoints: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: false, default: "", trim: true},
  category: { type: String, required: true, trim: true },
  urgency: { type: String, default: "Medium", trim: true },
  campusZone: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Open", "Accepted", "Completed"], default: "Open" },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  helper: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

export default mongoose.model("HelpRequest", helpRequestSchema);
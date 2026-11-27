import express from "express";
import HelpRequest from "../models/HelpRequest.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";
import { rankHelpers } from "../utils/matcher.js";

const router = express.Router();

// GET /api/requests?category=&urgency=
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.urgency) filter.urgency = req.query.urgency;

    const list = await HelpRequest.find(filter)
      .populate("requester", "name")
      .populate("helper", "name")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/requests
router.post("/", protect, async (req, res) => {
  try {
    console.log("Incoming POST /api/requests body:", req.body, "userId:", req.userId);
    const { title, description = "", category, urgency = "Medium", campusZone } = req.body;
    const created = await HelpRequest.create({
      title,
      description,
      category,
      urgency,
      campusZone,
      requester: req.userId,
    });
    const populated = await created.populate("requester", "name");
    res.status(201).json(populated);
  } catch (err) {
    console.error("POST /api/requests failed:", err.message);
    res.status(400).json({ message: err.message });
  }
});

// GET /api/requests/:id/matches
router.get("/:id/matches", async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const candidates = await User.find({ _id: { $ne: request.requester } }).select("-password");
    const matches = rankHelpers(candidates, request);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/requests/:id/accept
router.patch("/:id/accept", protect, async (req, res) => {
  try {
    const updated = await HelpRequest.findOneAndUpdate(
      { _id: req.params.id, status: "Open" },
      { status: "Accepted", helper: req.userId },
      { new: true }
    )
      .populate("requester", "name")
      .populate("helper", "name");

    if (!updated) return res.status(400).json({ message: "Request already accepted or not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/requests/:id/complete
router.patch("/:id/complete", protect, async (req, res) => {
  try {
    const updated = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    )
      .populate("requester", "name")
      .populate("helper", "name");

    if (!updated) return res.status(404).json({ message: "Request not found" });

    // Award +10 reputation points to the helper
    if (updated.helper) {
      await User.findByIdAndUpdate(updated.helper._id, { $inc: { reputationPoints: 10 } });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/requests/:id/messages
router.get("/:id/messages", async (req, res) => {
  try {
    const msgs = await Message.find({ requestId: req.params.id })
      .populate("sender", "name")
      .sort({ createdAt: 1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/requests/:id/messages
router.post("/:id/messages", protect, async (req, res) => {
  try {
    const msg = await Message.create({
      requestId: req.params.id,
      sender: req.userId,
      text: req.body.text,
    });
    const populated = await msg.populate("sender", "name");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

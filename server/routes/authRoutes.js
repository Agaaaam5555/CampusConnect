import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const formatUser = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  skillsOffered: u.skillsOffered,
  campusZone: u.campusZone,
  reputationPoints: u.reputationPoints,
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, skillsOffered = [], campusZone = "Library" } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password || "123456", 10);
    const user = await User.create({ name, email, password: hashedPassword, skillsOffered, campusZone });
    res.status(201).json({ token: signToken(user._id), user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ token: signToken(user._id), user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

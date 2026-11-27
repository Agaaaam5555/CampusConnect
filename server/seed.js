import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import HelpRequest from "./models/HelpRequest.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await HelpRequest.deleteMany({});

  const password = await bcrypt.hash("123456", 10);

  const users = await User.insertMany([
    { name: "Riya Sharma", email: "riya@chitkara.edu.in", password, skillsOffered: ["Notes", "DBMS", "SQL"], campusZone: "Library", reputationPoints: 212 },
    { name: "Karan Mehta", email: "karan@chitkara.edu.in", password, skillsOffered: ["Coding", "Express", "MongoDB"], campusZone: "Block A", reputationPoints: 168 },
    { name: "Naina Gill", email: "naina@chitkara.edu.in", password, skillsOffered: ["Hardware", "Calculators", "Maths"], campusZone: "Hostel", reputationPoints: 121 },
    { name: "Harman Singh", email: "harman@chitkara.edu.in", password, skillsOffered: ["Hardware", "CAD", "Notes"], campusZone: "Block B", reputationPoints: 96 },
    { name: "Ishita Verma", email: "ishita@chitkara.edu.in", password, skillsOffered: ["Academics", "Excel", "Presentations"], campusZone: "Canteen", reputationPoints: 74 },
    { name: "Dev Malhotra", email: "dev@chitkara.edu.in", password, skillsOffered: ["Coding", "Python", "Recursion"], campusZone: "Library", reputationPoints: 58 },
  ]);

  await HelpRequest.insertMany([
    { title: "Need DBMS notes for Unit 3", description: "Missed last week's lectures. Normalization and transactions notes would help.", category: "Notes", urgency: "High", campusZone: "Block A", requester: users[4]._id },
    { title: "Need Scientific Calculator", description: "For 2 PM exam in Block B. Only need it for two hours.", category: "Hardware", urgency: "High", campusZone: "Block B", requester: users[0]._id },
    { title: "Coding partner for weekend hackathon", description: "Looking for someone who knows Express and MongoDB.", category: "Coding", urgency: "Medium", campusZone: "Canteen", requester: users[5]._id },
    { title: "Explain Laplace transforms quickly", description: "Exam in two days and the lecture notes make no sense to me.", category: "Academics", urgency: "High", campusZone: "Hostel", requester: users[2]._id },
  ]);

  console.log("Database seeded with 6 helpers & 4 requests!");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

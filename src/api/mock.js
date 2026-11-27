// Fake backend with the SAME shapes as the real API contract.
import { walkMinutes } from "../data/campus";

const wait = (v, ms = 250) => new Promise((res) => setTimeout(() => res(structuredClone(v)), ms));
const ago = (h) => new Date(Date.now() - h * 3600e3).toISOString();
const me = () => JSON.parse(localStorage.getItem("cc_user") || "{}");

const U = (_id, name, skillsOffered, campusZone, reputationPoints) => ({ _id, name, email: `${name.split(" ")[0].toLowerCase()}@chitkara.edu.in`, skillsOffered, campusZone, reputationPoints });

let users = [
  U("u2", "Riya Sharma", ["Notes", "DBMS", "SQL"], "Library", 212),
  U("u3", "Karan Mehta", ["Coding", "Express", "MongoDB"], "Block A", 168),
  U("u4", "Naina Gill", ["Hardware", "Calculators", "Maths"], "Hostel", 121),
  U("u5", "Harman Singh", ["Hardware", "CAD", "Notes"], "Block B", 96),
  U("u6", "Ishita Verma", ["Academics", "Excel", "Presentations"], "Canteen", 74),
  U("u7", "Dev Malhotra", ["Coding", "Python", "Recursion"], "Library", 58),
];

const R = (_id, title, description, category, urgency, campusZone, status, requester, helper, h) =>
  ({ _id, title, description, category, urgency, campusZone, status, requester, helper, createdAt: ago(h) });

let requests = [
  R("r1", "Need DBMS notes for Unit 3", "Missed last week's lectures. Normalization and transactions notes would help.", "Notes", "High", "Block A", "Open", { _id: "u6", name: "Ishita Verma" }, null, 2),
  R("r2", "Need Scientific Calculator", "For 2 PM exam in Block B. Only need it for two hours.", "Hardware", "High", "Block B", "Open", { _id: "u9", name: "Arjun Kapoor" }, null, 5),
  R("r3", "Coding partner for weekend hackathon", "Looking for someone who knows Express and MongoDB.", "Coding", "Medium", "Canteen", "Open", { _id: "u7", name: "Dev Malhotra" }, null, 20),
  R("r4", "Explain Laplace transforms quickly", "Exam in two days and the lecture notes make no sense to me.", "Academics", "High", "Hostel", "Open", { _id: "u8", name: "Tanya Bansal" }, null, 8),
  R("r5", "Drafting tools for engineering graphics", "Need a mini drafter and set squares for one day.", "Hardware", "Medium", "Library", "Open", { _id: "u4", name: "Naina Gill" }, null, 26),
  R("r6", "Git merge conflict help", "Our repo is a mess after a bad merge.", "Coding", "Medium", "Block A", "Completed", { _id: "u3", name: "Karan Mehta" }, { _id: "u7", name: "Dev Malhotra" }, 70),
  R("r9", "Help setting up Express routes", "Stuck on route structure and middleware order for my course project.", "Coding", "Medium", "Library", "Open", { _id: "u1", name: "You" }, null, 3),
  R("r10", "Explain recursion with examples", "I get the basics but trees and backtracking confuse me.", "Academics", "Low", "Library", "Accepted", { _id: "u1", name: "You" }, { _id: "u7", name: "Dev Malhotra" }, 28),
];

let messages = {
  r10: [
    { _id: "m1", sender: { _id: "u7", name: "Dev Malhotra" }, text: "Hey! Happy to explain recursion. Free after 4?", createdAt: ago(5) },
  ],
};

const view = (r) => (r.requester._id === "u1" ? { ...r, requester: { ...r.requester, name: me().name || "You" } } : r);

export const mock = {
  login: ({ email }) =>
    wait({ token: "mock-token", user: { _id: "u1", name: email.split("@")[0], email, skillsOffered: ["Coding", "Notes"], campusZone: "Library", reputationPoints: 20 } }),
  register: ({ name, email, skillsOffered = [], campusZone = "Library" }) =>
    wait({ token: "mock-token", user: { _id: "u1", name, email, skillsOffered, campusZone, reputationPoints: 0 } }),

  getRequests: ({ category, urgency } = {}) =>
    wait(requests.filter((r) => (!category || r.category === category) && (!urgency || r.urgency === urgency)).map(view)),
  getRequest: (id) => wait(requests.find((r) => r._id === id) ? view(requests.find((r) => r._id === id)) : null),
  createRequest: (d) => {
    const r = { _id: "r" + Date.now(), ...d, status: "Open", requester: { _id: me()._id, name: me().name }, helper: null, createdAt: new Date().toISOString() };
    requests = [r, ...requests];
    return wait(r);
  },
  // returns plain User objects, best match first
  getMatches: (id) => {
    const r = requests.find((x) => x._id === id);
    const text = `${r.title} ${r.description} ${r.category}`.toLowerCase();
    const score = (u) =>
      u.skillsOffered.filter((s) => text.includes(s.toLowerCase())).length * 10 - (walkMinutes(u.campusZone, r.campusZone) ?? 8);
    return wait([...users].sort((a, b) => score(b) - score(a)).slice(0, 4));
  },
  acceptRequest: (id) => {
    requests = requests.map((r) => (r._id === id ? { ...r, status: "Accepted", helper: { _id: me()._id, name: me().name } } : r));
    return wait(requests.find((r) => r._id === id));
  },
  completeRequest: (id) => {
    requests = requests.map((r) => (r._id === id ? { ...r, status: "Completed" } : r));
    return wait(requests.find((r) => r._id === id));
  },
  getMessages: (id) => wait(messages[id] || [], 120),
  sendMessage: (id, text) => {
    const m = { _id: "m" + Date.now(), sender: { _id: me()._id, name: me().name }, text, createdAt: new Date().toISOString() };
    messages[id] = [...(messages[id] || []), m];
    const r = requests.find((x) => x._id === id);
    const other = r.requester._id === me()._id ? r.helper : r.requester;
    setTimeout(() => {
      messages[id] = [...messages[id], { _id: "m" + Date.now(), sender: other, text: "Sure, I can help. When are you free?", createdAt: new Date().toISOString() }];
    }, 1500);
    return wait(m, 100);
  },
};

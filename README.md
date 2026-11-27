# CampusConnect Frontend

React + Vite + Tailwind CSS v4 + Axios + lucide-react.

## Run
1. Install Node.js (LTS) from nodejs.org
2. `npm install`
3. `npm run dev`  ->  http://localhost:5173

## Connect to the backend
Edit `.env`:
- `VITE_USE_MOCK=true`  fake data from `src/api/mock.js` (same shapes as the real API)
- `VITE_USE_MOCK=false` + `VITE_API_URL=http://localhost:5000` uses the real backend

All real calls are in `src/api/client.js`. Backend needs CORS enabled for http://localhost:5173.

## Things to keep in sync with the backend
- Zone names: `src/data/campus.js` (must equal the strings stored in `campusZone`)
- Categories: `src/lib/utils.js` (`CATEGORIES`)
- Status strings: "Open", "Accepted", "Completed"

## Pages
Public: Landing, How it works, 404 | Auth: Login, Register
App: Dashboard, Requests, Create request, Request details, Campus map, Messages, Chat, My profile, Settings

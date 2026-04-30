# 🚗 DriveEasy: Premium Full-Stack Car Rental Platform

DriveEasy is a high-performance, production-ready MERN stack application designed to revolutionize the car rental experience. It offers a seamless, dual-sided marketplace for car owners and renters, featuring real-time communication, secure payments, and a state-of-the-art administrative dashboard.

## ✨ Key Features

### 👤 For Renters (User Panel)
- **Advanced Car Discovery**: Browse vehicles with real-time availability status and smart filtering.
- **Precision Booking Flow**: Interactive booking system with "Days and Hours" duration tracking.
- **Dual Payment Methods**: Secure online payments via Razorpay or flexible offline booking.
- **Personalized History**: Detailed booking cards with accurate timestamps and rental timelines.
- **Real-Time Communication**: Instant messaging with car owners to coordinate pickups and returns.
- **Reviews & Testimonials**: Share feedback with optional image uploads to maintain platform trust.

### 💼 For Car Owners (Business Dashboard)
- **Comprehensive Fleet Management**: List, edit, and delete vehicles with deep pricing controls (Hourly Rate + Late Fees).
- **Executive Analytics**: Visual performance charts tracking revenue, booking trends, and fleet health.
- **Live Business Operations**: Manage booking requests, track payment statuses, and toggle vehicle availability instantly.
- **User Management**: Monitor user activity and maintain security with block/unblock capabilities.
- **Integrated Chat Hub**: A centralized messaging interface with scroll-stability and typing indicators.

### 🚀 Premium UI/UX Features
- **Scroll Stability Engine**: Advanced logic preventing layout jumps during active messaging or history reading.
- **Intelligent Loading**: Custom-tuned Skeleton screens that mirror final content layouts for zero-jitter loading.
- **Glassmorphism & Dark Mode**: A sleek, modern aesthetic using tailwind-tailored dark modes and vibrant gradients.
- **Micro-Animations**: Smooth transitions powered by Framer Motion for a high-end, responsive feel.

---

## 🛠️ Technology Stack

### **Frontend**
- **Core**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand (Atomic State Architecture)
- **Animations**: Framer Motion
- **Real-time**: Socket.IO Client
- **Charts**: Chart.js / React-Chartjs-2
- **Networking**: Axios

### **Backend**
- **Runtime**: Node.js / Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) with Secure Cookies
- **Communication**: Socket.IO (WebSockets)
- **Payments**: Razorpay Integration
- **Storage**: ImageKit / Multer (Cloud Media Processing)
- **Emails**: Resend API for transactional notifications

---

## 📂 Project Structure

```txt
CarRental/
├── client/                 # Frontend (React 19 + Vite)
│   ├── src/
│   │   ├── components/     # Atomic UI components
│   │   ├── pages/          # Layout-level components
│   │   ├── store/          # Zustand State Management
│   │   ├── assets/         # Static icons and media
│   │   └── utils/          # Helper functions & Scroll Engine
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── Routes/         # API Endpoint definitions
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # MongoDB Schemas
│   │   ├── middleware/     # Auth & Error Handlers
│   │   ├── configs/        # Database & API configs
│   └── index.js            # Entry point & Socket.IO initialization
```

---

## ⚙️ Installation & Setup

### **1. Prerequisites**
- Node.js (v18+)
- MongoDB Atlas Account
- Razorpay API Keys
- ImageKit Account

### **2. Server Configuration**
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and populate:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
VITE_CURRENCY=₹

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint

# Razorpay
RAZORPAY_KEY_ID=your_id
RAZORPAY_KEY_SECRET=your_secret

# Email
RESEND_API_KEY=your_key
```
4. Start dev server: `npm run dev`

### **3. Client Configuration**
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CURRENCY=₹
```
4. Start frontend: `npm run dev`

---

## 🔌 API Endpoints

### **User Routes** (`/api/user`)
- `POST /register` - New user signup
- `POST /login` - Authentication
- `GET /data` - Get authenticated user profile
- `GET /cars` - Fetch all available vehicles
- `POST /add-review` - Submit a testimonial (with image)

### **Booking Routes** (`/api/bookings`)
- `POST /check-availability` - Validate car for specific dates
- `POST /create` - Offline booking request
- `POST /create-online` - Razorpay order generation
- `POST /verify-payment` - Signature verification
- `GET /user` - Fetch renter's booking history

### **Owner Routes** (`/api/owner`)
- `GET /dashboard` - Fetch high-level business analytics
- `POST /add-car` - List a new vehicle
- `POST /edit-car` - Update car specs and pricing
- `POST /update-status` - Toggle car availability

### **Chat Routes** (`/api/chat`)
- `POST /create-chat` - Initialize conversation
- `POST /send-message` - Relay real-time message
- `GET /get-messages` - Fetch chat history

---

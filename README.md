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

## ☁️ Media Storage & Upload Architecture (ImageKit & Cloudinary)

This project handles file uploads (car images, user profiles, and review images) using **Multer** on the Express backend and **Axios FormData** on the React frontend.

### 1. Current System: ImageKit (Memory Buffer Storage)
Currently, the project uses memory storage to buffer files in RAM, uploading them as base64 strings to **ImageKit**.
* **Middleware ([multer.js](file:///c:/Users/a/Desktop/Car-Rental/CarRental/server/src/configs/multer.js))**:
  ```javascript
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  });
  ```
* **Controller Upload ([owner.controller.js](file:///c:/Users/a/Desktop/Car-Rental/CarRental/server/src/controllers/owner.controller.js))**:
  ```javascript
  const response = await imagekit.files.upload({
    file: imageFile.buffer.toString("base64"),
    fileName: imageFile.originalname,
    folder: "/cars",
  });
  const optimizedUrl = response.url + "?tr=w-1280,q-auto,f-avif";
  ```

---

### 2. Transition Blueprint to Cloudinary & PDF Uploads
To scale your uploads, support PDF documents, and free up server RAM, follow this production migration path:

#### Step A: Backend Setup
1. **Install dependencies**: `npm install cloudinary`
2. **Environment Variables**: Add your details to `server/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. **Cloudinary Configuration (`server/src/configs/cloudinary.js`)**:
   ```javascript
   import { v2 as cloudinary } from 'cloudinary';
   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
     secure: true
   });
   export default cloudinary;
   ```
4. **Multer Disk Middleware (`server/src/middleware/multer.js`)**:
   *Disk storage prevents RAM overflow on large files/PDFs.*
   ```javascript
   import multer from 'multer';
   import path from 'path';
   
   const storage = multer.diskStorage({
     destination: './tmp/uploads',
     filename: (req, file, cb) => {
       cb(null, `${Date.now()}-${file.originalname}`);
     }
   });
   export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
   ```
5. **Secure Controller & Cleanup (`server/src/controllers/upload.controller.js`)**:
   ```javascript
   import cloudinary from '../configs/cloudinary.js';
   import fs from 'fs/promises';

   export const uploadSingleFile = async (req, res) => {
     if (!req.file) return res.status(400).json({ error: 'No file provided' });
     try {
       const result = await cloudinary.uploader.upload(req.file.path, {
         folder: req.file.mimetype === 'application/pdf' ? 'documents' : 'images',
         resource_type: 'auto'
       });
       return res.status(200).json({ success: true, url: result.secure_url });
     } catch (err) {
       return res.status(500).json({ error: err.message });
     } finally {
       // CRITICAL: Clean up disk storage immediately to avoid memory leaks
       await fs.unlink(req.file.path);
     }
   };
   ```

#### Step B: Frontend Signed Axios Request (`client/src/utils/fileUpload.js`)
```javascript
import axios from 'axios';

export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/upload/file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    }
  });
  return response.data;
};
```

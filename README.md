# Car Rental Platform

A production-style full stack car rental platform with user booking flow, owner dashboard, online payments, media upload, and real-time chat.

## Highlights

- Role-based experience for users and car owners
- Car listing with availability toggling and owner controls
- Offline and Razorpay online booking flow
- Real-time messaging with Socket.IO
- Image uploads via Multer + ImageKit
- Testimonial/review support with optional image
- Zustand-based frontend state management

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Zustand
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Razorpay
- ImageKit

## Project Structure

```txt
CarRental/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   ├── UI/
│   │   │   ├── booking/
│   │   │   ├── car/
│   │   │   ├── chat/
│   │   │   ├── owner/
│   │   │   └── testimonial/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   └── owner/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── socket.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── configs/
│   │   │   ├── db.js
│   │   │   ├── imagekit.js
│   │   │   ├── multer.js
│   │   │   ├── razorpay.js
│   │   │   └── socket.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── Routes/
│   ├── index.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Features

### User Side

- Register/login and protected profile data access
- Browse all cars and open specific car details
- Check availability before booking
- Create bookings (offline or online)
- View own bookings and payment status
- Give reviews/testimonials
- Chat with owners in real time

### Owner Side

- Upgrade user role to owner
- Add, edit, delete, and toggle car availability
- View owner dashboard metrics
- Access owner booking list and update booking/payment status
- Access owner chat list and messages
- Manage users (view all and block/unblock)

## API Routes

Base API path is served from server and mounted as below.

### User Routes (`/api/user`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /data` - Get logged-in user data (protected)
- `GET /cars` - Get all listed cars
- `POST /add-review` - Add review with optional image (protected)
- `GET /get-reviews` - Get all reviews
- `GET /user-cardetails/:id` - Get single car details (protected)

### Owner Routes (`/api/owner`)

- `POST /change-role` - Change user role to owner (protected)
- `POST /add-car` - Add car with image upload (protected)
- `GET /cars` - Get owner cars (protected)
- `POST /toggle-car` - Toggle car availability (protected)
- `POST /delete-car` - Delete car (protected)
- `POST /edit-car` - Edit car details/image (protected)
- `GET /dashboard` - Owner dashboard stats (protected)
- `POST /update-image` - Update owner profile image (protected)
- `GET /allusers` - Get all users (protected)
- `POST /block-unblock` - Block/unblock user (protected)
- `GET /owner-details/:id` - Get owner details (protected)
- `GET /owner-chats` - Get owner chats (protected)

### Booking Routes (`/api/bookings`)

- `POST /check-availability` - Check car availability
- `POST /create` - Create offline booking (protected)
- `POST /create-online` - Create online booking order (protected)
- `POST /verify-payment` - Verify Razorpay payment (protected)
- `GET /user` - Get logged-in user bookings (protected)
- `GET /owner` - Get owner bookings (protected)
- `POST /change-status` - Change booking status (protected)
- `POST /change-payment-status` - Change payment status (protected)

### Chat Routes (`/api/chat`)

- `POST /create-chat` - Create/get chat between users (protected)
- `POST /send-message` - Send message (protected)
- `GET /get-messages` - Get messages by chat (protected)

## Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string_without_db_name
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file inside `client/`:

```env
VITE_BASE_URL=http://localhost:8080
VITE_CURRENCY=INR
```

## Installation and Running

### 1) Clone repository

```bash
git clone <your-repository-url>
cd CarRental
```

### 2) Install backend dependencies

```bash
cd server
npm install
```

### 3) Install frontend dependencies

```bash
cd ../client
npm install
```

### 4) Run backend (Terminal 1)

```bash
cd ../server
npm run dev
```

### 5) Run frontend (Terminal 2)

```bash
cd ../client
npm run dev
```

Frontend default: `http://localhost:5173`

Backend default (from `.env`): `http://localhost:8080`

## Scripts

### Server

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend with node

### Client

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview built app
- `npm run lint` - Run ESLint

## Notes

- Update frontend API base URL from `client/src/lib/axios.js` or move it to `VITE_BASE_URL` consistently for all requests.
- Configure CORS origins in `server/index.js` for your deployed frontend domain.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

🚗 Car Rental Website – MERN Stack

A full-stack car rental platform built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to browse cars, check availability, make bookings, and manage rentals. Admins can manage cars, users, and bookings through a secure dashboard.

✅ Features
👤 User Features

     -> User authentication (JWT based login & signup)

     ->Browse cars with filters (brand, price, fuel type, seats, etc.)

     ->View car details & availability

     ->Real-time booking with date selection

     ->Online payment integration (optional placeholder)

     ->Booking history & active rentals

     ->Responsive UI (mobile + desktop)

🛠 Admin Features

Admin dashboard

Add / Update / Delete cars

Manage bookings

Manage users

Update car availability status

⭐ Other Features

Secure REST APIs

Image upload support

Validation & error handling

Toast notifications

Protected routes (Frontend + Backend)

🧰 Tech Stack
Frontend

React.js

React Router

Tailwind CSS / CSS / MUI (edit accordingly)

Axios

Context API / Redux (edit accordingly)

Backend

Node.js

Express.js

MongoDB + Mongoose

JSON Web Token (JWT)

Bcrypt.js

Dev Tools

Nodemon

Cloudinary / ImageKit (optional for images)

Stripe / Razorpay (optional payments)

🧪 Future Improvements

Real-time chat with car owners

Push notifications

Mobile app (React Native)

Multi-language support

Google Maps pickup locations


🔌 Available Scripts
Client

npm run dev – start React app

npm run build – production build

Server

npm run dev – start dev server with nodemon

npm start – production server

🛣 API Endpoints (Sample)
Auth

POST /api/auth/register

POST /api/auth/login

Cars

GET /api/cars

GET /api/cars/:id

POST /api/cars (admin)

PUT /api/cars/:id (admin)

DELETE /api/cars/:id (admin)

Bookings

POST /api/bookings

GET /api/bookings/user/:id

GET /api/bookings (admin)

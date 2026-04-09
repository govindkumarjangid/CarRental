<h1 align="center">🚗 Car Rental Web Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" />
  <img src="https://img.shields.io/badge/Stack-MERN-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green" />
</p>

<p align="center">
  A full-stack <b>Car Rental Web Application</b> that allows users to browse cars,
  book rentals, manage bookings, and communicate in real time.
</p>

<hr/>

<h2>✨ Features</h2>
<ul>
 <li>🚘 Browse available cars with complete details</li>
      <li>🗺 Location-based car search</li>
<li>🔍 Search and filter cars by price, category, and availability</li>
<li>📅 Car booking and rental management system</li>
<li>👤 User authentication (Login / Signup)</li>
<li>💳 Secure online payment integration</li>
<li>⭐ Rating and review system for exprience</li>
<li>💬 Real-time chat between user and car owner</li>
<li>📊 Owner dashboard to manage cars, bookings, and earnings</li>
<li>📱 Fully responsive user interface</li>

</ul>

<hr/>

<h2>🛠 Tech Stack</h2>

<h3>Frontend</h3>
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="40" alt="HTML"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="40" alt="CSS"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" alt="JavaScript"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="40" alt="React"/>
<img src="https://img.icons8.com/color/48/tailwind_css.png" width="40" alt="Tailwind CSS"/>
</p>

<h3>Backend</h3>
<p>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="40" alt="Node.js"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" width="40" alt="Express"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" width="40" alt="MongoDB"/>
  <img src="https://img.icons8.com/ios-filled/50/000000/api.png" width="40" alt="REST API"/>
</p>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
CarRental/
│
├── server/
│   ├── src/
│   │   ├── configs/
│   │   │   ├── db.js
│   │   │   ├── imagekit.js
│   │   │   ├── multer.js
│   │   │   ├── razorpay.js
│   │   │   └── socket.js
│   │   ├── controllers/
│   │   │   ├── bookingController.js
│   │   │   ├── chatController.js
│   │   │   ├── ownerController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── Booking.js
│   │   │   ├── Car.js
│   │   │   ├── Chat.js
│   │   │   ├── Message.js
│   │   │   ├── Review.js
│   │   │   └── User.js
│   │   └── Routes/
│   │       ├── bookingRoutes.js
│   │       ├── chatRoutes.js
│   │       ├── ownerRoutes.js
│   │       └── userRoutes.js
│   ├── index.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── assets.jsx
│   │   │   ├── logo.svg
│   │   │   ├── main_car.png
│   │   │   └── banner_car_image.png
│   │   ├── components/
│   │   │   ├── Home/
│   │   │   │   ├── Banner.jsx
│   │   │   │   ├── FeaturedSection.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Newsletter.jsx
│   │   │   ├── UI/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── NotFound404.jsx
│   │   │   │   └── Title.jsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingCard.jsx
│   │   │   │   ├── BookingCardSkeleton.jsx
│   │   │   │   └── EmptyBookings.jsx
│   │   │   ├── car/
│   │   │   │   ├── CarCard.jsx
│   │   │   │   ├── CarCardSkeleton.jsx
│   │   │   │   └── CarDetailsSkeleton.jsx
│   │   │   ├── chat/
│   │   │   │   └── ChatMessagesSkeleton.jsx
│   │   │   ├── owner/
│   │   │   │   ├── EditCarForm.jsx
│   │   │   │   ├── NavbarOwner.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Title.jsx
│   │   │   └── testimonial/
│   │   │       ├── MarqueeRow.jsx
│   │   │       ├── Testmonial.jsx
│   │   │       ├── TestimonialCard.jsx
│   │   │       ├── TestimonialForm.jsx
│   │   │       └── TestimonialSkeleton.jsx
│   │   ├── context/
│   │   │   └── ProtectRoute.jsx
│   │   ├── lib/
│   │   │   └── axios.js
│   │   ├── pages/
│   │   │   ├── owner/
│   │   │   │   ├── AddCar.jsx
│   │   │   │   ├── AllUsers.jsx
│   │   │   │   ├── Chats.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageBookings.jsx
│   │   │   │   └── ManageCars.jsx
│   │   │   ├── Cardetails.jsx
│   │   │   ├── Cars.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Mybookings.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useBookingStore.js
│   │   │   ├── useCarStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── main.jsx
│   │   └── socket.js
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   ├── package.json
│   └── package-lock.json
│
└── README.md
</pre>

<hr/>

<h2>🚀 Installation & Setup</h2>

<pre>
# Clone repository
git clone https://github.com/govindkumarjangid/CarRental.git

# Backend setup
cd server
npm install
npm start

# Frontend setup
cd client
npm install
npm run dev
</pre>

<hr/>

<h2>📸 Screenshots</h2>

<p>
  Add Later
</p>

<hr/>

<h2>🔮 Future Enhancements</h2>
<ul>
 <li>📧 Email notifications for bookings and status updates</li>
 <li>⭐ Rating and review system for cars</li>
</ul>

<hr/>

<h2>🤝 Contributing</h2>
<p>
  Contributions are welcome! Fork the repository, create a branch, and submit a pull request.
</p>

<hr/>

<h2>👨‍💻 Author</h2>

<p>
  <b>Your Name</b><br/>
  <a href="https://github.com/govindkumarjangid/">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" width="25"/>
    GitHub
  </a>
  &nbsp;&nbsp;
  <a href="https://linkedin.com/in/your-profile">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" width="25"/>
    LinkedIn
  </a>
</p>

<hr/>

<p align="center">
  ⭐ If you like this project, don’t forget to star the repository!
</p>

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cars from "./pages/Cars.jsx";
import Mybookings from "./pages/Mybookings.jsx";
import Cardetails from "./pages/Cardetails.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/owner/Dashboard.jsx";
import AddCar from "./pages/owner/AddCar.jsx";
import ManageCars from "./pages/owner/ManageCars.jsx";
import ManageBookings from "./pages/owner/ManageBookings.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./components/Login.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import TestimonialForm from "./components/TestimonialForm.jsx";

const App = () => {
	const { showLogin, showReview, useLocation, Routes, Route, Toaster } =
		useAppContext();

	const isOwnerPath = useLocation().pathname.startsWith("/owner");

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			{showLogin && <Login />}

			{!isOwnerPath && <Navbar />}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cars" element={<Cars />} />
				<Route path="/car-details/:id" element={<Cardetails />} />
				<Route path="/my-bookings" element={<Mybookings />} />
				<Route path="*" element={<div>404 Not Found</div>} />

				<Route path="/owner" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="add-car" element={<AddCar />} />
					<Route path="manage-cars" element={<ManageCars />} />
					<Route
						path="manage-bookings"
						element={<ManageBookings />}
					/>
				</Route>
			</Routes>
			{showReview && <TestimonialForm />}

			{!isOwnerPath && <Footer />}
		</>
	);
};

export default App;

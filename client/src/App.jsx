import Navbar from "./components/UI/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cars from "./pages/Cars.jsx";
import Mybookings from "./pages/Mybookings.jsx";
import Cardetails from "./pages/Cardetails.jsx";
import Footer from "./components/UI/Footer.jsx";
import Dashboard from "./pages/owner/Dashboard.jsx";
import AddCar from "./pages/owner/AddCar.jsx";
import ManageCars from "./pages/owner/ManageCars.jsx";
import ManageBookings from "./pages/owner/ManageBookings.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./components/UI/Login.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import TestimonialForm from "./components/testimonial/TestimonialForm.jsx";
import ProtectRoute from "./context/ProtectRoute.jsx";
import EditCarForm from "./components/owner/EditCarForm.jsx";
import AllUsers from "./pages/owner/AllUsers.jsx"
import Chats from "./pages/owner/Chats.jsx";
import ChatPage from "./pages/ChatPage.jsx";

const App = () => {
	const { showLogin, showReview, useLocation, Routes, Route, Toaster, showEditCar } =
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
				<Route path="/chatpage/:id" element={<ChatPage />} />
				<Route path="/my-bookings" element={<Mybookings />} />
				<Route path="*" element={<div>404 Not Found</div>} />

				<Route path="/owner" element={
					<ProtectRoute>
						<Layout />
					</ProtectRoute>
				}>
					<Route index element={
						<ProtectRoute>
							<Dashboard />
						</ProtectRoute>
					} />
					<Route path="add-car" element={
						<ProtectRoute>
							<AddCar />
						</ProtectRoute>
					} />
					<Route path="manage-cars" element={
						<ProtectRoute>
							<ManageCars />
						</ProtectRoute>
					} />
					<Route
						path="manage-bookings"
						element={
							<ProtectRoute>
								<ManageBookings />
							</ProtectRoute>
						}
					/>
					<Route
						path="users"
						element={
							<ProtectRoute>
								<AllUsers />
							</ProtectRoute>
						}
					/>
					<Route
						path="chats"
						element={
							<ProtectRoute>
								<Chats />
							</ProtectRoute>
						}
					/>
				</Route>
			</Routes>
			{showReview && <TestimonialForm />}
			{showEditCar && <EditCarForm />}

			{!isOwnerPath && <Footer />}
		</>
	);
};

export default App;

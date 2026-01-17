import Home from "./pages/Home.jsx";
import Cars from "./pages/Cars.jsx";
import Layout from "./pages/Layout.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Chats from "./pages/owner/Chats.jsx";
import Login from "./components/UI/Login.jsx";
import AddCar from "./pages/owner/AddCar.jsx";
import Navbar from "./components/UI/Navbar.jsx";
import Mybookings from "./pages/Mybookings.jsx";
import Cardetails from "./pages/Cardetails.jsx";
import Footer from "./components/UI/Footer.jsx";
import AllUsers from "./pages/owner/AllUsers.jsx"
import Dashboard from "./pages/owner/Dashboard.jsx";
import ProtectRoute from "./context/ProtectRoute.jsx";
import ManageCars from "./pages/owner/ManageCars.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import NotFound404 from "./components/UI/NotFound404.jsx";
import EditCarForm from "./components/owner/EditCarForm.jsx";
import ManageBookings from "./pages/owner/ManageBookings.jsx";
import TestimonialForm from "./components/testimonial/TestimonialForm.jsx";

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
				<Route path="*" element={<NotFound404 />} />

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

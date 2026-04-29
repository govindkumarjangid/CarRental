import { useAuthStore } from "./store/useAuthStore.js";
import { useCarStore } from "./store/useCarStore.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
	Home,
	Cars,
	Layout,
	ChatPage,
	Chats,
	Login,
	AddCar,
	Navbar,
	Mybookings,
	Cardetails,
	Footer,
	AllUsers,
	Dashboard,
	ProtectRoute,
	ManageCars,
	NotFound404,
	TestimonialForm,
	EditCarForm,
	ManageBookings,
} from "./index.js";

import ScrollToTop from "./components/UI/ScrollToTop.jsx";

const App = () => {
	const { showLogin, showReview, token, fetchUser } = useAuthStore();
	const { fetchCars, showEditCar } = useCarStore();
	const location = useLocation();
	const isOwnerPath = location.pathname.startsWith("/owner");
	const isChatPath = location.pathname.startsWith("/chatpage");

	useEffect(() => {
		fetchCars();
	}, []);

	useEffect(() => {
		if (token) fetchUser();
	}, [token]);

	return (
		<div className="h-screen flex flex-col dark:bg-main-bg overflow-hidden">
			<ScrollToTop />
			<Toaster position="top-right" reverseOrder={false} />
			{showLogin && <Login />}
			{!isOwnerPath && <Navbar />}
			<main className={`flex-1 min-h-0 overflow-x-hidden ${!isChatPath && !isOwnerPath ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"}`}>
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
				{!isOwnerPath && !isChatPath && <Footer />}
			</main>
			{showReview && <TestimonialForm />}
			{showEditCar && <EditCarForm />}
		</div>
	);
};

export default App;

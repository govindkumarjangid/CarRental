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
	const isChatPath = location.pathname.startsWith("/chatpage") || location.pathname.startsWith("/chats") || location.pathname.startsWith("/owner/chats");

	useEffect(() => {
		fetchCars();

		// Global scroll tracking for auto-hiding scrollbars
		const handleGlobalScroll = (e) => {
			const target = e.target;
			if (target instanceof HTMLElement) {
				target.setAttribute('data-scrolling', 'true');
				
				// Clear previous timeout for this element
				if (target._scrollTimeout) clearTimeout(target._scrollTimeout);
				
				target._scrollTimeout = setTimeout(() => {
					target.setAttribute('data-scrolling', 'false');
				}, 1000);
			}
		};

		window.addEventListener('scroll', handleGlobalScroll, true);
		return () => window.removeEventListener('scroll', handleGlobalScroll, true);
	}, []);

	useEffect(() => {
		if (token) fetchUser();
	}, [token]);

	return (
		<div className="h-screen flex flex-col dark:bg-main-bg overflow-hidden">
			<ScrollToTop />
			<Toaster position="right-bottom" reverseOrder={true} />
			{showLogin && <Login />}
			{!isOwnerPath && <Navbar />}
			<main className={`flex-1 min-h-0 overflow-x-hidden ${!isChatPath && !isOwnerPath ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"}`}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cars" element={<Cars />} />
					<Route path="/car-details/:id" element={<Cardetails />} />
					<Route path="/chatpage" element={<ChatPage />} />
					<Route path="/chatpage/:id" element={<ChatPage />} />
					<Route path="/my-bookings" element={<Mybookings />} />
					<Route path="/chats/:userId?" element={
						<ProtectRoute>
							<Chats />
						</ProtectRoute>
					} />
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
						<Route path="manage-cars/:carId?" element={
							<ProtectRoute>
								<ManageCars />
							</ProtectRoute>
						} />
						<Route
							path="manage-bookings/:bookingId?"
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
							path="chats/:userId?"
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

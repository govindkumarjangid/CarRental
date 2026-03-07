import { useAuthStore } from "./store/useAuthStore.js";
import { useCarStore } from "./store/useCarStore.js";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation, useEffect } from "./index.js";
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

const App = () => {
	const { showLogin, showReview, token, fetchUser } = useAuthStore();
	const { fetchCars, showEditCar } = useCarStore();
	const isOwnerPath = useLocation().pathname.startsWith("/owner");

	useEffect(() => {
		fetchCars();
	}, []);

	useEffect(() => {
		if (token) {
			fetchUser();
		}
	}, [token]);

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

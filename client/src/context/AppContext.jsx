import Loader from "../components/UI/Loader.jsx";
import CarCard from "../components/car/CarCard.jsx";
import { Title as OwnerTitle } from "../components/owner/Title.jsx";
import { Title as UserTitle } from "../components/UI/Title.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
	useNavigate,
	useParams,
	Link,
	NavLink,
	useLocation,
	Outlet,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import { assets, iconList } from "../assets/assets.jsx";
import { motion, AnimatePresence, useInView } from "motion/react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const currency = import.meta.env.VITE_CURRENCY;

	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showEditCar, setShowEditCar] = useState(false);
	const [editCar, setEditCar] = useState(null);
	const [reviewLoading, setReviewLoading] = useState(false);
	const [ownerDetails, setOwnerDetails] = useState([]);


	//check user login or not
	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/user/data");
			if (data.success) {
				setUser(data.user);
				localStorage.setItem("user", JSON.stringify(data.user));
				setIsOwner(data.user.role === "owner");
			} else {
				navigate("/");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	// fetch all cars
	const fetchCars = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get("/api/user/cars");
			data.success ? setCars(data.cars) : toast.error(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const fetchOwnerDetails = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get('/api/user/owner-details');
			if (data.success) {
				setOwnerDetails(data.owner);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	// logout the user
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
		setIsOwner(false);
		navigate("/");
		(axios.defaults.headers.common["Authorization"] = ""),
			toast.success("Logged out successfully");
	};

	// load razorpay script
	const loadRazorpay = () => {
		return new Promise(resolve => {
			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	};


	//get token from localstorage
	useEffect(() => {
		const token = localStorage.getItem("token");
		setToken(token);
		fetchCars();
	}, []);

	//get user data
	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `${token}`;
			fetchUser();
			fetchOwnerDetails();
		}
	}, [token]);

	const value = {
		ownerDetails,
		setOwnerDetails,
		reviewLoading,
		setReviewLoading,
		loadRazorpay,
		navigate,
		currency,
		axios,
		user,
		setUser,
		token,
		setToken,
		isOwner,
		setIsOwner,
		fetchUser,
		showLogin,
		setShowLogin,
		logout,
		fetchCars,
		cars,
		setCars,
		pickupDate,
		setPickupDate,
		returnDate,
		setReturnDate,
		loading,
		showReview,
		setShowReview,
		setLoading,
		assets,
		useState,
		Loader,
		OwnerTitle,
		UserTitle,
		motion,
		toast,
		useInView,
		useRef,
		useParams,
		CarCard,
		iconList,
		Link,
		NavLink,
		useLocation,
		AnimatePresence,
		useLocation,
		Outlet,
		Routes,
		Route,
		Toaster,
		Navigate,
		useEffect,
		showEditCar,
		setShowEditCar,
		editCar,
		setEditCar
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

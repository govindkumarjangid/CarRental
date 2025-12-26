import Loader from "../components/Loader.jsx";
import CarCard from "../components/CarCard.jsx";
import { Title as OwnerTitle } from "../components/owner/Title.jsx";
import { Title as UserTitle } from "../components/Title.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { motion, useInView } from "motion/react";

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

	//check user login or not

	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/user/data");
			if (data.success) {
				setUser(data.user);
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

	// logout the user

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
		setIsOwner(false);
		navigate("/");
		(axios.defaults.headers.common["Authorization"] = ""),
			toast.success("Logged out successfully");
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
		}
	}, [token]);

	const value = {
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
		setLoading,
		assets,
		useEffect,
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
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

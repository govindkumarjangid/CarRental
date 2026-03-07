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

	const value = {
		navigate,
		currency,
		axios,
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
		Outlet,
		Routes,
		Route,
		Toaster,
		Navigate,
		useEffect
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

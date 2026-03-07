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
import NotFound404 from "./components/UI/NotFound404.jsx";
import EditCarForm from "./components/owner/EditCarForm.jsx";
import ManageBookings from "./pages/owner/ManageBookings.jsx";
import TestimonialForm from "./components/testimonial/TestimonialForm.jsx";
import Hero from "./components/Home/Hero.jsx";
import FeaturedSection from "./components/Home/FeaturedSection.jsx";
import Banner from "./components/Home/Banner.jsx";
import Testmonial from "./components/testimonial/Testmonial.jsx";
import Newsletter from "./components/Home/Newsletter.jsx";
import CarCardSkeleton from './components/car/CarCardSkeleton.jsx';
import CarCard from './components/car/CarCard.jsx';
import { Title } from './components/UI/Title.jsx';
import {iconList} from "./assets/assets.jsx";
import BookingCard from "./components/booking/BookingCard.jsx";
import EmptyBookings from "./components/booking/EmptyBookings.jsx";
import BookingCardSkeleton from "./components/booking/BookingCardSkeleton.jsx";
import  {Title as OwnerTitle } from "./components/owner/Title.jsx";


import { Link, useNavigate, useLocation,useParams,NavLink,Routes, Route } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import ScrollToBottom from "react-scroll-to-bottom";
import { Check, CheckCheck } from "lucide-react";

export {
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
    Hero,
    FeaturedSection,
    Banner,
    Testmonial,
    Newsletter,
    CarCardSkeleton,
    CarCard,
    Title,
    BookingCard,
    EmptyBookings,
    BookingCardSkeleton,
    OwnerTitle,

    Link,
    NavLink,
    useNavigate,
    Routes, Route,
    useLocation,
    motion,
    useInView,
    useState,
    useEffect,
    useRef,
    iconList,
    toast,
    AnimatePresence,
    useParams,
    ScrollToBottom,
    Check, CheckCheck

}
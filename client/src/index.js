import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import ProtectRoute from "./context/ProtectRoute.jsx";
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
import CarsPageSkeleton from "./components/UI/CarsPageSkeleton.jsx";
import HomeSkeleton from "./components/UI/HomeSkeleton.jsx";
import DashboardSkeleton from "./components/UI/DashboardSkeleton.jsx";
import FormSkeleton from "./components/UI/FormSkeleton.jsx";
import TableSkeleton from "./components/UI/TableSkeleton.jsx";
import CarDetailsPageSkeleton from "./components/UI/CarDetailsPageSkeleton.jsx";
import UserTableSkeleton from "./components/UI/UserTableSkeleton.jsx";


import { Link, useNavigate, useLocation,useParams,NavLink,Routes, Route } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import ScrollToBottom from "react-scroll-to-bottom";
import { Check, CheckCheck } from "lucide-react";

import OptimizedImage from "./components/UI/OptimizedImage.jsx";
import ResponsiveImage from "./components/UI/ResponsiveImage.jsx";

export {
    Navbar,
    Footer,
    ProtectRoute,
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
    CarsPageSkeleton,
    HomeSkeleton,
    DashboardSkeleton,
    FormSkeleton,
    TableSkeleton,
    CarDetailsPageSkeleton,
    UserTableSkeleton,

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
    Check, CheckCheck,

    OptimizedImage,
    ResponsiveImage

}

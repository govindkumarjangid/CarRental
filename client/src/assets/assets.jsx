import logo from "./logo.svg";
import main_car from "./main_car.png";
import banner_car_image from "./banner_car_image.png";
import {
	Plus,
	Car,
	Check,
	ClipboardList,
	LayoutPanelLeft,
	SquarePlus,
	EditIcon,
	Eye,
	EyeOff,
	Trash2,
	LoaderPinwheel,
	CloudUpload,
	List,
	TriangleAlert,
	Search,
	Users,
	Fuel,
	MapPin,
	Funnel,
	Calendar,
	CircleCheckBig,
	Moon,
	Sun,
	TextAlignEnd,
	X,
	CircleUser,
	ArrowRight,   
	Star,
	ChevronLeft,
	ChevronRight,
	Instagram,
	Facebook,
	Twitter,
	Mail,
	CalendarX,
	Loader,
	ArrowLeft
} from "lucide-react";

export const cityList = [
	"Jaipur",
	"Udaipur",
	"Kota",
	"Mumbai",
	"Delhi",
	"Gurugram",
];

export const iconList = {
	Plus,
	Check,
	EditIcon,
	Eye,
	EyeOff,
	Trash2,
	LoaderPinwheel,
	CloudUpload,
	TriangleAlert,
	List,
	Search,
	Users,
	Fuel,
	Car,
	MapPin,
	CalendarX,
	Funnel,
	Calendar,
	CircleCheckBig,
	Moon,
	Sun,
	TextAlignEnd,
	X,
	ClipboardList,
	CircleUser,
	ArrowRight,
	Star,
	ChevronLeft,
	ChevronRight,
	Instagram,
	Facebook,
	Twitter,
	Mail,
	Loader,
	ArrowLeft
};

export const assets = {
	logo,
	main_car,
	banner_car_image,
};

export const menuLinks = [
	{ name: "Home", path: "/" },
	{ name: "Cars", path: "/cars" },
	{ name: "My Bookings", path: "/my-bookings" },
];

export const ownerMenuLinks = [
	{ name: "Dashboard", path: "/owner", icon: <LayoutPanelLeft /> },
	{ name: "Add car", path: "/owner/add-car", icon: <SquarePlus /> },
	{ name: "Manage Cars", path: "/owner/manage-cars", icon: <Car /> },
	{
		name: "Manage Bookings",
		path: "/owner/manage-bookings",
		icon: <ClipboardList />,
	},
];

import { Moon, Sun,  } from "lucide-react";
import { Link, useLocation} from "react-router-dom";
import { menuLinks } from "../assets/assets";
import { useThemeContext } from "../context/ThemeContextProvider";
import { AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
	const {
		setShowLogin,
		user,
		logout,
		isOwner,
		axios,
		setIsOwner,
		navigate,
		toast,
		assets,
		useState,
		useRef,
		motion,
		useInView,
	} = useAppContext();

	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { theme, toggleTheme } = useThemeContext();

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const blobVariants = {
		closed: {
			clipPath: "circle(0% at 90% 10%)",
			opacity: 0,
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 30,
			},
		},
		open: {
			clipPath: "circle(140% at 80% 20%)",
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 50,
				damping: 20,
			},
		},
	};

	const changeRole = async () => {
		try {
			const { data } = await axios.post("/api/owner/change-role");
			if (data?.success) {
				setIsOwner(true);
				toast.success(data.message || "Role updated successfully");
			} else {
				toast.error(data?.message || "Something went wrong");
			}
		} catch (error) {
			toast.error(error?.message || "Server error");
		}
	};

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`max-w-8xl m-auto flex items-center justify-between h-auto px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor border-gray-300 relative z-10 dark:bg-main-bg transition-all duration-300 ${
				location.pathname === "/" ? "bg-light" : "bg-white"
			} dark:text-white `}
		>
			<Link to="/">
				<img
					src={assets.logo}
					alt="logo"
					className="h-8 dark:brightness-500 hover:scale-105 transition-all duration-300"
				/>
			</Link>

			<div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className={` max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 dark:bg-main-bg max-sm:p-4 transition-all duration-300 z-50  ${
					location.pathname === "/" ? "bg-light" : "bg-white"
				} ${
					open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
				}`}
			>
				<motion.div
					className="absolute inset-0 -z-10 bg-linear-to-br dark:from-[#133040] dark:to-[#0a1e29] blur-2xl rounded-3xl"
					variants={blobVariants}
					initial="closed"
					animate={open ? "open" : "closed"}
				/>
				{menuLinks.map((menuLink, index) => {
					return (
						<div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={open ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: index * 0.1 }}
						>
							<Link
								to={menuLink.path}
								className="text-gray-600 dark:text-white"
							>
								{menuLink.name}
							</Link>
						</div>
					);
				})}
				<div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor border-gray-300 px-3 rounded-full max-w-56  transition-all duration-400">
					<input
						type="text"
						className="py-1.5 w-full bg-transparent outline-none  placeholder:text-gray-500  dark:placeholder:text-white "
						placeholder="Search cars"
					/>
					<img
						src={assets.search_icon}
						className="dark:brightness-500"
						alt="search icon"
					/>
				</div>
				<div className="flex max-sm:flex-col items-start sm:items-center gap-6">
					<button
						className="cursor-pointer"
						onClick={() => {
							isOwner ? navigate("/owner") : changeRole();
						}}
					>
						{isOwner ? "Dashboard" : "List cars"}
					</button>
					<button
						className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg  dark:border dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-second-bg active:scale-95"
						onClick={() => {
							user ? logout() : setShowLogin(true);
						}}
					>
						{user ? "Logout" : "Login"}
					</button>
				</div>
				<div className="flex items-center gap-5">
					<button
						onClick={toggleTheme}
						className=" px-2 py-2 bg-gray-200 dark:bg-second-bg rounded-lg text-sm"
					>
						{theme === "dark" ? <Sun /> : <Moon />}
					</button>
				</div>
			</div>

			<button
				onClick={() => setOpen(!open)}
				aria-label="Toggle menu"
				aria-expanded={open}
				className="sm:hidden flex items-center justify-center  p-2 rounded-lg cursor-pointer  transition-colors"
			>
				<AnimatePresence mode="sync">
					<motion.img
						key={open ? "close" : "menu"}
						src={open ? assets.close_icon : assets.menu_icon}
						alt="menu"
						className="w-6 h-5 dark:brightness-500 object-contain"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 200,
							duration: 0.3,
						}}
					/>
				</AnimatePresence>
			</button>
		</motion.div>
	);
};

export default Navbar;

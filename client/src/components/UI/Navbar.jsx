import { menuLinks } from "../../assets/assets.jsx";
import { useThemeContext } from "../../context/ThemeContextProvider";
import { useAppContext } from "../../context/AppContext";

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
		useEffect,
		iconList,
		Link,
		useLocation,
	} = useAppContext();

	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { theme, toggleTheme } = useThemeContext();

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

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
			className={`max-w-8xl m-auto flex items-center justify-between h-auto px-4 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor border-gray-300 relative z-10 dark:bg-main-bg transition-all duration-300 ${location.pathname === "/" ? "bg-light" : "bg-white"
				} dark:text-white `}
		>
			{/* logo  */}
			<Link to="/">
				<img
					src={assets.logo}
					alt="logo"
					className="h-8 object-contain cursor-pointer"
					loading="lazy"
				/>
			</Link>

			{/* menu links  */}
			<div
				className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-19.5 max-sm:border-t border-gray-400 right-0  flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 dark:bg-main-bg max-sm:p-4 transition-all duration-300 z-50  ${location.pathname === "/" ? "bg-light" : "bg-white"
					} ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
					}`}
			>
				<motion.div className="absolute inset-0 -z-10 bg-linear-to-br dark:from-[#133040] dark:to-[#0a1e29] blur-2xl rounded-3xl" />
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

				{/* <div className="flex items-center gap-5">
					<button
						onClick={toggleTheme}
						className=" px-2 py-2 bg-gray-200 dark:bg-second-bg rounded-lg text-sm"
					>
						{theme === "dark" ? (
							<iconList.Sun />
						) : (
							<iconList.Moon />
						)}
					</button>
				</div> */}
			</div>

			{/* open & close button  */}
			<button
				onClick={() => setOpen(!open)}
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="sm:hidden flex items-center justify-center p-2 cursor-pointer"
			>
				{open ? (
					<iconList.X size={30} className="text-gray-500" />
				) : (
					<iconList.TextAlignEnd
						size={30}
						className="text-gray-500"
					/>
				)}
			</button>
		</motion.div>
	);
};

export default Navbar;

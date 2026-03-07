import { menuLinks, assets } from "../../assets/assets.jsx";
import { useThemeStore } from "../../store/useThemeStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import {
	Link,
	useNavigate,
	useLocation,
	motion,
	useInView,
	useState,
	useEffect,
	useRef,
	iconList
} from "../../index.js"

const Navbar = () => {

	const { user, isOwner, logout, setShowLogin, changeRole } = useAuthStore();
	const navigate = useNavigate();

	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { theme, toggleTheme } = useThemeStore();

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`max-w-full px-5 md:px-30 py-4 text-gray-600 dark:text-dark-muted border-b border-gray-300 dark:border-dark-border relative z-10 transition-all duration-300 ${location.pathname === "/" ? "bg-light dark:bg-main-bg" : "bg-white dark:bg-second-bg"
				}`}
		>
			<div className="max-w-7xl m-auto flex items-center justify-between h-auto ">
				{/* logo  */}
				<Link to="/">
					<img
						src={assets.logo}
						alt="logo"
						className="h-8 object-contain cursor-pointer dark:brightness-300"
						loading="lazy"
					/>
				</Link>

				{/* menu links  */}
				<div
					className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-19.5 max-sm:border-t border-gray-400 right-0  flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8  max-sm:p-4 transition-all duration-300 z-50  ${location.pathname === "/" ? "bg-light dark:bg-main-bg" : "bg-white dark:bg-second-bg"
						} ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
						}`}
				>
					<motion.div className="absolute inset-0 -z-10 blur-2xl rounded-3xl" />
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
									className="text-gray-600 dark:text-dark-text hover:text-primary dark:hover:text-accent"
								>
									{menuLink.name}
								</Link>
							</div>
						);
					})}

					<div className="flex max-sm:flex-col items-start sm:items-center gap-6">
						<button
							className="cursor-pointer dark:text-dark-text hover:text-primary dark:hover:text-accent"
							onClick={() => {
								isOwner ? navigate("/owner") : changeRole();
							}}
						>
							{isOwner ? "Dashboard" : "List cars"}
						</button>
						<button
							className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg transition-all text-white rounded-md active:scale-95 font-medium"
							onClick={async () => {
								if (user) {
									await logout(navigate);
								} else {
									setShowLogin(true);
								}
							}}
						>
							{user ? "Logout" : "Login"}
						</button>
					</div>

					{/* <div className="flex items-center gap-5">
					<button
						onClick={toggleTheme}
						className="text-sm dark:text-dark-text cursor-pointer transition-all hover:scale-105 active:scale-95"
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
						<iconList.X size={30} className="text-gray-500 dark:text-dark-text" />
					) : (
						<iconList.TextAlignEnd
							size={30}
							className="text-gray-500 dark:text-dark-text"
						/>
					)}
				</button>
			</div>
		</motion.div>
	);
};

export default Navbar;

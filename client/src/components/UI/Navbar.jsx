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
import { AnimatePresence } from 'framer-motion'

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
			initial={{ opacity: 0, y: -10 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={`max-w-full px-4 md:px-8 py-3 md:py-4 text-gray-600 dark:text-dark-muted border-b border-gray-200 dark:border-dark-border sticky top-0 z-50 transition-all duration-300 ${location.pathname === "/" ? "bg-light" : "bg-white"
				}`}
		>
			<div className="max-w-7xl m-auto flex items-center justify-between h-auto ">
				{/* logo  */}
				<Link to="/">
					<img
						src={assets.logo}
						alt="logo"
						className="h-6 md:h-7 object-contain cursor-pointer dark:brightness-300"
						loading="lazy"
					/>
				</Link>

				{/* menu links  */}
				<AnimatePresence>
					{(open || window.innerWidth >= 640) && (
						<motion.div
							initial={window.innerWidth < 640 ? { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 } : {}}
							animate={window.innerWidth < 640 ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : {}}
							exit={window.innerWidth < 640 ? { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 } : {}}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[65px] md:max-sm:top-[61px] max-sm:border-t border-gray-200 dark:border-dark-border right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-6 z-50  sm:bg-transparent bg-light`}
						>
							<motion.div className="absolute inset-0 -z-10 blur-2xl rounded-3xl" />
							{menuLinks.map((menuLink, index) => {
								const isActive = location.pathname === menuLink.path;
								return (
									<motion.div
										key={index}
										initial={open ? { opacity: 0, y: 10 } : {}}
										animate={open ? { opacity: 1, y: 0 } : {}}
										transition={{ delay: index * 0.1 }}
										className="relative"
									>
										<Link
											to={menuLink.path}
											className={`font-medium transition-colors duration-200 ${isActive
												? "text-primary dark:text-accent"
												: "text-gray-600 dark:text-dark-text hover:text-primary dark:hover:text-accent"
												}`}
										>
											{menuLink.name}
										</Link>
										{isActive && (
											<motion.div
												layoutId="activeTab"
												className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary dark:bg-accent rounded-full hidden sm:block"
												transition={{ type: "spring", stiffness: 380, damping: 30 }}
											/>
										)}
									</motion.div>
								);
							})}

							<div className="flex max-sm:flex-col items-start sm:items-center gap-6">
								<button
									className="cursor-pointer dark:text-dark-text hover:text-primary dark:hover:text-accent font-medium"
									onClick={() => {
										isOwner ? navigate("/owner") : changeRole();
									}}
								>
									{isOwner ? "Dashboard" : "List cars"}
								</button>
								<button
									className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg transition-all text-white rounded-md active:scale-95 font-medium shadow-sm"
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
						</motion.div>
					)}
				</AnimatePresence>

				{/* open & close button  */}
				<button
					onClick={() => setOpen(!open)}
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="sm:hidden flex items-center justify-center p-2 cursor-pointer"
				>
					{open ? (
						<iconList.X size={25} className="text-gray-500 dark:text-dark-text" />
					) : (
						<iconList.TextAlignEnd
							size={25}
							className="text-gray-500 dark:text-dark-text"
						/>
					)}
				</button>
			</div>
		</motion.div>
	);
};

export default Navbar;

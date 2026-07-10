import { useAuthStore } from "../../store/useAuthStore.js";
import { assets } from "../../assets/assets.jsx";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";
const NavbarOwner = ({ toggleSidebar, isSidebarOpen }) => {
	const { user } = useAuthStore();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: -10 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-gray-200 sticky top-0 z-60 transition-all"
		>
			<Link to="/">
				<img
					src={assets.logo}
					alt="logo"
					className="h-7 md:h-9"
					loading="lazy"
				/>
			</Link>


			<div className="flex items-center gap-4">
				<p className="hidden md:block text-base font-medium text-gray-700  capitalize ml-2">
					Welcome, {user?.name || "Owner"}
				</p>
				<button
					onClick={toggleSidebar}
					className="md:hidden p-1.5 -mr-1 text-gray-700 rounded-md transition-colors active:scale-95 cursor-pointer"
				>
					{isSidebarOpen ? <iconList.X size={22} /> : <iconList.Menu size={22} strokeWidth={2.5} />}
				</button>
			</div>
		</motion.div>
	);
};

export default NavbarOwner;


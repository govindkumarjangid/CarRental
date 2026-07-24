import { useAuthStore } from "../../store/useAuthStore.js";
import { motion } from "motion/react";
import { iconList } from "../../assets/assets.jsx";
import { Logo } from "../../index.js";

const NavbarOwner = ({ toggleSidebar, isSidebarOpen }) => {
	const { user } = useAuthStore();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
			className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-white md:bg-white/80 md:backdrop-blur-md border-b border-gray-200 sticky top-0 z-60 transition-all">
			<Logo size="sm" />


			<div className="flex items-center gap-4">
				<p className="hidden md:block text-base font-medium text-gray-700  capitalize ml-2">
					Welcome, {user?.name || "Owner"}
				</p>
				<button
					onClick={toggleSidebar}
					className="md:hidden p-1.5 -mr-1 text-gray-700 rounded-xl transition-colors active:scale-95 cursor-pointer">
					{isSidebarOpen ? <iconList.X size={22} /> : <iconList.Menu size={22} strokeWidth={2.5} />}
				</button>
			</div>
		</motion.div>
	);
};

export default NavbarOwner;


import { ownerMenuLinks } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const { user, updateProfileImage } = useAuthStore();
	const location = useLocation();
	const MotionNavLink = motion(NavLink);
	const [image, setImage] = useState(null);

	const handleUpdateImage = async () => {
		const success = await updateProfileImage(image);
		if (success) setImage(null);
	};

	const SidebarContent = () => (
		<div className="flex flex-col h-full w-full items-center">
			{/* Profile Image */}
			<div className="group relative flex justify-center">
				<label htmlFor="image">
					{image || user?.image ? (
						<img
							src={image ? URL.createObjectURL(image) : user?.image}
							alt="owner"
							className="md:h-20 md:w-20 h-20 w-20 rounded-full p-1 mx-auto aspect-square object-cover"
						/>
					) : (
						<iconList.CircleUser className="md:h-20 md:w-20 h-20 w-20 text-gray-400" />
					)}

					<input
						type="file"
						id="image"
						name="image"
						accept="image/*"
						hidden
						onChange={(e) => setImage(e.target.files[0])}
					/>

					<div className="absolute md:h-20 md:w-20 h-20 w-20 top-0 hidden bg-black/20 rounded-full group-hover:flex items-center justify-center cursor-pointer">
						<iconList.EditIcon size={20} className="text-white" />
					</div>
				</label>
			</div>

			{/* Save Button */}
			{image && (
				<button
					onClick={handleUpdateImage}
					className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs disabled:opacity-50 cursor-pointer hover:bg-primary/20 transition-colors"
				>
					Save
					<iconList.CircleCheckBig className="h-3 w-3 ml-1" />
				</button>
			)}

			<p className="mt-4 text-lg capitalize pb-5 w-full px-6 text-center font-bold text-gray-800 ">
				{user?.name}
			</p>

			{/* Menu */}
			<div className="w-full flex-1 overflow-y-auto">
				{ownerMenuLinks.map((link) => {
					const isActive = link.path === location.pathname;
					return (
						<MotionNavLink
							key={link.path}
							to={{ pathname: link.path, scrollTo: (0, 0) }}
							whileTap={{ scale: 0.97 }}
							onClick={() => setIsSidebarOpen(false)}
							className={`relative flex items-center gap-3 rounded-md w-full py-3 pl-6 md:pl-6 first:mt-3 transition-colors cursor-pointer ${isActive
								? "bg-primary/20 text-primary font-semibold dark:bg-accent/15 dark:text-accent"
								: "text-gray-500 hover:bg-gray-100 dark:text-dark-muted dark:hover:bg-surface"
								}`}
						>
							<div className="shrink-0 cursor-pointer">{link.icon}</div>
							<span className="text-[15px] cursor-pointer">{link.name}</span>

							{isActive && (
								<motion.div className="absolute right-0 top-2 h-8 w-1.5 bg-primary rounded-l dark:bg-accent" />
							)}
						</MotionNavLink>
					);
				})}
			</div>

			{/* Redirect Button */}
			<div className="w-full p-4 mt-auto border-t border-gray-100 dark:border-dark-border md:hidden">
				<NavLink to="/" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary hover:bg-primary-dull text-white rounded-md font-medium transition-colors shadow-sm">
					<iconList.ArrowLeft size={18} />
					<span>Back to Home</span>
				</NavLink>
			</div>
		</div>
	);

	return (
		<>
			{/* Mobile Sidebar (Dropdown Style) */}
			<div className="md:hidden absolute inset-0 z-50 pointer-events-none">
				<AnimatePresence>
					{isSidebarOpen && (
						<>
							<motion.div
								initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.5 }}
								animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
								exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.5 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="absolute top-0 left-0 right-0 z-50 bg-white dark:bg-second-bg pt-6 pb-2 border-b border-gray-200 max-h-screen flex flex-col pointer-events-auto"
							>
								<SidebarContent />
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden md:flex relative z-50 h-full flex-col items-center pt-8 w-[240px] bg-white border-r border-gray-200 text-sm overflow-x-hidden dark:bg-second-bg dark:border-dark-border shrink-0">
				<SidebarContent />
			</div>
		</>
	);
};

export default Sidebar;

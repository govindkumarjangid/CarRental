import { ownerMenuLinks } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";

const SidebarContent = ({ user, image, setImage, handleUpdateImage, location, MotionNavLink, setIsSidebarOpen }) => (
	<div className="flex flex-col h-full w-full items-center relative">
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
				className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-2xl text-xs disabled:opacity-50 cursor-pointer hover:bg-primary/20 transition-colors"
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
				const isActive = link.path === "/owner"
					? location.pathname === "/owner"
					: location.pathname.startsWith(link.path);
				return (
					<MotionNavLink
						key={link.path}
						to={{ pathname: link.path, scrollTo: (0, 0) }}
						whileTap={{ scale: 0.97 }}
						onClick={() => setIsSidebarOpen(false)}
						className={`relative flex items-center gap-3 rounded-2xl w-full py-3 pl-6 md:pl-6 first:mt-3 transition-colors cursor-pointer ${isActive
							? "bg-primary/20 text-primary font-semibold  "
							: "text-gray-500 hover:bg-gray-100  "
							}`}
					>
						<div className="shrink-0 cursor-pointer">{link.icon}</div>
						<span className="text-[15px] cursor-pointer">{link.name}</span>

						{isActive && (
							<div
								layoutId="activeTabIndicator"
								className="absolute right-0 top-2 h-8 w-1.5 bg-primary rounded-l-2xl"
							/>
						)}
					</MotionNavLink>
				);
			})}
		</div>

		{/* Redirect Button */}
		<div className="w-full p-4 mt-auto border-t border-gray-100  md:hidden">
			<NavLink to="/" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary hover:bg-primary-dull text-white rounded-2xl font-medium transition-colors shadow-sm">
				<iconList.ArrowLeft size={18} />
				<span>Back to Home</span>
			</NavLink>
		</div>
	</div>
);

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const { user, updateProfileImage } = useAuthStore();
	const location = useLocation();
	const MotionNavLink = motion(NavLink);
	const [image, setImage] = useState(null);

	const handleUpdateImage = async () => {
		const success = await updateProfileImage(image);
		if (success) setImage(null);
	};

	const sidebarProps = {
		user,
		image,
		setImage,
		handleUpdateImage,
		location,
		MotionNavLink,
		setIsSidebarOpen
	};

	return (
		<>
			{/* Mobile Sidebar (Dropdown Style) */}
			<div className="md:hidden fixed inset-0 z-50 pointer-events-none">
				<AnimatePresence>
					{isSidebarOpen && (
						<>
							{/* Backdrop blur overlay */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setIsSidebarOpen(false)}
								className="fixed inset-0 backdrop-blur-xs bg-blue-700/5 pointer-events-auto"
							/>
							<motion.div
								initial={{ scaleY: 0, opacity: 0, y: -600 }}
								animate={{ scaleY: 1, opacity: 1, y: 0 }}
								exit={{ scaleY: 0, opacity: 0, y: -600 }}
								transition={{
									type: "spring",
									stiffness: 350,
									damping: 35,
									mass: 0.8,
									exit: { type: "tween", duration: 0.4, ease: "easeInOut" }
								}}
								className="absolute top-14 right-0 left-0 z-50 bg-white/95 backdrop-blur-xl pt-6 pb-2 border-b border-gray-200 max-h-[calc(100vh-60px)] flex flex-col pointer-events-auto shadow-2xl"
							>
								<SidebarContent {...sidebarProps} />
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>


			{/* Desktop Sidebar */}
			<div className="hidden md:flex relative z-50 h-full flex-col items-center pt-8 w-60 bg-white border-r border-gray-200 text-sm overflow-x-hidden shrink-0">
				<SidebarContent {...sidebarProps} />
			</div>
		</>
	);
};

export default Sidebar;


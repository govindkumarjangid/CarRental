import { ownerMenuLinks } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { iconList } from "../../assets/assets.jsx";
import { LogOut, ArrowLeft, CircleUser, EditIcon, CircleCheckBig } from "lucide-react";

const SidebarContent = ({ user, image, setImage, handleUpdateImage, location, MotionNavLink, setIsSidebarOpen, handleLogout }) => (
	<div className="flex flex-col h-full w-full items-center relative">
		{/* Profile Image */}
		<div className="group relative flex justify-center pt-4">
			<label htmlFor="image" className="cursor-pointer">
				{image || user?.image ? (
					<img
						src={image ? URL.createObjectURL(image) : user?.image}
						alt="owner"
						className="md:h-22 md:w-22 h-18 w-18 rounded-full p-0.5 mx-auto aspect-square object-cover border-2 border-primary/20 group-hover:border-primary transition-all shadow-sm"
					/>
				) : (
					<CircleUser className="md:h-20 md:w-20 h-18 w-18 text-gray-400" />
				)}

				<input
					type="file"
					id="image"
					name="image"
					accept="image/*"
					hidden
					onChange={(e) => setImage(e.target.files[0])}
				/>

				<div className="absolute md:h-22 md:w-22 h-18 w-18 top-4 hidden bg-black/30 rounded-full group-hover:flex items-center justify-center cursor-pointer transition-all">
					<EditIcon size={20} className="text-white" />
				</div>
			</label>
		</div>

		{/* Save Button */}
		{image && (
			<button
				onClick={handleUpdateImage}
				className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-primary-dull transition-colors">
				Save
				<CircleCheckBig className="h-3 w-3 ml-1" />
			</button>
		)}

		<p className="mt-2 text-base capitalize pb-4 w-full px-4 text-center font-bold text-gray-800 border-b border-gray-100">
			{user?.name}
		</p>

		{/* Menu Links */}
		<div className="w-full flex-1 overflow-y-auto no-scrollbar py-2">
			{ownerMenuLinks.map((link) => {
				const isActive = link.path === "/owner"
					? location.pathname === "/owner"
					: location.pathname.startsWith(link.path);
				return (
					<MotionNavLink
						key={link.path}
						to={link.path}
						onClick={() => setIsSidebarOpen(false)}
						className={`relative flex items-center gap-3 rounded-xl w-full py-2.5 pl-5 my-1 transition-all cursor-pointer ${isActive
							? "bg-primary/10 text-primary font-bold shadow-2xs"
							: "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
							}`}>
						<div className="shrink-0 cursor-pointer">{link.icon}</div>
						<span className="text-sm cursor-pointer">{link.name}</span>

						{isActive && (
							<div
								layoutId="activeTabIndicator"
								className="absolute right-0 top-2 h-7 w-1.5 bg-primary rounded-l-xl"
							/>
						)}
					</MotionNavLink>
				);
			})}
		</div>

		{/* Bottom Actions: Back to Home & Log Out */}
		<div className="w-full p-3.5 border-t border-gray-200 bg-slate-50/80 space-y-2 shrink-0">
			<NavLink
				to="/"
				onClick={() => setIsSidebarOpen(false)}
				className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95">
				<ArrowLeft size={16} />
				<span>Back to Home</span>
			</NavLink>

			<button
				type="button"
				onClick={() => {
					setIsSidebarOpen(false);
					handleLogout();
				}}
				className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200/80 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 group">
				<LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
				<span>Log Out</span>
			</button>
		</div>
	</div>
);

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const { user, updateProfileImage, logout } = useAuthStore();
	const location = useLocation();
	const navigate = useNavigate();
	const MotionNavLink = motion(NavLink);
	const [image, setImage] = useState(null);

	const handleUpdateImage = async () => {
		const success = await updateProfileImage(image);
		if (success) setImage(null);
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	const sidebarProps = {
		user,
		image,
		setImage,
		handleUpdateImage,
		location,
		MotionNavLink,
		setIsSidebarOpen,
		handleLogout
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
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								className="absolute top-14 right-0 left-0 z-50 bg-white/95 backdrop-blur-xl pt-2 pb-2 border-b border-gray-200 max-h-[calc(100vh-60px)] flex flex-col pointer-events-auto shadow-2xl">
								<SidebarContent {...sidebarProps} />
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden md:flex relative z-50 h-full flex-col items-center pt-2 w-60 bg-white border-r border-gray-200 text-sm overflow-x-hidden shrink-0">
				<SidebarContent {...sidebarProps} />
			</div>
		</>
	);
};

export default Sidebar;

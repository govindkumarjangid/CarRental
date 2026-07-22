import { menuLinks, assets } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ResponsiveImage } from "../../index.js";
import { LogOut, User, X, TextAlignEnd, CircleUser, EditIcon, Bookmark, ChevronDown } from "lucide-react";
import { UserAvatar, IconButton, iconList } from "../../index.js";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [image, setImage] = useState(null);
	const [open, setOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const { user, isOwner, logout, setShowLogin, updateProfileImage } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 30);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
		setDropdownOpen(false);
		setOpenPopup(false);
	}, [location.pathname]);

	const handleImageUpload = async () => {
		if (image) await updateProfileImage(image);
		setImage(null);
	};

	const handleLogout = async () => {
		await logout(navigate);
		setDropdownOpen(false);
		setOpenPopup(false);
	};

	return (
		<div className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
			? "bg-white/10 backdrop-blur-2xl shadow-md border-b border-white/10 py-3"
			: location.pathname === "/"
				? "bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-xs py-4"
				: "bg-white border-b border-gray-200 py-4"
			}`}>
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
				{/* Logo */}
				<Link to="/" className="flex items-center -ml-1">
					<ResponsiveImage
						src={assets.logo}
						alt="logo"
						width={150}
						height={40}
						className="h-8 md:h-10 object-contain object-left cursor-pointer"
					/>
				</Link>

				{/* Right Side */}
				<div className="flex items-center gap-4 sm:gap-8">
					{/* Menu Links */}
					<div className="hidden sm:flex items-center gap-8 relative z-40">
						{menuLinks
							.filter((link) => !(link.name === "Chat with owner" && isOwner))
							.map((menuLink, index) => {
								const isActive = location.pathname === menuLink.path;
								return (
									<motion.div key={index} className="relative">
										<Link
											to={menuLink.path}
											className={`font-bold text-sm md:text-base transition-colors ${isActive ? "text-primary" : "text-gray-800 hover:text-primary"
												}`}>
											{menuLink.name}
										</Link>
										{isActive && (
											<motion.div
												layoutId="activeTabDesktop"
												className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.2 }}
											/>
										)}
									</motion.div>
								);
							})}

						{isOwner && (
							<button
								className="cursor-pointer text-gray-800 hover:text-primary font-bold text-sm md:text-base transition-colors"
								onClick={() => navigate("/owner")}>
								Dashboard
							</button>
						)}
					</div>

					{/* Action Buttons & User Menu */}
					<div className="flex items-center gap-2 sm:gap-4 relative">
						{!user ? (
							<button
								className="cursor-pointer px-5 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-xl active:scale-98 font-bold shadow-md hover:shadow-primary/20 text-sm sm:text-base gap-2 flex items-center"
								onClick={() => setShowLogin(true)}>
								<User size={20} className="font-bold" />	Login
							</button>
						) : (
							<div className="relative">
								{/* Better Profile Trigger Button */}
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className="flex items-center gap-2.5 p-1.5 px-3 rounded-2xl border border-white/80 bg-white/80 backdrop-blur-md hover:border-primary/40 hover:bg-white transition-all shadow-xs active:scale-98 cursor-pointer">
									<UserAvatar
										src={user.image}
										name={user.name}
										size={34}
										className="aspect-square size-8 rounded-xl ring-2 ring-primary/20"
									/>
									<span className="hidden md:inline font-bold text-sm text-gray-800 max-w-28 truncate">
										{user.name}
									</span>
									<ChevronDown size={16} className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
								</button>

								{/* Dropdown Menu */}
								<AnimatePresence>
									{dropdownOpen && (
										<motion.div
											initial={{ opacity: 0, y: 8, scale: 0.95 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 8, scale: 0.95 }}
											transition={{ duration: 0.15 }}
											className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/80 p-2 z-50 overflow-hidden">

											{/* User Info Header */}
											<div className="px-3 py-2.5 border-b border-gray-100 bg-slate-50/70 rounded-xl mb-1">
												<p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
												<p className="text-[11px] text-gray-500 truncate">{user.email}</p>
											</div>

											{/* Menu Items */}
											<button
												onClick={() => {
													setDropdownOpen(false);
													setOpenPopup(true);
												}}
												className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors cursor-pointer text-left">
												<User size={16} />
												<span>Profile</span>
											</button>

											<button
												onClick={() => {
													setDropdownOpen(false);
													navigate("/my-bookings");
												}}
												className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors cursor-pointer text-left">
												<Bookmark size={16} />
												<span>Bookings</span>
											</button>

											<div className="h-px bg-gray-100 my-1" />

											<button
												onClick={handleLogout}
												className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left">
												<LogOut size={16} />
												<span>Logout</span>
											</button>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)}

						{/* Mobile Toggle Button */}
						<IconButton
							label={open ? "Close Menu" : "Open Menu"}
							icon={open ? X : TextAlignEnd}
							size={22}
							className="sm:hidden text-white hover:bg-primary bg-primary cursor-pointer rounded-xl p-2"
							onClick={() => setOpen(!open)}
						/>
					</div>
				</div>
			</div>

			{/* Mobile */}
			<div className="sm:hidden absolute inset-x-0 top-full -z-10 pointer-events-none">
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
							className="w-full bg-white/95 backdrop-blur-2xl flex flex-col items-center pointer-events-auto shadow-2xl overflow-hidden border-b border-gray-200">
							<div className="w-full flex flex-col items-start gap-4 py-6 px-6">
								{menuLinks
									.filter((link) => !(link.name === "Chat with owner" && isOwner))
									.map((menuLink, index) => {
										const isActive = location.pathname === menuLink.path;
										return (
											<Link
												key={index}
												to={menuLink.path}
												onClick={() => setOpen(false)}
												className={`block font-bold w-full transition-colors text-base py-1 ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"
													}`}>
												{menuLink.name}
											</Link>
										);
									})}

								{isOwner && (
									<button
										className="cursor-pointer hover:text-primary font-bold transition-colors text-base py-1"
										onClick={() => {
											navigate("/owner");
											setOpen(false);
										}}>
										Dashboard
									</button>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* User Profile  */}
			<AnimatePresence>
				{openPopup && user && (
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
						onClick={() => setOpenPopup(false)}>
						<motion.div
							key="popup"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className="relative flex flex-col gap-4 p-6 sm:p-8 bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl cursor-default w-full max-w-md rounded-2xl"
							onClick={(e) => e.stopPropagation()}>
							<IconButton
								label="Close"
								icon={X}
								onClick={() => setOpenPopup(false)}
								className="text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-colors absolute top-4 right-4 p-1 rounded-full"
							/>

							<div className="w-full flex items-center gap-4">
								<label htmlFor="image" className="relative group cursor-pointer shrink-0">
									{image || user?.image ? (
										<UserAvatar
											src={image ? URL.createObjectURL(image) : user?.image}
											name={user?.name}
											size={64}
											className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary transition-all"
										/>
									) : (
										<div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
											<CircleUser size={40} className="text-gray-400" />
										</div>
									)}
									<input type="file" id="image" name="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
									<div className="absolute inset-0 hidden bg-black/40 rounded-2xl group-hover:flex items-center justify-center transition-all">
										<EditIcon size={20} className="text-white" />
									</div>
								</label>
								<div className="flex flex-col overflow-hidden">
									<span className="text-lg font-bold text-gray-900 truncate">{user?.name}</span>
									<p className="text-xs text-gray-500 truncate">{user?.email}</p>
									<div className="mt-2">
										<span className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary rounded-lg font-bold uppercase tracking-wider">
											{isOwner ? "Owner" : "Customer"}
										</span>
									</div>
								</div>
							</div>

							<div className="w-full h-px bg-gray-100 my-2" />

							<button
								onClick={handleLogout}
								className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dull rounded-xl text-sm cursor-pointer text-white font-bold transition-all shadow-md active:scale-98">
								<LogOut size={18} />
								Logout Account
							</button>

							{image && (
								<button
									onClick={handleImageUpload}
									className="flex items-center justify-center gap-1 text-xs font-bold shadow-lg transition-all bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 absolute -top-3 right-0 rounded-xl cursor-pointer active:scale-95">
									<iconList.CircleCheckBig size={14} />
									Save Avatar
								</button>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Navbar;
import { menuLinks, assets } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ResponsiveImage } from "../../index.js";
import { LogOut, User, X, TextAlignEnd, CircleUser, EditIcon, Bookmark, ChevronDown, ChevronRight, LayoutDashboard } from "lucide-react";
import { UserAvatar, IconButton, iconList } from "../../index.js";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [image, setImage] = useState(null);
	const [open, setOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const { user, isOwner, logout, setShowLogin, updateProfileImage } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

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
			? "bg-white/80 backdrop-blur-2xl shadow-md border-b border-white/20 py-3"
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
							<div className="relative" ref={dropdownRef}>
								{/* Premium Profile Trigger Button */}
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className="flex items-center gap-2.5 p-1.5 pl-2 pr-3.5 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-xl hover:border-primary/50 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group active:scale-95">
									<div className="relative shrink-0">
										<UserAvatar
											src={user.image}
											name={user.name}
											size={36}
											className="size-8.5 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all object-cover"
										/>
										<span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white shadow-xs" />
									</div>
									<span className="hidden md:inline font-bold text-sm text-slate-800 max-w-32 truncate">
										{user.name}
									</span>
									<ChevronDown size={16} className={`text-slate-400 group-hover:text-primary transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-primary" : ""}`} />
								</button>

								{/* Premium Redesigned Dropdown Menu */}
								<AnimatePresence>
									{dropdownOpen && (
										<motion.div
											initial={{ opacity: 0, y: 10, scale: 0.96 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 8, scale: 0.96 }}
											transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
											className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-slate-100 p-2.5 z-50 overflow-hidden">

											{/* Dark Luxury User Info Card Header */}
											<div className="relative flex items-center gap-3 p-3 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl mb-2 shadow-md overflow-hidden">
												<div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/40 rounded-full blur-xl pointer-events-none" />
												<UserAvatar
													src={user.image}
													name={user.name}
													size={44}
													className="size-11 rounded-full shrink-0 ring-2 ring-white/30 shadow-md object-cover"
												/>
												<div className="min-w-0 flex-1 z-10">
													<div className="flex items-center justify-between gap-1 mb-0.5">
														<p className="text-xs font-bold text-white truncate max-w-[130px]">{user.name}</p>
														<span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider backdrop-blur-md ${isOwner ? "bg-amber-400/25 text-amber-300 border border-amber-400/30" : "bg-indigo-400/25 text-indigo-200 border border-indigo-400/30"}`}>
															{isOwner ? "Owner" : "Renter"}
														</span>
													</div>
													<p className="text-[11px] font-medium text-slate-300/80 truncate max-w-[160px]">{user.email}</p>
												</div>
											</div>

											{/* Action Menu Items with Icons & Subtitles */}
											<div className="space-y-1">
												<button
													onClick={() => {
														setDropdownOpen(false);
														setOpenPopup(true);
													}}
													className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer group text-left">
													<div className="flex items-center gap-3">
														<div className="p-2.5 rounded-full bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white transition-all shadow-xs shrink-0">
															<User size={16} />
														</div>
														<div>
															<p className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">My Profile</p>
															<p className="text-[10px] text-slate-400 font-medium">Manage account & avatar</p>
														</div>
													</div>
													<ChevronRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
												</button>

												<button
													onClick={() => {
														setDropdownOpen(false);
														navigate("/my-bookings");
													}}
													className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer group text-left">
													<div className="flex items-center gap-3">
														<div className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs shrink-0">
															<Bookmark size={16} />
														</div>
														<div>
															<p className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">My Bookings</p>
															<p className="text-[10px] text-slate-400 font-medium">View active & past rentals</p>
														</div>
													</div>
													<ChevronRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
												</button>

												{isOwner && (
													<button
														onClick={() => {
															setDropdownOpen(false);
															navigate("/owner");
														}}
														className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/60 transition-all duration-200 cursor-pointer group text-left">
														<div className="flex items-center gap-3">
															<div className="p-2.5 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs shrink-0">
																<LayoutDashboard size={16} />
															</div>
															<div>
																<p className="text-xs font-bold text-amber-900 group-hover:text-amber-700 transition-colors">Owner Dashboard</p>
																<p className="text-[10px] text-amber-600/70 font-medium">Manage cars & earnings</p>
															</div>
														</div>
														<ChevronRight size={14} className="text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
													</button>
												)}
											</div>

											<div className="h-px bg-slate-100 my-1.5" />

											<button
												onClick={handleLogout}
												className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50/70 transition-all duration-200 cursor-pointer group text-left">
												<div className="flex items-center gap-3">
													<div className="p-2.5 rounded-full bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xs shrink-0">
														<LogOut size={16} />
													</div>
													<div>
														<p className="text-xs font-bold text-rose-600 group-hover:text-rose-700 transition-colors">Log Out</p>
														<p className="text-[10px] text-rose-400 font-medium">End session safely</p>
													</div>
												</div>
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

			{/* Mobile Menu */}
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

			{/* User Profile Modal */}
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
											className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary transition-all object-cover rounded-full"
										/>
									) : (
										<div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
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
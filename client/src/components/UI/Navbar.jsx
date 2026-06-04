import { menuLinks, assets } from "../../assets/assets.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { iconList, ResponsiveImage } from "../../index.js"
import { AnimatePresence } from 'framer-motion'
import { LogOut, User, X, TextAlignEnd, CircleUser, EditIcon, CircleCheckBig } from "lucide-react";
import { UserAvatar, IconButton } from "../../index.js";

const Navbar = () => {

	const [openPopup, setOpenPopup] = useState(false);
	const [image, setImage] = useState(null);
	const [open, setOpen] = useState(false);

	const { user, isOwner, logout, setShowLogin, updateProfileImage } = useAuthStore();
	const navigate = useNavigate();
	// console.log(user)

	const location = useLocation();

	useEffect(() => {
		setOpen(false);
		setOpenPopup(false);
	}, [location.pathname]);


	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const handleImageUpload = async () => {
		if (image) await updateProfileImage(image);
		setImage(null);
	}

	const handleLogout = async () => {
		await logout(navigate);
		setOpenPopup(false);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeIn" }}
			className={`max-w-full px-4 md:px-8 py-3 md:py-4 text-gray-600  border-b border-gray-200  sticky top-0 z-50 transition-all duration-300 ${location.pathname === "/" ? "bg-light" : "bg-white"
				}`}
		>
			<div className="max-w-7xl m-auto flex items-center justify-between h-auto ">
				{/* logo  */}
				<Link to="/">
					<ResponsiveImage
						src={assets.logo}
						alt="logo"
						width={150}
						height={40}
						className="h-8 md:h-10 object-contain cursor-pointer"
					/>
				</Link>

				{/* Right Side: Links & Actions */}
				<div className="flex items-center gap-4 sm:gap-8">
					{/* Desktop menu links  */}
					<div className="hidden sm:flex items-center gap-8 relative z-40">
						{menuLinks.filter(link => !(link.name === "Chat with owner" && isOwner)).map((menuLink, index) => {
							const isActive = location.pathname === menuLink.path;
							return (
								<motion.div
									key={index}
									className="relative"
								>
									<Link
										to={menuLink.path}
										className={`font-medium transition-colors duration-200 ${isActive
											? "text-primary "
											: "text-gray-600  hover:text-primary "
											}`}
									>
										{menuLink.name}
									</Link>
									{isActive && (
										<motion.div
											layoutId="activeTabDesktop"
											className="absolute bottom-0.2 left-0 right-0 h-0.5 bg-primary  rounded-full"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ type: "spring", stiffness: 300, damping: 20 }}
										/>
									)}
								</motion.div>
							);
						})}

						{isOwner && (
							<div className="flex items-center gap-6">
								<button
									className="cursor-pointer  hover:text-primary  font-medium transition-colors"
									onClick={() => navigate("/owner")}
								>
									Dashboard
								</button>
							</div>
						)}
					</div>

					{/* Action Buttons & User Popup Trigger */}
					<div className="flex items-center gap-2 sm:gap-4">
						{!user ? (
							<button
								className="cursor-pointer px-4 sm:px-8 py-1.5 sm:py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-2xl active:scale-98 font-medium shadow-sm text-sm sm:text-base"
								onClick={() => setShowLogin(true)}
							>
								Login
							</button>
						) : (
							user?.image ? (
								<button
									className="rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all active:scale-95"
									onClick={() => {
										setOpenPopup(!openPopup);
										setOpen(false);
									}}
								>
									<UserAvatar
										src={user.image}
										name={user.name}
										size={42}
										className="cursor-pointer aspect-square size-10"
									/>
								</button>

							) : (
								<IconButton
									label="User Profile"
									icon={User}
									size={26}
									className="text-primary bg-primary/10 p-1.5 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
									onClick={() => {
										setOpenPopup(!openPopup);
										setOpen(false);
									}}
								/>
							)
						)}

						{/* Mobile toggle button  */}
						<IconButton
							label={open ? "Close Menu" : "Open Menu"}
							icon={open ? X : TextAlignEnd}
							size={22}
							className="sm:hidden text-white hover:bg-primary bg-primary cursor-pointer"
							onClick={() => setOpen(!open)}
						/>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className="sm:hidden absolute inset-x-0 top-full -z-10 pointer-events-none">
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "100vh", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								type: "spring",
								stiffness: 350,
								damping: 35,
								mass: 0.8,
								exit: { type: "tween", duration: 0.3, ease: "easeInOut" }
							}}
							className="w-full bg-light flex flex-col items-center pointer-events-auto shadow-2xl overflow-hidden"
						>
							<div className="w-full flex flex-col items-center gap-8 pt-10 pb-6 px-6">
								{menuLinks.filter(link => !(link.name === "Chat with owner" && isOwner)).map((menuLink, index) => {
									const isActive = location.pathname === menuLink.path;
									return (
										<motion.div
											key={index}
											className="relative w-full text-left"
										>
											<Link
												to={menuLink.path}
												onClick={() => setOpen(false)}
												className={`block font-medium w-full transition-colors duration-200 text-base ${isActive
													? "text-primary "
													: "text-gray-600 hover:text-primary "
													}`}
											>
												{menuLink.name}
											</Link>
										</motion.div>
									);
								})}

								{isOwner && (
									<button
										className="cursor-pointer hover:text-primary font-medium transition-colors text-lg text-left"
										onClick={() => {
											navigate("/owner");
											setOpen(false);
										}}
									>
										Dashboard
									</button>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* User Profile Popup */}
			<AnimatePresence>
				{openPopup && user && (
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-100 flex items-center justify-center bg-primary/5 backdrop-blur-sm p-4"
						onClick={() => setOpenPopup(false)}
					>
						<motion.div
							key="popup"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="relative flex flex-col gap-4 p-6 sm:p-8 bg-white border border-gray-200 shadow-sm cursor-default w-full max-w-105 rounded-3xl"
							onClick={(e) => e.stopPropagation()}
						>
							<IconButton
								label="Close"
								icon={X}
								onClick={() => setOpenPopup(false)}
								className="text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-colors absolute top-3 right-3"
							/>


							<div className="w-full flex items-center gap-4">
								<label htmlFor="image" className="relative group cursor-pointer shrink-0">
									{image || user?.image ? (
										<UserAvatar
											src={image ? URL.createObjectURL(image) : user?.image}
											name={user?.name}
											size={64}
											className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary/40 transition-all"
										/>
									) : (
										<div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
											<CircleUser size={40} className="text-gray-400" />
										</div>
									)}
									<input type="file" id="image" name="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
									<div className="absolute inset-0 hidden bg-black/40 rounded-full group-hover:flex items-center justify-center transition-all">
										<EditIcon size={20} className="text-white" />
									</div>
								</label>
								<div className="flex flex-col overflow-hidden">
									<span className="text-base font-bold text-gray-800  truncate">{user?.name}</span>
									<p className="text-xs text-gray-500  truncate">{user?.email}</p>
									<div className="flex flex-col mt-1.5 gap-0.5">
										<p className="text-[10px] text-gray-400 truncate">ID: {user?._id || user?.id || 'N/A'}</p>
										<p className="text-[10px] text-gray-400 truncate">Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
										<p className="text-[10px] text-gray-400 truncate">Last Login: {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}</p>
									</div>
									<div className="mt-2.5">
										<span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary   rounded-full font-bold uppercase tracking-wider">
											{isOwner ? 'Owner' : 'Customer'}
										</span>
									</div>
								</div>
							</div>

							<div className="w-full h-px bg-gray-100 " />

							<button
								onClick={handleLogout}
								className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dull rounded-2xl text-sm cursor-pointer text-white active:scale-[0.98] font-bold transition-all shadow-md group">
								<LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
								Logout Account
							</button>

							{image && (
								<button
									onClick={handleImageUpload}
									className="flex items-center justify-center gap-1 text-xs font-bold shadow-lg transition-all bg-green-500 text-white hover:bg-green-600 px-4 py-2 absolute -top-3 right-0 rounded-full cursor-pointer active:scale-95"
								>
									<iconList.CircleCheckBig size={14} />
									Save Avatar
								</button>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

		</motion.div >
	);
};

export default Navbar;


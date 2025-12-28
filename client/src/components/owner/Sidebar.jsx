import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets.js";
import { NavLink, useLocation } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";
import { useRef } from "react";

const Sidebar = () => {
	const { user, axios, fetchUser } = useAppContext();
	const location = useLocation();
	const MotionNavLink = motion(NavLink);
	const [image, setImage] = useState(null);

	const updateImage = async () => {
		try {
			const formData = new FormData();
			formData.append("image", image);

			const { data } = await axios.post(
				"/api/owner/update-image",
				formData
			);
			if (data.success) {
				fetchUser();
				toast.success(data.message);
				setImage("");
			} else {
				toast.error(data.message || "Failed to update image");
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Server error");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -400 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-15 md:max-w-50 w-full border-r border-gray-500 text-sm overflow-x-hidden"
		>
			{/* Profile Image */}
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
				className="group relative flex justify-center"
			>
				<label htmlFor="image">
					{image || user?.image ? (
						<img
							src={
								image ? URL.createObjectURL(image) : user?.image
							}
							alt="owner"
							className="md:h-20 md:w-20 h-12 w-12 rounded-full p-1 mx-auto aspect-square object-cover"
						/>
					) : (
						<CircleUser className="md:h-20 md:w-20 h-12 w-12 text-gray-400" />
					)}

					<input
						type="file"
						id="image"
						name="image"
						accept="image/*"
						hidden
						onChange={(e) => setImage(e.target.files[0])}
					/>

					<div className="absolute md:h-20 md:w-20 h-12 w-12 top-0  hidden bg-black/20 rounded-full group-hover:flex items-center justify-center cursor-pointer">
						<img src={assets.edit_icon} alt="edit" />
					</div>
				</label>
			</motion.div>

			{/* Save Button */}
			{image && (
				<button
					onClick={updateImage}
					className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs disabled:opacity-50 cursor-pointer hover:bg-primary/20 transition-colors"
				>
					Save
					<img src={assets.check_icon} alt="check" width={13} />
				</button>
			)}

			<p className="mt-2 text-base max-md:hidden capitalize">
				{user?.name}
			</p>

			{/* Menu */}
			<motion.div initial="hidden" animate="show" className="w-full">
				{ownerMenuLinks.map((link) => {
					const isActive = link.path === location.pathname;

					return (
						<MotionNavLink
							key={link.path}
							to={link.path}
							whileTap={{ scale: 0.97 }}
							className={`relative flex items-center gap-3 w-full py-3 pl-5 md:pl-4 first:mt-6 rounded-lg transition-colors ${
								isActive
									? "bg-primary/20 text-primary font-medium"
									: "text-gray-500 hover:bg-gray-100"
							}`}
						>
							<img
								src={isActive ? link.coloredIcon : link.icon}
								alt="icon"
								className="w-5 h-5"
							/>
							<span className="max-md:hidden">{link.name}</span>

							{isActive && (
								<motion.div
									layoutId="active-indicator"
									className="absolute right-0 top-2 h-8 w-1.5 bg-primary rounded-l"
								/>
							)}
						</MotionNavLink>
					);
				})}
			</motion.div>
		</motion.div>
	);
};

export default Sidebar;

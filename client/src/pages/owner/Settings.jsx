import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import {
	User,
	Mail,
	Lock,
	ShieldCheck,
	ArrowLeft,
	LogOut,
	Camera,
	Save,
	Loader,
	CheckCircle2,
	Calendar,
	KeyRound,
	Sparkles,
} from "lucide-react";

const Settings = () => {
	const navigate = useNavigate();
	const { user, updateProfileDetails, updateProfileImage, logout } = useAuthStore();

	const [name, setName] = useState(user?.name || "");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(user?.image || "");
	const [savingProfile, setSavingProfile] = useState(false);
	const [uploadingImage, setUploadingImage] = useState(false);

	useEffect(() => {
		if (user) {
			setName(user.name || "");
			setPreviewUrl(user.image || "");
		}
	}, [user]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleUploadImage = async () => {
		if (!imageFile) return;
		setUploadingImage(true);
		const success = await updateProfileImage(imageFile);
		setUploadingImage(false);
		if (success) {
			setImageFile(null);
		}
	};

	const handleSaveProfile = async (e) => {
		e.preventDefault();

		if (newPassword) {
			if (!oldPassword) {
				toast.error("Please enter your current password to set a new password!");
				return;
			}
			if (newPassword !== confirmPassword) {
				toast.error("New password and Confirm password do not match!");
				return;
			}
			if (newPassword.length < 6) {
				toast.error("New password must be at least 6 characters long!");
				return;
			}
		}

		setSavingProfile(true);
		const success = await updateProfileDetails({
			name: name.trim(),
			oldPassword: oldPassword ? oldPassword : undefined,
			newPassword: newPassword ? newPassword : undefined,
		});
		setSavingProfile(false);

		if (success) {
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		}
	};

	const handleLogoutConfirm = async () => {
		if (window.confirm("Are you sure you want to log out?")) {
			await logout(navigate);
		}
	};

	const formatDate = (dateStr) => {
		if (!dateStr) return "N/A";
		return new Date(dateStr).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="px-4 py-10 md:px-10 flex-1 w-full max-w-5xl mx-auto space-y-8">
			{/* Page Header */}
			<div>
				<OwnerTitle
					title="Profile & Account Settings"
					subTitle="View and update your personal details, profile picture, password, and system preferences."
				/>
			</div>

			{/* Main Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

				{/* Left Column: Avatar & Overview Card */}
				<div className="lg:col-span-4 flex flex-col gap-6">

					{/* Profile Avatar Box */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md flex flex-col items-center text-center relative overflow-hidden">

						<div className="w-full h-24 bg-linear-to-r from-primary/20 via-blue-500/20 to-indigo-500/20 absolute top-0 left-0 right-0 pointer-events-none" />

						<div className="relative mt-4 group">
							<div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-primary/10 flex items-center justify-center text-primary text-3xl font-black relative">
								{previewUrl ? (
									<img src={previewUrl} alt={user?.name} className="w-full h-full object-cover" />
								) : (
									user?.name?.charAt(0)?.toUpperCase() || "O"
								)}
							</div>

							<label
								htmlFor="profile-image-input"
								className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-primary-dull transition-all cursor-pointer hover:scale-110 active:scale-95">
								<Camera size={16} />
								<input
									type="file"
									id="profile-image-input"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
								/>
							</label>
						</div>

						{imageFile && (
							<button
								onClick={handleUploadImage}
								disabled={uploadingImage}
								className="mt-4 px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-primary-dull transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60">
								{uploadingImage ? (
									<>
										<Loader size={14} className="animate-spin" />
										<span>Uploading...</span>
									</>
								) : (
									<>
										<Save size={14} />
										<span>Save Photo</span>
									</>
								)}
							</button>
						)}

						<h3 className="mt-4 text-xl font-extrabold text-gray-900 capitalize">{user?.name}</h3>
						<p className="text-xs font-semibold text-gray-500 mt-0.5">{user?.email}</p>

						<div className="mt-4 flex items-center gap-2">
							<span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-extrabold capitalize">
								👑 {user?.role || "Owner"}
							</span>
							<span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold flex items-center gap-1">
								<CheckCircle2 size={12} /> Active
							</span>
						</div>

						<div className="w-full border-t border-gray-100 my-5" />

						<div className="w-full space-y-3 text-left text-xs font-semibold text-gray-600">
							<div className="flex items-center justify-between">
								<span className="flex items-center gap-2 text-gray-500">
									<Calendar size={14} className="text-primary" /> Joined Date
								</span>
								<span className="font-bold text-gray-800">{formatDate(user?.createdAt)}</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="flex items-center gap-2 text-gray-500">
									<ShieldCheck size={14} className="text-emerald-600" /> Account Security
								</span>
								<span className="text-emerald-600 font-extrabold">Verified</span>
							</div>
						</div>
					</motion.div>

					{/* Navigation Hints */}
					<div className="bg-linear-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-100 p-5 shadow-xs text-xs space-y-2">
						<h4 className="font-extrabold text-gray-900 flex items-center gap-2 text-sm">
							<Sparkles size={16} className="text-amber-500" /> Quick Navigation
						</h4>
						<p className="text-gray-600 font-medium leading-relaxed">
							Need to return to main site or switch pages? Use the quick actions at bottom or left sidebar.
						</p>
					</div>
				</div>

				{/* Right Column: Update Profile Form */}
				<div className="lg:col-span-8 flex flex-col gap-6">

					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.1 }}
						className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-md">

						<form onSubmit={handleSaveProfile} className="space-y-6">

							{/* Personal Details Header */}
							<div className="border-b border-gray-100 pb-4">
								<h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
									<User className="text-primary" size={18} /> Personal Details
								</h3>
								<p className="text-xs text-gray-500 font-medium mt-1">
									Update your full name and display information.
								</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								{/* Full Name */}
								<div className="flex flex-col gap-1.5">
									<label htmlFor="name-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
										Full Name *
									</label>
									<div className="relative">
										<User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
										<input
											id="name-input"
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
											className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:bg-white transition-all"
											placeholder="Your Name"
										/>
									</div>
								</div>

								{/* Email (Read Only) */}
								<div className="flex flex-col gap-1.5">
									<label htmlFor="email-input" className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
										Email Address (Read-only)
									</label>
									<div className="relative">
										<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
										<input
											id="email-input"
											type="email"
											value={user?.email || ""}
											disabled
											className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 cursor-not-allowed outline-none"
										/>
									</div>
								</div>
							</div>

							{/* Security Section Header */}
							<div className="border-b border-gray-100 pt-4 pb-4">
								<h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
									<KeyRound className="text-amber-500" size={18} /> Password & Security
								</h3>
								<p className="text-xs text-gray-500 font-medium mt-1">
									Leave blank if you do not wish to change your password.
								</p>
							</div>

							<div className="space-y-4">
								{/* Current Password */}
								<div className="flex flex-col gap-1.5">
									<label htmlFor="old-pass" className="text-xs font-bold text-gray-700">
										Current Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
										<input
											id="old-pass"
											type="password"
											value={oldPassword}
											onChange={(e) => setOldPassword(e.target.value)}
											placeholder="••••••••"
											className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:bg-white transition-all"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{/* New Password */}
									<div className="flex flex-col gap-1.5">
										<label htmlFor="new-pass" className="text-xs font-bold text-gray-700">
											New Password
										</label>
										<div className="relative">
											<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
											<input
												id="new-pass"
												type="password"
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												placeholder="••••••••"
												className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:bg-white transition-all"
											/>
										</div>
									</div>

									{/* Confirm New Password */}
									<div className="flex flex-col gap-1.5">
										<label htmlFor="confirm-pass" className="text-xs font-bold text-gray-700">
											Confirm New Password
										</label>
										<div className="relative">
											<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
											<input
												id="confirm-pass"
												type="password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												placeholder="••••••••"
												className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:border-primary focus:bg-white transition-all"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Bottom Action Bar: Back to Home, Logout & Save Buttons */}
							<div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
								<div className="flex items-center gap-3">
									<Link
										to="/"
										className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs active:scale-95">
										<ArrowLeft size={16} />
										<span>Back to Home</span>
									</Link>

									<button
										type="button"
										onClick={handleLogoutConfirm}
										className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer active:scale-95">
										<LogOut size={16} />
										<span>Logout</span>
									</button>
								</div>

								<button
									type="submit"
									disabled={savingProfile}
									className="w-full sm:w-auto px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-dull transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95">
									{savingProfile ? (
										<>
											<Loader size={18} className="animate-spin" />
											<span>Saving Changes...</span>
										</>
									) : (
										<>
											<Save size={18} />
											<span>Save Profile Changes</span>
										</>
									)}
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Settings;

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from "react-hot-toast";

import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { IconButton, iconList } from "../../index.js";
import InputBox from '../owner/InputBox.jsx';

const TestimonialForm = () => {

	const { showReview, setShowReview, addReview } = useAuthStore();
	const [form, setForm] = useState({
		name: "",
		email: "",
		location: "",
		rating: "",
		review: "",
	});
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("name", form.name);
			formData.append("email", form.email);
			formData.append("location", form.location);
			formData.append("rating", form.rating);
			formData.append("review", form.review);
			formData.append("image", image);

			await addReview(formData);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<motion.div
				key="backdrop"
				initial={{ opacity: 0, }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, filter: "blur(5px)", scale: 0.95 }}
				transition={{ duration: 0.3 }}
				onClick={() => setShowReview(false)}
				className="fixed inset-0 z-100 backdrop-blur-xs flex items-center justify-center bg-blue-700/5 p-4"
			>
				<motion.form
					onSubmit={handleSubmit}
					onClick={(e) => e.stopPropagation()}
					initial={{ opacity: 0, filter: "blur(5px)", scale: 0.95 }}
					animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
					exit={{ opacity: 0, filter: "blur(5px)", scale: 0.95 }}
					transition={{
						delay: 0.1,
						duration: 0.3,
						ease: "easeOut"
					}}
					key="testimonial-form"
					className="bg-white rounded-3xl w-full h-fit max-w-2xl md:max-h-[90vh] overflow-y-auto shadow-sm relative p-4 md:p-6"
				>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold"
						>
							Add Your Review
						</h2>

						<IconButton
							label="Close"
							icon={X}
							onClick={() => setShowReview(false)}
							className="text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-colors"
						/>
					</div>

					{/* photo */}
					<div
						className="flex gap-4 items-center w-full mb-6"
					>
						<label htmlFor="car-image">
							{image ? (
								<img
									src={URL.createObjectURL(image)}
									alt="car preview"
									className="h-12 w-20 object-cover rounded-2xl"
								/>
							) : (
								<iconList.CloudUpload className="h-14 text-primary bg-gray-100 px-4 py-3 rounded-2xl cursor-pointer w-26 border border-gray-200" />
							)}

							<input
								type="file"
								id="car-image"
								name="car-image"
								accept="image/*"
								hidden
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</label>
						<p className="text-sm">Upload your image</p>
					</div>

					{/* name & email  */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<InputBox
							label="name"
							title="Name"
							value={form.name}
							onChange={handleChange}
							placeholder="Full Name"
						/>
						<InputBox
							label="email"
							title="Email"
							type="email"
							value={form.email}
							onChange={handleChange}
							placeholder="Email Address"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<InputBox
							label="location"
							title="Location"
							value={form.location}
							onChange={handleChange}
							placeholder="City, Country"
						/>
						<InputBox
							label="rating"
							title="Rating"
							as="select"
							value={form.rating}
							onChange={handleChange}
							placeholder="Select rating"
							options={[
								{ value: "1", label: "⭐ 1" },
								{ value: "2", label: "⭐ 2" },
								{ value: "3", label: "⭐ 3" },
								{ value: "4", label: "⭐ 4" },
								{ value: "5", label: "⭐ 5" },
							]}
						/>
					</div>

					<InputBox
						label="review"
						title="Review"
						as="textarea"
						value={form.review}
						onChange={handleChange}
						rows={4}
						placeholder="Write your experience..."
					/>

					<button
						type="submit"
						className="flex items-center justify-center gap-2 sm:px-6 sm:py-2.5 py-2 px-4 bg-primary text-white rounded-2xl w-max mt-4 mb-2 hover:bg-primary/90 active:scale-95 transition cursor-pointer md:text-base text-sm font-medium"
						disabled={loading}
					>
						{loading ? (
							<>
								<iconList.Loader
									size={10}
									className="h-5 w-5 animate-spin text-white"
								/>{" "}
								Submitting...
							</>
						) : (
							<>Submit Review</>
						)}
					</button>
				</motion.form>
			</motion.div>
		</>

	)
};

export default TestimonialForm;


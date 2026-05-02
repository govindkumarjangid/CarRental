import { useAuthStore } from "../../store/useAuthStore.js";
import { motion, iconList, useState, toast, useEffect } from "../../index.js";
import { AnimatePresence } from 'framer-motion'
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
		if (!image) return toast.error("Please upload an image");
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
		<AnimatePresence>
			{showReview && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setShowReview(false)}
					className="fixed inset-0 z-100 flex items-center justify-center md:p-4 backdrop-blur-sm"
				>
					<motion.form
						onSubmit={(e) => handleSubmit(e)}
						onClick={(e) => e.stopPropagation()}
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 25
						}}
						className="bg-white dark:bg-main-bg md:rounded-md w-full h-full md:h-fit max-w-2xl md:max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8"
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-semibold dark:text-white"
							>
								Add Testimonial
							</h2>
							<button
								type="button"
								onClick={() => setShowReview(false)}
								className="bg-gray-100 dark:bg-surface p-1 h-8 w-8 rounded-md text-gray-600 dark:text-dark-muted hover:text-gray-700 cursor-pointer active:scale-95 transition-transform duration-200"
							>
								<iconList.X size={25} />
							</button>
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
										className="h-12 w-20 object-cover rounded-md"
									/>
								) : (
									<iconList.CloudUpload className="h-14 text-primary bg-gray-100 dark:bg-surface px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-200 dark:border-dark-border" />
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
							<p className="text-sm dark:text-dark-muted">Upload your image</p>
						</div>

						{/* name & email  */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
							className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md w-max mt-4 mb-2 hover:bg-primary/90 active:scale-95 transition cursor-pointer"
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
			)}
		</AnimatePresence>
	);
};

export default TestimonialForm;

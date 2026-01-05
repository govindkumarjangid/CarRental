import { useAppContext } from "../../context/AppContext";

const TestimonialForm = () => {
	const { toast, useState, motion, iconList, axios, setShowReview } =
		useAppContext();
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
			if (!image) return toast.error("Please upload an image");
			const formData = new FormData();
			formData.append("name", form.name);
			formData.append("email", form.email);
			formData.append("location", form.location);
			formData.append("rating", form.rating);
			formData.append("review", form.review);
			formData.append("image", image);

			const { data } = await axios.post("/api/user/add-review", formData);
			if (data.success) {
				toast.success(data.message);
				setShowReview(false);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			onClick={() => setShowReview(false)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
		>
			<form
				onSubmit={(e) => handleSubmit(e)}
				onClick={(e) => e.stopPropagation()}
				className="w-full h-full md:h-fit md:max-w-2xl md:mx-auto p-4 md:py-4 md:px-6 bg-white md:rounded-md shadow-lg overflow-hidden"
			>
				<div className="flex items-center justify-between">
					<motion.h2
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="text-xl font-semibold mb-3"
					>
						Add Testimonial
					</motion.h2>
					<button
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 3 }}
						onClick={() => setShowReview(false)} className="bg-gray-200 p-1 h-8 w-8 rounded-md text-gray-600 hover:text-gray-700 cursor-pointer active:scale-95 transition-transform duration-200">
						<iconList.X size={25} />
					</button>
				</div>

				{/* photo */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="flex gap-4 items-center w-full"
				>
					<label htmlFor="car-image">
						{image ? (
							<img
								src={URL.createObjectURL(image)}
								alt="car preview"
								className="h-12 w-20 object-cover rounded-md"
							/>
						) : (
							<iconList.CloudUpload className="h-14 text-primary bg-gray-100 px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-200" />
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
					<p>Upload your image</p>
				</motion.div>

				{/* name & email  */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4  mt-2 md:mt-3">
					{/* Name */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex flex-col w-full"
					>
						<label htmlFor="name">Name</label>
						<input
							name="name"
							id="name"
							value={form.name}
							onChange={handleChange}
							className="px-3 py-2 mt-1	border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
							placeholder="Full Name"
						/>
					</motion.div>
					{/* email  */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55 }}
						className="flex flex-col w-full"
					>
						<label htmlFor="email">Email</label>
						<input
							name="email"
							id="email"
							value={form.email}
							onChange={handleChange}
							className="px-3 py-2 mt-1	border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50"
							placeholder="Email Address"
						/>
					</motion.div>
				</div>

				{/* Location */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="md:mb-3 mb-1 mt-1 relative md:mt-3"
				>
					<label htmlFor="location">Location</label>
					<input
						name="location"
						id="location"
						value={form.location}
						onChange={handleChange}
						className="px-3 py-2 mt-1	border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 w-full"
						placeholder="City, Country"
					/>
				</motion.div>

				{/* Rating */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.65 }}
					className="md:mb-3 mb-1"
				>
					<label htmlFor="rating">Rating</label>
					<select
						name="rating"
						id="rating"
						value={form.rating}
						onChange={handleChange}
						className="px-3 py-2 mt-1	border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 w-full"
					>
						<option value="" disabled>
							Select rating
						</option>
						<option value="1">⭐ 1</option>
						<option value="2">⭐ 2</option>
						<option value="3">⭐ 3</option>
						<option value="4">⭐ 4</option>
						<option value="5">⭐ 5</option>
					</select>
				</motion.div>

				{/* Review */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-4"
				>
					<label htmlFor="review">Review</label>
					<textarea
						name="review"
						id="review"
						value={form.review}
						onChange={handleChange}
						rows={4}
						className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 w-full resize-none"
						placeholder="Write your experience..."
					/>
				</motion.div>

				<motion.button
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
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
				</motion.button>
			</form>
		</motion.div>
	);
};

export default TestimonialForm;

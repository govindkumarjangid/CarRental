import { useAppContext } from "../../context/AppContext.jsx";

const AddCar = () => {
	const {
		axios,
		currency,
		loading,
		setLoading,
		motion,
		assets,
		OwnerTitle,
		toast,
		useState,
	} = useAppContext();

	const [image, setImage] = useState(null);
	const [car, setCar] = useState({
		brand: "",
		model: "",
		year: 0,
		pricePerDay: 0,
		category: "",
		transmission: "",
		fuel_type: "",
		seating_capacity: 0,
		location: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCar((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmithandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append("image", image);
			formData.append("brand", car.brand);
			formData.append("model", car.model);
			formData.append("year", car.year);
			formData.append("pricePerDay", car.pricePerDay);
			formData.append("category", car.category);
			formData.append("transmission", car.transmission);
			formData.append("fuel_type", car.fuel_type);
			formData.append("seating_capacity", car.seating_capacity);
			formData.append("location", car.location);
			formData.append("description", car.description);

			const { data } = await axios.post("/api/owner/add-car", formData);
			if (data.success) {
				toast.success("Car added successfully");
				setCar({
					brand: "",
					model: "",
					year: 0,
					pricePerDay: 0,
					category: "",
					transmission: "",
					fuel_type: "",
					seating_capacity: 0,
					location: "",
					description: "",
				});
				setImage(null);
			} else {
				toast.error(data.message || "Failed to add car");
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Failed to add car");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="px-4 pt-10 md:px-10 flex-1">
			<OwnerTitle
				title={"Add New Car"}
				subTitle={
					"Fill in details to list a new car for booking, including pricing, availability, and car specifications."
				}
			/>

			<form
				onSubmit={onSubmithandler}
				className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-2xl"
			>
				{/* car image  */}

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="flex gap-4 items-center w-full"
				>
					<label htmlFor="car-image">
						<img
							src={
								image
									? URL.createObjectURL(image)
									: assets.upload_icon
							}
							alt=""
							loading="lazy"
							className="h-14 rounded cursor-pointer"
						/>
						<input
							type="file"
							id="car-image"
							name="car-image"
							accept="image/*"
							hidden
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</label>

					<p className="text-sm text-gray-500">
						Upload a picture of your car
					</p>
				</motion.div>

				{/* car brand and model  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					<motion.div className="flex flex-col w-full">
						<label htmlFor="">Brand</label>
						<input
							type="text"
							id="brand"
							name="brand"
							placeholder="e.g. BMW, Mercedes, Audi"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.brand}
							onChange={handleChange}
						/>
					</motion.div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Model</label>
						<input
							type="text"
							id="model"
							name="model"
							placeholder="e.g. X5, C-Class, A6"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.model}
							onChange={handleChange}
						/>
					</div>
				</motion.div>

				{/* year , price and category  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="">Year</label>
						<input
							type="number"
							id="year"
							name="year"
							placeholder="0"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.year}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Daily Price {currency}</label>
						<input
							type="number"
							id="pricePerDay"
							name="pricePerDay"
							placeholder="0"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.pricePerDay}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Category</label>
						<select
							name="category"
							id="category"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.category}
							onChange={handleChange}
						>
							<option value="" disabled>
								Select Category
							</option>
							<option value="Sedan">Sedan</option>
							<option value="SUV">SUV</option>
							<option value="MUV">MUV</option>
							<option value="EV">EV</option>
							<option value="Wagon">Wagon</option>
							<option value="Van">Van</option>
							<option value="Jeep">Jeep</option>
							<option value="Hatchback">Hatchback</option>
						</select>
					</div>
				</motion.div>

				{/* transmission , fuel type and seating capacity  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="">Transmission</label>
						<select
							name="transmission"
							id="transmission"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.transmission}
							onChange={handleChange}
						>
							<option value="" disabled>
								Select Transmission
							</option>
							<option value="Automatic">Automatic</option>
							<option value="Semi-Automatic">
								Semi-Automatic
							</option>
							<option value="Manual">Manual</option>
						</select>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Fuel Type</label>
						<select
							name="fuel_type"
							id="fuel_type"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.fuel_type}
							onChange={handleChange}
						>
							<option value="" disabled>
								Select Fuel Type
							</option>
							<option value="Gas">Gas</option>
							<option value="Petrol">Petrol</option>
							<option value="Diesel">Diesel</option>
							<option value="Electric">Electric</option>
							<option value="Hybrid">Hybrid</option>
						</select>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="">Seating Capacity</label>
						<input
							type="number"
							placeholder="0"
							id="seating_capacity"
							name="seating_capacity"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.seating_capacity}
							onChange={handleChange}
						/>
					</div>
				</motion.div>

				{/* location and description  */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.5 }}
					className="grid grid-cols-1 gap-6"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="">Location</label>
						<select
							name="location"
							id="location"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
							value={car.location}
							onChange={handleChange}
						>
							<option value="" disabled>
								Select Location
							</option>
							<option value="Jaipur">Jaipur</option>
							<option value="Udaipur">Udaipur</option>
							<option value="Kota">Kota</option>
							<option value="Mumbai">Mumbai</option>
							<option value="Delhi">Delhi</option>
							<option value="Gurugram">Gurugram</option>
						</select>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.7 }}
					className="grid grid-cols-1 gap-6"
				>
					<div className="flex flex-col w-full">
						<label htmlFor="">Description</label>
						<textarea
							rows="6"
							placeholder="e.g. A luxury sedan with comfortable seating and powerful engine."
							id="description"
							name="description"
							className="px-3 py-2.5 mt-1	border border-gray-400 rounded-md
							outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 resize-none"
							value={car.description}
							onChange={handleChange}
						></textarea>
					</div>
				</motion.div>

				<button
					type="submit"
					disabled={loading}
					className={`flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-md w-max mt-4 mb-10 hover:bg-primary/90 active:scale-95 transition cursor-pointer ${
						loading ? "cursor-not-allowed opacity-70" : ""
					}`}
				>
					<img
						src={assets.tick_icon}
						loading="lazy"
						alt="tick icon"
					/>
					{loading ? "Listing..." : "List Your Car"}
				</button>
			</form>
		</div>
	);
};

export default AddCar;

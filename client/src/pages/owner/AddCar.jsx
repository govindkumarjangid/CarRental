import { useCarStore } from "../../store/useCarStore.js";
import { useState } from "react";
import { motion } from "motion/react";
import { iconList } from "../../assets/assets.jsx";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import InputBox from "../../components/owner/InputBox.jsx";

const AddCar = () => {
	const { addCar } = useCarStore();

	const currency = import.meta.env.VITE_CURRENCY;

	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [car, setCar] = useState({
		brand: "",
		model: "",
		year: 0,
		pricePerHour: 0,
		lateFeePerHour: 0,
		category: "",
		transmission: "",
		fuel_type: "",
		seating_capacity: 0,
		location: "",
		description: "",
		cleaningTime: 30,
		maintenanceTime: 60,
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
		const success = await addCar(car, image);
		if (success) {
			setCar({
				brand: "",
				model: "",
				year: 0,
				pricePerHour: 0,
				lateFeePerHour: 0,
				category: "",
				transmission: "",
				fuel_type: "",
				seating_capacity: 0,
				location: "",
				description: "",
				cleaningTime: 30,
				maintenanceTime: 60,
			});
			setImage(null);
		}
		setLoading(false);
	};

	return (
		<div className="px-4 py-10 md:px-10 flex-1 w-full max-w-6xl mx-auto">
			<OwnerTitle
				title="Add New Car"
				subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
			/>

			<form
				onSubmit={onSubmithandler}
				className="flex flex-col gap-5 text-gray-500 text-sm mt-6 w-full">
				{/* car image  */}
				<motion.div
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="flex gap-4 items-center w-full overflow-x-auto no-scrollbar py-1">
					<label htmlFor="car-image">
						{image ? (
							<img
								src={URL.createObjectURL(image)}
								alt="car preview"
								className="h-14 w-26 object-cover rounded-xl"
							/>
						) : (
							<iconList.CloudUpload className="h-14 text-primary bg-gray-100 px-4 py-3 rounded-xl cursor-pointer w-26 border border-gray-300" />
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

					<p className="text-xs md:text-sm text-gray-500">
						Upload a image of your car
					</p>
				</motion.div>

				{/* car brand and model  */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6">

					<InputBox
						value={car.brand}
						label="brand"
						placeholder="e.g. BMW, Mercedes, Audi"
						onChange={handleChange}
						type="text"
						title="Brand"
					/>
					<InputBox
						value={car.model}
						label="model"
						placeholder="e.g. X5, C-Class, A6"
						onChange={handleChange}
						type="text"
						title="Model"
					/>
				</motion.div>

				{/* year , price and category  */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<InputBox
						value={car.year}
						label="year"
						placeholder="0"
						onChange={handleChange}
						type="number"
						title="Year"
					/>

					<InputBox
						value={car.pricePerHour}
						label="pricePerHour"
						placeholder="0"
						onChange={handleChange}
						type="number"
						title={`Price /Hour ${currency}`}
					/>

					<InputBox
						value={car.lateFeePerHour}
						label="lateFeePerHour"
						placeholder="0"
						onChange={handleChange}
						type="number"
						title={`Late Fee /Hour ${currency}`}
					/>
					<InputBox
						value={car.category}
						label="category"
						onChange={handleChange}
						as="select"
						title="Category"
						placeholder="Select category"
						options={[
							'Sedan',
							'SUV',
							'MUV',
							'EV',
							'Wagon',
							'Van',
							'Jeep',
							'Hatchback',
						]}
					/>
				</motion.div>

				{/* transmission , fuel type and seating capacity  */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<InputBox
						value={car.transmission}
						label="transmission"
						onChange={handleChange}
						as="select"
						title="Transmission"
						placeholder="Select transmission type"
						options={['Automatic', 'Semi-Automatic', 'Manual']}
					/>

					<InputBox
						value={car.fuel_type}
						label="fuel_type"
						onChange={handleChange}
						as="select"
						title="Fuel Type"
						placeholder="Select fuel type"
						options={['Gas', 'Petrol', 'Diesel', 'Electric', 'Hybrid']}
					/>
					<InputBox
						value={car.seating_capacity}
						label="seating_capacity"
						onChange={handleChange}
						type="number"
						placeholder="0"
						title="Seating Capacity"
					/>
				</motion.div>

				{/* location and description  */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="grid grid-cols-1 gap-6">
					<InputBox
						value={car.location}
						label="location"
						onChange={handleChange}
						as="select"
						title="Location"
						placeholder="Select location"
						options={[
							'Jaipur',
							'Udaipur',
							'Kota',
							'Mumbai',
							'Delhi',
							'Gurugram',
						]}
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InputBox
							value={car.cleaningTime}
							label="cleaningTime"
							onChange={handleChange}
							type="number"
							placeholder="30"
							title="Cleaning Time (Minutes)"
						/>
						<InputBox
							value={car.maintenanceTime}
							label="maintenanceTime"
							onChange={handleChange}
							type="number"
							placeholder="60"
							title="Maint. Time (Minutes)"
						/>
					</div>
				</motion.div>

				{/* description  */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="grid grid-cols-1 gap-6">
					<InputBox
						value={car.description}
						label="description"
						onChange={handleChange}
						as="textarea"
						rows={6}
						placeholder="e.g. A luxury sedan with comfortable seating and powerful engine."
						title="Description"
					/>
				</motion.div>

				{/* submit button  */}
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					type="submit"
					disabled={loading}
					className={` px-5 py-2.5 mt-4 rounded-xl text-white font-medium text-base transition-all active:scale-95 mb-10 w-fit ${loading ? "cursor-not-allowed bg-primary" : "bg-primary hover:bg-primary-dull cursor-pointer"}`}>
					{loading ? (
						<span className="flex items-center gap-2">
							<iconList.Loader size={18} className="animate-spin" />
							Listing...
						</span>
					) : (
						<span className="flex items-center gap-2">
							<iconList.Check size={18} />
							List Your Car
						</span>
					)}
				</motion.button>

			</form>
		</div>
	);
};

export default AddCar;


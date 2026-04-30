import { useCarStore } from "../../store/useCarStore.js";
import FormSkeleton from "../UI/FormSkeleton.jsx";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";

const EditCarForm = ({ car: propCar, onClose, isFullPage = false }) => {
    const { setShowEditCar, editCar, updateCar } = useCarStore();
    const targetCar = propCar || editCar;

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!targetCar) return;
        setCar({
            _id: targetCar._id,
            brand: targetCar.brand || "",
            model: targetCar.model || "",
            year: targetCar.year || "",
            pricePerHour: targetCar.pricePerHour || "",
            lateFeePerHour: targetCar.lateFeePerHour || "",
            category: targetCar.category || "",
            transmission: targetCar.transmission || "",
            fuel_type: targetCar.fuel_type || "",
            seating_capacity: targetCar.seating_capacity || "",
            location: targetCar.location || "",
            description: targetCar.description || "",
            image: targetCar.image || "",
            cleaningTime: targetCar.cleaningTime || 30,
            maintenanceTime: targetCar.maintenanceTime || 60,
        });
    }, [targetCar]);

    if (!car) return <FormSkeleton />;

    const handleChange = (e) => {
        setCar((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleClose = () => {
        if (onClose) onClose();
        else setShowEditCar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await updateCar(car, image);
        setLoading(false);
        if (res?.success) {
            handleClose();
        }
    };

    const formContent = (
        <motion.form
            initial={isFullPage ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            animate={isFullPage ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            exit={isFullPage ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={`${isFullPage ? "w-full h-full" : "relative max-w-2xl mx-auto bg-white dark:bg-second-bg shadow-2xl md:rounded-md md:max-h-[90vh] md:border border-gray-200 dark:border-dark-border"} px-5 md:px-10 py-8 overflow-y-auto blue-thumb-scrollbar w-full bg-white dark:bg-second-bg cursor-default`}
        >
            {/* title and close button  */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    {isFullPage && (
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface transition-all active:scale-90 text-gray-500 dark:text-dark-text border border-gray-100 dark:border-white/5"
                        >
                            <iconList.ArrowLeft size={20} />
                        </button>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold dark:text-dark-text">Edit Your Car</h2>
                </div>
                {!isFullPage && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-surface transition-all active:scale-95 text-gray-500 dark:text-dark-text"
                    >
                        <iconList.X size={22} className="cursor-pointer" />
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-5 text-gray-500 text-sm w-full">
                {/* car image  */}
                <div className="flex gap-4 items-center w-full mb-2">
                    <label htmlFor="car-image" className="cursor-pointer shadow-sm rounded-md border-dashed border-primary border-2 p-2 hover:border-solid">
                        {image ? (
                            <img src={URL.createObjectURL(image)} className="h-14 w-26 object-cover rounded-md" alt="car preview" />
                        ) : car?.image ? (
                            <img src={car.image} className="h-14 w-26 object-cover rounded-md" alt="car current" />
                        ) : (
                            <iconList.CloudUpload className="h-14 text-primary bg-gray-100 dark:bg-surface dark:text-accent px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-300 dark:border-dark-border" />
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="brand" className="mb-1">Brand</label>
                        <input
                            name="brand"
                            id="brand"
                            value={car.brand}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                            placeholder="e.g. BMW"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="model" className="mb-1">Model</label>
                        <input
                            name="model"
                            id="model"
                            value={car.model}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                            placeholder="e.g. X5"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="year" className="mb-1">Year</label>
                        <input
                            type="number"
                            name="year"
                            id="year"
                            value={car.year}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="pricePerHour" className="mb-1">Price /Hour</label>
                        <input
                            type="number"
                            name="pricePerHour"
                            id="pricePerHour"
                            value={car.pricePerHour}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="lateFeePerHour" className="mb-1">Late Fee /Hour</label>
                        <input
                            type="number"
                            name="lateFeePerHour"
                            id="lateFeePerHour"
                            value={car.lateFeePerHour}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="category" className="mb-1">Category</label>
                        <select
                            name="category"
                            id="category"
                            value={car.category}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        >
                            <option value="" disabled>Select Category</option>
                            {["Sedan", "SUV", "MUV", "EV", "Wagon", "Van", "Jeep", "Hatchback"].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="transmission" className="mb-1">Transmission</label>
                        <select
                            name="transmission"
                            id="transmission"
                            value={car.transmission}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        >
                            <option value="" disabled>Select</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="fuel_type" className="mb-1">Fuel Type</label>
                        <select
                            name="fuel_type"
                            id="fuel_type"
                            value={car.fuel_type}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        >
                            <option value="" disabled>Select Fuel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="seating_capacity" className="mb-1">Capacity</label>
                        <input
                            type="number"
                            name="seating_capacity"
                            id="seating_capacity"
                            value={car.seating_capacity}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="cleaningTime" className="mb-1">Cleaning (Mins)</label>
                        <input
                            type="number"
                            name="cleaningTime"
                            id="cleaningTime"
                            value={car.cleaningTime}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="maintenanceTime" className="mb-1">Maint. (Mins)</label>
                        <input
                            type="number"
                            name="maintenanceTime"
                            id="maintenanceTime"
                            value={car.maintenanceTime}
                            onChange={handleChange}
                            className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="description" className="mb-1">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows="4"
                        value={car.description}
                        onChange={handleChange}
                        className="px-3 py-2.5 border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-3 focus:ring-primary/50 transition-colors duration-600 dark:bg-card-bg dark:border-dark-border dark:text-dark-text resize-none"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-8 py-2.5 rounded-md text-white transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${loading ? "bg-primary" : "bg-primary hover:bg-primary-dull"}`}
                    >
                        {loading ? <iconList.Loader className="animate-spin" size={18} /> : <iconList.Check size={18} />}
                        {loading ? "Updating..." : "Update Car"}
                    </button>
                </div>
            </div>
        </motion.form>
    );


    if (isFullPage) return (
        <div className="w-full h-full bg-white dark:bg-second-bg flex flex-col">
            {formContent}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-6 backdrop-blur-md bg-black/40 cursor-pointer overflow-hidden"
        >
            {formContent}
        </motion.div>
    );
};

export default EditCarForm;

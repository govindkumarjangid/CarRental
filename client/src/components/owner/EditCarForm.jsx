import { useCarStore } from "../../store/useCarStore.js";
import FormSkeleton from "../UI/FormSkeleton.jsx";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { iconList } from "../../assets/assets.jsx";
import InputBox from "./InputBox.jsx";

const EditCarForm = ({ car: propCar, onClose, isFullPage = false }) => {
    const { setShowEditCar, editCar, updateCar } = useCarStore();
    const targetCar = propCar || editCar;
    const currency = import.meta.env.VITE_CURRENCY || "$";

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
            className={`${isFullPage ? "w-full h-full" : "relative max-w-2xl mx-auto bg-white shadow-2xl md:rounded-md md:max-h-[90vh] md:border border-gray-200"} px-5 md:px-10 py-8 overflow-y-auto blue-thumb-scrollbar w-full bg-white cursor-default`}
        >
            {/* title and close button  */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    {isFullPage && (
                        <button
                            type="button"
                            onClick={handleClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-all active:scale-90 text-gray-500 border border-gray-100 cursor-pointer"
                        >
                            <iconList.ArrowLeft size={20} />
                        </button>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold">Edit Your Car</h2>
                </div>
                {!isFullPage && (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="p-2 rounded-md hover:bg-gray-100 transition-all active:scale-95 text-gray-500"
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
                            <iconList.CloudUpload className="h-14 text-primary bg-gray-100 px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-300" />
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
                    <InputBox
                        label="brand"
                        title="Brand"
                        value={car.brand}
                        onChange={handleChange}
                        placeholder="e.g. BMW"
                    />
                    <InputBox
                        label="model"
                        title="Model"
                        value={car.model}
                        onChange={handleChange}
                        placeholder="e.g. X5"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <InputBox
                        label="year"
                        title="Year"
                        type="number"
                        value={car.year}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="pricePerHour"
                        title={`Price /Hour (${currency})`}
                        type="number"
                        value={car.pricePerHour}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="lateFeePerHour"
                        title={`Late Fee /Hour (${currency})`}
                        type="number"
                        value={car.lateFeePerHour}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="category"
                        title="Category"
                        as="select"
                        value={car.category}
                        onChange={handleChange}
                        options={["Sedan", "SUV", "MUV", "EV", "Wagon", "Van", "Jeep", "Hatchback"]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <InputBox
                        label="transmission"
                        title="Transmission"
                        as="select"
                        value={car.transmission}
                        onChange={handleChange}
                        options={["Automatic", "Semi-Automatic", "Manual"]}
                    />
                    <InputBox
                        label="fuel_type"
                        title="Fuel Type"
                        as="select"
                        value={car.fuel_type}
                        onChange={handleChange}
                        options={["Petrol", "Diesel", "Electric", "Hybrid"]}
                    />
                    <InputBox
                        label="seating_capacity"
                        title="Capacity"
                        type="number"
                        value={car.seating_capacity}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <InputBox
                        label="cleaningTime"
                        title="Cleaning (Mins)"
                        type="number"
                        value={car.cleaningTime}
                        onChange={handleChange}
                    />
                    <InputBox
                        label="maintenanceTime"
                        title="Maint. (Mins)"
                        type="number"
                        value={car.maintenanceTime}
                        onChange={handleChange}
                    />
                </div>

                <InputBox
                    label="description"
                    title="Description"
                    as="textarea"
                    rows={4}
                    value={car.description}
                    onChange={handleChange}
                />

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
        <div className="w-full h-full bg-white  flex flex-col">
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


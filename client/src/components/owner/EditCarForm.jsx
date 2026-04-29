import { useCarStore } from "../../store/useCarStore.js";
import FormSkeleton from "../UI/FormSkeleton.jsx";
import { useState, motion, iconList, useEffect } from "../../index.js";


const EditCarForm = () => {

  const { setShowEditCar, editCar, updateCar } = useCarStore();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!editCar) return;
    setCar({
      brand: editCar.brand || "",
      model: editCar.model || "",
      year: editCar.year || "",
      pricePerDay: editCar.pricePerDay || "",
      category: editCar.category || "",
      transmission: editCar.transmission || "",
      fuel_type: editCar.fuel_type || "",
      seating_capacity: editCar.seating_capacity || "",
      location: editCar.location || "",
      description: editCar.description || "",
      image: editCar.image || "",
    });
  }, [editCar]);

  if (!car) return <FormSkeleton />;

  const handleChange = (e) => {
    setCar((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateCar(car, image);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 pointer-events-none">
      <motion.form
        initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.5 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        exit={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl mx-auto bg-white dark:bg-second-bg px-5 md:px-8 py-5 md:py-6 shadow-2xl overflow-y-auto blue-thumb-scrollbar h-full md:h-auto md:max-h-[85vh] md:rounded-xl w-full z-51 border-none md:border border-gray-200 dark:border-dark-border pointer-events-auto"
      >

        {/* title and close button  */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold dark:text-dark-text">Edit Your Car</h2>
          <button
            type="button"
            onClick={() => setShowEditCar(false)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-surface transition-all active:scale-95 text-gray-500 dark:text-dark-text"
          >
            <iconList.X size={22} className="cursor-pointer" />
          </button>
        </div>

        {/* upload */}
        <div className="flex gap-4 items-center w-full mb-2">
          <label htmlFor="car-image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="car preview"
                className="h-14 w-26 object-cover rounded-md"
              />
            ) : car?.image ? (
              <img
                src={car.image}
                alt="preview"
                className="h-14 w-26 object-cover rounded-md"
              />
            ) : (
              <iconList.CloudUpload className="h-14 text-primary bg-gray-100 dark:bg-surface dark:text-accent px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-200 dark:border-dark-border" />
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

          <p className="text-sm text-gray-500 dark:text-dark-muted">
            Upload a picture of your car
          </p>
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 my-4">
          <div>
            <label htmlFor="brand" className="text-sm dark:text-dark-muted">Brand</label>
            <input
              id="brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
              placeholder="BMW, Audi, Mercedes"
            />
          </div>

          <div>
            <label htmlFor="model" className="text-sm dark:text-dark-muted">Model</label>
            <input
              id="model"
              name="model"
              value={car.model}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
              placeholder="X5, A6, C-Class"
            />
          </div>

          <div>
            <label htmlFor="year" className="text-sm dark:text-dark-muted">Year</label>
            <input
              id="year"
              name="year"
              type="number"
              value={car.year}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            />
          </div>

          <div>
            <label htmlFor="pricePerDay" className="text-sm dark:text-dark-muted">Daily Price ₹</label>
            <input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              value={car.pricePerDay}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-sm dark:text-dark-muted">Category</label>
            <select
              id="category"
              name="category"
              value={car.category}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            >
              <option value="" disabled>Select Category</option>
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

          <div>
            <label htmlFor="transmission" className="text-sm dark:text-dark-muted">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={car.transmission}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            >
              <option value="" disabled>Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label htmlFor="fuel_type" className="text-sm dark:text-dark-muted">Fuel Type</label>
            <select
              id="fuel_type"
              name="fuel_type"
              value={car.fuel_type}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            >
              <option value="" disabled>Select Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="seating_capacity" className="text-sm dark:text-dark-muted">Seating Capacity</label>
            <input
              id="seating_capacity"
              name="seating_capacity"
              type="number"
              value={car.seating_capacity}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
            />
          </div>

          <div>
            <label htmlFor="location" className="text-sm dark:text-dark-muted">Location</label>
            <input
              id="location"
              name="location"
              value={car.location}
              onChange={handleChange}
              className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text"
              placeholder="Delhi, Mumbai..."
            />
          </div>
        </div>

        {/* description */}
        <div className="mb-4">
          <label htmlFor="description" className="text-sm dark:text-dark-muted">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={car.description}
            onChange={handleChange}
            className="px-3 py-2 w-full mt-1 border border-gray-400 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 dark:bg-card-bg dark:border-dark-border dark:text-dark-text resize-none"
            placeholder="Comfortable, powerful engine..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={` px-5 py-2.5 mt-2 rounded-md text-white transition-all active:scale-95 dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg w-full md:w-auto ${loading ? "cursor-not-allowed bg-primary" : "bg-primary hover:bg-primary-dull cursor-pointer"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <iconList.Loader size={18} className="animate-spin" />
              Updating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <iconList.Check size={18} />
              Update Car
            </span>
          )}
        </button>

      </motion.form>
    </div>
  );
}

export default EditCarForm;

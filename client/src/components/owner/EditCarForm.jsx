import { useCarStore } from "../../store/useCarStore.js";
import Loader from "../UI/Loader.jsx";
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

  if (!car) return <Loader />;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setShowEditCar(false)}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <motion.form
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl mx-auto bg-white px-8 py-4 shadow-2xl overflow-y-auto blue-thumb-scrollbar max-h-full md:max-h-11/12 rounded-md w-full z-51"
      >

        {/* title and close button  */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Edit Your Car</h2>
          <button
            onClick={() => setShowEditCar(false)}
            className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 transition-all active:scale-95">
            <iconList.X
              size={24}
              className="cursor-pointer"
              onClick={() => setShowEditCar(false)}
            />
          </button>
        </div>

        {/* upload */}
        <div className="flex gap-4 items-center w-full">
          <label htmlFor="car-image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="car preview"
                className="h-14 w-26 object-cover rounded-md"
              />
            ) : (
              car?.image ? (
                <img
                  src={car.image}
                  alt="preview"
                  className="h-14 w-26 object-cover rounded-md"
                />
              ) : (
                <iconList.CloudUpload className="h-14 text-primary bg-gray-100 px-4 py-3 rounded-md cursor-pointer w-26 border border-gray-200" />
              ))}

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
        </div>

        {/* grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 my-4">
          <div>
            <label htmlFor="brand" className="text-sm">Brand</label>
            <input
              id="brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
              placeholder="BMW, Audi, Mercedes"
            />
          </div>

          <div>
            <label htmlFor="model" className="text-sm">Model</label>
            <input
              id="model"
              name="model"
              value={car.model}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
              placeholder="X5, A6, C-Class"
            />
          </div>

          <div>
            <label htmlFor="year" className="text-sm">Year</label>
            <input
              id="year"
              name="year"
              type="number"
              value={car.year}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="pricePerDay" className="text-sm">Daily Price ₹</label>
            <input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              value={car.pricePerDay}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-sm">Category</label>
            <select
              id="category"
              name="category"
              value={car.category}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
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

          <div>
            <label htmlFor="transmission" className="text-sm">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={car.transmission}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
            >
              <option value="" disabled>Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">
                Semi-Automatic
              </option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label htmlFor="fuel_type" className="text-sm">Fuel Type</label>
            <select
              id="fuel_type"
              name="fuel_type"
              value={car.fuel_type}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
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
            <label htmlFor="seating_capacity" className="text-sm">Seating Capacity</label>
            <input
              id="seating_capacity"
              name="seating_capacity"
              type="number"
              value={car.seating_capacity}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="location" className="text-sm">Location</label>
            <input
              id="location"
              name="location"
              value={car.location}
              onChange={handleChange}
              className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700"
              placeholder="Delhi, Mumbai..."
            />
          </div>
        </div>

        {/* description */}
        <div>
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={car.description}
            onChange={handleChange}
            className="px-3 py-2 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 text-gray-700 resize-none"
            placeholder="Comfortable, powerful engine..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={` px-5 py-2 mt-4 rounded-md text-white transition-all active:scale-95 ${loading ? "cursor-not-allowed bg-primary" : "bg-primary hover:bg-primary-dull cursor-pointer"}`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <iconList.Loader size={18} className="animate-spin" />
              Updating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <iconList.Check size={18} />
              Update Car
            </span>
          )}
        </button>

      </motion.form>
    </motion.div>
  );
}

export default EditCarForm;

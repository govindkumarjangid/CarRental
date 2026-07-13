import { useAuthStore } from "../../store/useAuthStore.js";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { assets } from "../../assets/assets.jsx";
import { optimizeImage } from "../../lib/imageOptimization.js";

const Banner = () => {

	const { setShowLogin, user } = useAuthStore();
	const navigate = useNavigate();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<>
			<div className="max-w-8xl m-auto w-full py-20 px-3">
				<motion.div
					ref={ref}
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.3 }}
					className="flex flex-col md:flex-row md:items-center justify-between px-8 md:pl-14 pt-10 bg-linear-to-r from-primary/80 via-primary/90 to-primary-dull max-w-6xl rounded-3xl overflow-hidden md:mx-auto shadow-lg">
					<div className="md:max-w-lg text-left pb-8">
						<h2 className="text-3xl md:text-4xl text-white mb-4">
							Do You Own a Luxury Car?
						</h2>
						<p className="mt-2 text-white">
							Monnetize your vehicle effortlessly by listing it on
							CarRental.
						</p>
						<p className="text-white/90 mb-6 max-w-130">
							We take care of insurance, driver verifition , and
							secure payments - so you can earn passive income
							piece of mind.
						</p>
						<button
							onClick={() => {
								user?.role === "owner" ? navigate("/owner/add-car") : user ? navigate("/cars") : setShowLogin(true);
								scrollTo(0, 0);
							}}
							className="bg-white text-primary px-6 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-98 cursor-pointer">
							{user?.role === "owner" ? "List Your Car" : user?.role === "user" ? "Explore Cars" : "Get Started"}
						</button>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
						transition={{ duration: 0.3 }}
						className="mt-6 md:mt-14 flex justify-center items-center">
						<img
							src={optimizeImage(assets.banner_car_image, { width: 600 })}
							alt="car-banner"
							width="400"
							height="200"
							className="w-full h-auto max-w-sm"
							loading="lazy"
						/>

					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

export default Banner;


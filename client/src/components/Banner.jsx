import { useAppContext } from "../context/AppContext";

const Banner = () => {
	const { motion, useInView, navigate, assets, useRef, user, setShowLogin } =
		useAppContext();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	return (
		<>
			<div className=" max-w-8xl m-auto dark:bg-linear-to-r dark:to-main-bg dark:from-second-bg w-full py-20 px-3">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 100 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.9, ease: "easeInOut" }}
					className="flex flex-col md:flex-row md:items-center justify-between px-8 md:pl-14 pt-10 bg-linear-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl rounded-2xl overflow-hidden  dark:bg-linear-to-r dark:from-main-bg dark:to-second-bg md:mx-auto"
				>
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
								{
									user
										? navigate("/owner/add-car")
										: setShowLogin(true);
								}
							}}
							className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200  dark:border dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-second-bg active:scale-95 cursor-pointer"
						>
							{user ? "List Your Car" : "Get Started"}
						</button>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
						animate={
							isInView
								? { opacity: 1, x: 0, filter: "blur(0px)" }
								: {}
						}
						transition={{
							duration: 0.9,
							delay: 0.3,
							ease: "easeInOut",
						}}
						className="mt-6 md:mt-14 flex justify-center items-center"
					>
						<img
							src={assets.banner_car_image}
							alt="car-banner"
							className="w-full h-auto max-w-sm"
						/>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

export default Banner;

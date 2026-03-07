import { useAppContext } from "../../context/AppContext";
const Newsletter = () => {
	const { motion, useInView, UserTitle, useRef } = useAppContext();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 text-white h-auto dark:bg-linear-to-r dark:to-main-bg dark:from-second-bg">
				<UserTitle
					title="Never Miss a Deal!"
					subTitle="Subscribe to get the latest offer, new collections, and exclusive discounts."
				/>

				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
					animate={
						isInView
							? { opacity: 1, y: 0, filter: "blur(0px)" }
							: {}
					}
					transition={{ duration: 0.9, ease: "easeOut" }}
					className=" flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mt-10 border border-slate-500 focus-within:outline focus-within:outline-primary dark:focus-within:outline-white  rounded-xl w-[95%] sm:w-full max-w-3xl p-3 sm:p-4 dark:bg-main-bg bg-white"
				>
					<input className="flex-1  bg-transparent outline-none text-sm sm:text-base md:text-lg dark:text-light text-gray-700 placeholder:text-slate-400  px-2 min-h-11"
						placeholder="Enter your email address"
						type="email"
					/>

					<button	className="bg-primary text-white rounded-lg h-11 sm:h-12 px-4 sm:px-8 w-full sm:w-auto flex items-center justify-center hover:bg-primary-dull active:scale-95 transition text-sm sm:text-base md:text-lg cursor-pointer"
					>
						Subscribe
					</button>
				</motion.div>
			</div>
		</>
	);
};

export default Newsletter;

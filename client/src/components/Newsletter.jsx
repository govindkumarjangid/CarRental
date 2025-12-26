import { useAppContext } from "../context/AppContext";
const Newsletter = () => {
	const { motion, useInView, UserTitle, useRef } = useAppContext();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 text-white h-auto dark:bg-linear-to-r dark:to-[#081c24] dark:from-[#334b57]">
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
					className="flex items-center justify-between mt-10 border border-slate-500 
           focus-within:outline focus-within:outline-primary dark:focus-within:outline-white rounded-lg w-full h-12 sm:h-14 md:h-16 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl px-3 sm:px-4  dark:bg-main-bg bg-white gap-1"
				>
					<input
						className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg dark:text-light text-gray-700 placeholder:text-slate-400 px-1 sm:px-2"
						placeholder="Enter your email address"
						type="text"
					/>

					<button className="bg-primary text-white rounded-lg h-10 sm:h-11 md:h-12 px-4 sm:px-10 flex items-center justify-center hover:bg-primary-dull active:scale-95 transition text-sm sm:text-base md:text-lg dark:brightness-500 dark:text-shadow-lg ">
						Subscribe
					</button>
				</motion.div>
			</div>
		</>
	);
};

export default Newsletter;

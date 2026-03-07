import {motion, useInView,Title as UserTitle, useRef} from "../../index.js";
const Newsletter = () => {

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 text-white h-auto dark:bg-main-bg">
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
					className=" flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mt-10 border border-slate-500 focus-within:outline focus-within:outline-primary dark:focus-within:outline-accent  rounded-xl w-[95%] sm:w-full max-w-3xl p-3 sm:p-4 dark:bg-second-bg dark:border-dark-border bg-white"
				>
					<input className="flex-1  bg-transparent outline-none text-sm sm:text-base md:text-lg dark:text-light text-gray-700 placeholder:text-slate-400 dark:placeholder:text-dark-muted  px-2 min-h-11"
						placeholder="Enter your email address"
						type="email"
					/>

					<button	className="bg-primary text-white rounded-lg h-11 sm:h-12 px-4 sm:px-8 w-full sm:w-auto flex items-center justify-center hover:bg-primary-dull active:scale-95 transition text-sm sm:text-base md:text-lg cursor-pointer dark:bg-accent dark:hover:bg-accent-dull dark:text-main-bg"
					>
						Subscribe
					</button>
				</motion.div>
			</div>
		</>
	);
};

export default Newsletter;

import { motion } from "motion/react";
import { Title as UserTitle } from "../../index.js";

const Newsletter = () => {

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 text-white h-auto ">
				<UserTitle
					title="Never Miss a Deal!"
					subTitle="Subscribe to get the latest offer, new collections, and exclusive discounts."
				/>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					style={{ willChange: "opacity" }}
					className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mt-10 border-2 border-slate-300 rounded-xl w-[95%] sm:w-full max-w-3xl p-3 sm:p-4 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/40 transition-all">
					<label htmlFor="newsletter-email" className="sr-only">Email address</label>
					<input
						id="newsletter-email"
						className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg text-gray-800 placeholder:text-slate-500 px-2 min-h-11"
						placeholder="Enter your email address"
						type="email"
						required
					/>

					<button
						aria-label="Subscribe to newsletter"
						className="bg-primary text-white rounded-xl h-11 sm:h-12 px-4 sm:px-8 w-full sm:w-auto flex items-center justify-center hover:bg-primary-dull active:scale-95 transition text-sm sm:text-base md:text-lg cursor-pointer font-semibold">
						Subscribe
					</button>
				</motion.div>

			</div>
		</>
	);
};

export default Newsletter;


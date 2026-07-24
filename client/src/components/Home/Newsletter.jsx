import { useState } from "react";
import { motion } from "motion/react";
import { Title as UserTitle } from "../../index.js";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";
import { Loader, Send } from "lucide-react";

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [subscribing, setSubscribing] = useState(false);

	const handleSubscribe = async (e) => {
		e.preventDefault();
		if (!email || !email.trim()) {
			toast.error("Please enter a valid email address!");
			return;
		}

		setSubscribing(true);
		try {
			const { data } = await axiosInstance.post("/api/v1/user/subscribe", { email: email.trim() });
			if (data.success) {
				if (data.alreadySubscribed) {
					toast(data.message, { icon: "ℹ️" });
				} else {
					toast.success(data.message || "Subscribed successfully! Confirmation email sent.");
					setEmail("");
				}
			} else {
				toast.error(data.message || "Failed to subscribe");
			}
		} catch (error) {
			console.error("Subscription error:", error);
			toast.error(error.response?.data?.message || "Failed to subscribe. Please try again!");
		} finally {
			setSubscribing(false);
		}
	};

	return (
		<>
			<div className="max-w-8xl m-auto flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 py-20 pb-30 text-white h-auto ">
				<UserTitle
					title="Never Miss a Deal!"
					subTitle="Subscribe to get the latest offer, new collections, and exclusive discounts."
				/>

				<motion.form
					onSubmit={handleSubscribe}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mt-10 border-2 border-slate-300 rounded-xl w-[95%] sm:w-full max-w-3xl p-3 sm:p-4 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/40 transition-all shadow-xl">
					<label htmlFor="newsletter-email" className="sr-only">Email address</label>
					<input
						id="newsletter-email"
						className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg text-gray-800 placeholder:text-slate-500 px-2 min-h-11"
						placeholder="Enter your email address"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={subscribing}
						aria-label="Subscribe to newsletter"
						className="bg-primary text-white rounded-xl h-11 sm:h-12 px-4 sm:px-8 w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-primary-dull active:scale-95 transition text-sm sm:text-base md:text-lg cursor-pointer font-semibold shadow-md disabled:opacity-70">
						{subscribing ? (
							<>
								<Loader size={18} className="animate-spin" />
								<span>Subscribing...</span>
							</>
						) : (
							<>
								<span>Subscribe</span>
								<Send size={16} />
							</>
						)}
					</button>
				</motion.form>

			</div>
		</>
	);
};

export default Newsletter;


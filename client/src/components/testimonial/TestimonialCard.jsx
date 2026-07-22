import { motion } from "motion/react";
import { UserAvatar } from "../../index.js";
import { Star, Quote } from "lucide-react";

const TestimonialCard = ({ review, index }) => {
	const rating = review?.rating || 5;

	return (
		<motion.div
			key={index}
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.2 }}
			className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 shadow-xs hover:shadow-xl transition-all w-full flex flex-col justify-between cursor-pointer group h-fit">
			<div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-1">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								size={16}
								className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
							/>
						))}
					</div>
					<Quote size={20} className="text-primary/20 group-hover:text-primary/40 transition-colors" />
				</div>

				<p className="text-gray-700 font-medium text-sm leading-relaxed mb-6 italic line-clamp-4">
					"{review?.review || "Best rental service. Clean cars, smooth booking experience, and polite staff!"}"
				</p>
			</div>

			<div className="flex items-center gap-3 pt-4 border-t border-gray-100">
				<UserAvatar
					src={review?.imageUrl}
					name={review?.name || "Rahul Sharma"}
					size={40}
					className="w-10 h-10 rounded-full border border-gray-200"
				/>
				<div>
					<h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
						{review?.name || "Rahul Sharma"}
					</h4>
					<p className="text-xs text-gray-500 font-medium">
						{review?.location || "Jaipur, Rajasthan"}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default TestimonialCard;

import { motion } from "motion/react";
import { iconList, UserAvatar } from "../../index.js"

const TestimonialCard = ({ review, index }) => {
	return (
		<motion.div
		    key={index}
			initial={{ opacity: 0, y: 6 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.2 }}
			className="bg-white p-4 rounded-xl hover:-translate-y-1 hover:shadow-sm transition-all border-2 border-light w-full h-full cursor-pointer">
			<div className="flex items-center gap-3">
				<UserAvatar
					src={review?.imageUrl}
					name={review?.name}
					size={40}
					className="w-10 h-10"
				/>
				<div>
					<p className="text-lg ">{review?.name}</p>
					<p className="text-gray-500 text-sm">
						{review?.location}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1 mt-2">
				{Array.from({ length: 5 }).map((_, i) => (
					<iconList.Star
						key={i}
						size={18}
						className={
							i < review?.rating ? "text-primary" : "text-gray-300"
						}
						fill={i < review?.rating ? "#2563EB" : "none"}
					/>
				))}
			</div>
			<p className="text-gray-500 max-w-90 text-sm mt-4  line-clamp-3 md:line-clamp-4">
				{review?.review}
			</p>
		</motion.div>
	);
};

export default TestimonialCard;


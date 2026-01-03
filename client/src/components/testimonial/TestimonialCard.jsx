import { useAppContext } from "../../context/AppContext";

const TestimonialCard = ({ review, index, ref }) => {
	const { motion, iconList } = useAppContext();
	return (
		<motion.div
			key={index}
			className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:bg-second-bg dark:text-white dark:hover:shadow-gray-700 h-60"
		>
			<div className="flex items-center gap-3">
				<img
					className="w-12 h-12 rounded-full"
					src={review?.imageUrl}
					alt={review?.name}
				/>
				<div>
					<p className="text-xl dark:text-gray-400">{review?.name}</p>
					<p className="text-gray-500 dark:text-gray-400">
						{review?.location}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-1 mt-4">
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
			<p className="text-gray-500 max-w-90 mt-4 dark:text-gray-400 line-clamp-4">
				{review?.review}
			</p>
		</motion.div>
	);
};

export default TestimonialCard;

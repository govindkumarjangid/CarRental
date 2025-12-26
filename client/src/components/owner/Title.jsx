import { motion } from "motion/react";

export const Title = ({ title, subTitle }) => {
	return (
		<>
			<motion.h1
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-3xl font-medium"
			>
				{title}
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
				className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156"
			>
				{subTitle}
			</motion.p>
		</>
	);
};

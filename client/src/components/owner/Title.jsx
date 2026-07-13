import { motion } from "framer-motion";

export const Title = ({ title, subTitle }) => {
	return (
		<>
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="text-2xl font-medium md:text-3xl ">
				{title}
			</motion.h1>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156 line-clamp-3 ">
				{subTitle}
			</motion.p>
		</>
	);
};


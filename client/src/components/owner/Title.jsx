import {motion} from "../../index.js"

export const Title = ({ title, subTitle }) => {
	return (
		<>
			<motion.h1
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				className="text-2xl font-medium md:text-3xl "
			>
				{title}
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 }}
				className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156 line-clamp-3 "
			>
				{subTitle}
			</motion.p>
		</>
	);
};

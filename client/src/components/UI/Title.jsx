import { useRef, motion, useInView} from "../../index.js"

export const Title = ({ title, subTitle, align }) => {

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className={`flex flex-col justify-center items-center  text-center ${
				align === "left" && "md:items-start md:text-left"
			}`}
		>
			<h2 className="font-semibold text-4xl md:text-[40px] text-gray-800 ">
				{title}
			</h2>

			<p className="text-sm md:text-base text-gray-700/90 mt-4 max-w-156 ">
				{subTitle}
			</p>
		</motion.div>
	);
};


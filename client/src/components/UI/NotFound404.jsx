import { motion } from "motion/react";
import { iconList } from "../../assets/assets.jsx";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
	const navigate = useNavigate();

	return (
		<div className="h-full w-full bg-white overflow-hidden flex flex-col items-center justify-center px-4 relative">
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2 }}
				className="text-center z-10">
				<h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-gray-900 flex justify-center">
					<span>4</span>
					<span className="text-primary mx-2">0</span>
					<span>4</span>
				</h1>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}>
					<h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">
						Oops! Wrong Turn.
					</h2>
					<p className="text-gray-500 mt-4 max-w-md mx-auto text-lg">
						The page you're looking for has been moved or doesn't exist. Let's get you back on the right track.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
					<button
						onClick={() => navigate("/")}
						className="group flex items-center gap-3 px-5 py-2 bg-primary hover:bg-primary-dull text-white rounded-xl font-bold text-lg transition-all shadow-md active:scale-95 cursor-pointer">
						<iconList.Home size={20} />
						Back to Home
					</button>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 px-5 py-1.5 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all active:scale-95 cursor-pointer">
						Go Back
					</button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default NotFound404;


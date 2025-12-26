import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";

const NavbarOwner = () => {
	const { user, motion, useInView, useRef, assets } = useAppContext();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: -40, filter: "blur(10px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="flex items-center justify-between px-6 md:px-6 py-5 text-gray-500 border-b border-gray-400 relative transition-all"
		>
			<Link to="/">
				<img
					src={assets.logo}
					alt="logo"
					className="h-6 md:h-7"
					loading="lazy"
				/>
			</Link>
			<p className="text-sm md:text-lg">
				Welcome, {user?.name || "Owner"}
			</p>
		</motion.div>
	);
};

export default NavbarOwner;

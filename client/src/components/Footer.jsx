import { Facebook, Instagram, Twitter, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Footer = () => {
	const { motion, assets } = useAppContext();
	const fadeUp = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	const staggerContainer = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.15,
			},
		},
	};
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ amount: 0.3 }}
			variants={staggerContainer}
			className="max-w-8xl m-auto bg-light
       text-gray-500/80 pt-14 px-6 md:px-16 lg:px-24 xl:px-32
      dark:bg-linear-to-r dark:from-[#081c24] dark:to-[#334b57] dark:text-light"
		>
			<div className="flex flex-wrap justify-between items-start gap-8 pb-6 md:gap-6">
				<motion.div variants={fadeUp} className="max-w-80">
					<motion.img
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						src={assets.logo}
						alt="logo"
						className="mb-4 h-8 md:h-9 dark:brightness-500"
					/>

					<p className="text-sm max-w-80">
						Premium car rental service with a wide selection of
						luxury and everyday vehicles for all your driving needs.
					</p>

					<div className="flex items-center gap-3 mt-4">
						{[Facebook, Instagram, Twitter, MailIcon].map(
							(Icon, index) => (
								<motion.div
									key={index}
									whileHover={{ scale: 1.15, y: -4 }}
									whileTap={{ scale: 0.95 }}
									className="cursor-pointer"
								>
									<Icon className="w-6 h-6 transition" />
								</motion.div>
							)
						)}
					</div>
				</motion.div>

				{/* Quick Links */}
				<motion.div variants={fadeUp}>
					<p className="text-lg text-gray-800 dark:text-gray-400">
						QUICK LINKS
					</p>
					<ul className="mt-3 flex flex-col gap-2 text-sm">
						<Link to="/">Home</Link>
						<Link to="/">Browse Cars</Link>
						<Link to="/">List Your Car</Link>
						<Link to="/">About Us</Link>
					</ul>
				</motion.div>

				{/* Resources */}
				<motion.div variants={fadeUp}>
					<p className="text-lg text-gray-800 dark:text-gray-400">
						RESOURCES
					</p>
					<ul className="mt-3 flex flex-col gap-2 text-sm">
						<Link>Help Center</Link>
						<Link>Terms of Service</Link>
						<Link>Privacy Policy</Link>
						<Link>Insurance</Link>
					</ul>
				</motion.div>

				{/* Contact */}
				<motion.div variants={fadeUp} className="max-w-80">
					<p className="text-lg text-gray-800 dark:text-gray-400">
						CONTACT
					</p>
					<ul className="mt-3 flex flex-col gap-2 text-sm">
						<Link>1234 Luxury Drive</Link>
						<Link>Jaipur, IN 302015</Link>
						<Link>+91-7342162313</Link>
						<Link>car@example.com</Link>
					</ul>
				</motion.div>
			</div>

			{/* Divider */}
			<motion.hr variants={fadeUp} className="border-gray-400 mt-8" />

			{/* Bottom Row */}
			<motion.div
				variants={fadeUp}
				className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
			>
				<p>
					© {new Date().getFullYear()} CarRental. All rights reserved.
				</p>

				<ul className="flex items-center gap-4">
					<li>
						<a href="#">Terms</a>
					</li>
					<li>|</li>
					<li>
						<a href="#">Privacy</a>
					</li>
					<li>|</li>
					<li>
						<a href="#">Cookies</a>
					</li>
				</ul>
			</motion.div>
		</motion.div>
	);
};

export default Footer;

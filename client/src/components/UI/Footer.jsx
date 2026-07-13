import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { ResponsiveImage } from "../../index.js"
import { assets } from "../../assets/assets.jsx";

const Footer = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView="show"
			viewport={{ amount: 0.1 }}
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: 0.15,
					},
				},
			}}
			className="w-full bg-light text-gray-500/80 pt-16 max-w-full px-4 md:px-15 border-t border-gray-200 ">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10">
					{/* Brand & Social */}
					<motion.div variants={{
						hidden: { opacity: 0, y: 20 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}} className="space-y-6">
						<ResponsiveImage
							src={assets.logo}
							alt="logo"
							width={150}
							height={40}
							className="h-8 md:h-10 object-contain cursor-pointer "
						/>

						<p className="text-sm leading-relaxed max-w-xs">
							Premium car rental service with a wide selection of
							luxury and everyday vehicles for all your driving needs.
						</p>

						<div className="flex items-center gap-4">
							{[
								{ Icon: Facebook, label: "Facebook" },
								{ Icon: Instagram, label: "Instagram" },
								{ Icon: Twitter, label: "Twitter" },
								{ Icon: Mail, label: "Email" },
							].map(({ Icon, label }, index) => (
								<motion.a
									key={index}
									href="#"
									aria-label={label}
									title={label}
									
									
									className="cursor-pointer text-gray-500/80 hover:text-primary transition-colors">
									<Icon className="w-5 h-5" />
								</motion.a>
							))}
						</div>
					</motion.div>

					{/* Quick Links */}
					<motion.div variants={{
						hidden: { opacity: 0, y: 20 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}} className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900  uppercase">
							Quick Links
						</h3>
						<ul className="flex flex-col gap-3 text-sm">
							<li><Link to="/" className="hover:text-primary  transition-colors">Home</Link></li>
							<li><Link to="/cars" className="hover:text-primary  transition-colors">Browse Cars</Link></li>
							<li><Link to="/" className="hover:text-primary  transition-colors">List Your Car</Link></li>
							<li><Link to="/" className="hover:text-primary  transition-colors">About Us</Link></li>
						</ul>
					</motion.div>

					{/* Resources */}
					<motion.div variants={{
						hidden: { opacity: 0, y: 20 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}} className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900  uppercase">
							Resources
						</h3>
						<ul className="flex flex-col gap-3 text-sm">
							<li><Link className="hover:text-primary  transition-colors">Help Center</Link></li>
							<li><Link className="hover:text-primary  transition-colors">Terms of Service</Link></li>
							<li><Link className="hover:text-primary  transition-colors">Privacy Policy</Link></li>
							<li><Link className="hover:text-primary  transition-colors">Insurance</Link></li>
						</ul>
					</motion.div>

					{/* Contact */}
					<motion.div variants={{
						hidden: { opacity: 0, y: 20 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}} className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900  uppercase">
							Contact
						</h3>
						<ul className="flex flex-col gap-3 text-sm">
							<li className="flex items-center gap-2">
								<MapPin size={16} className="text-primary " />
								<span>Jaipur, IN 302015</span>
							</li>
							<li className="flex items-center gap-2">
								<Mail size={16} className="text-primary " />
								<span>car@example.com</span>
							</li>
							<li className="flex items-center gap-2">
								<Phone size={16} className="text-primary " />
								<span>+91-7342162313</span>
							</li>
						</ul>
					</motion.div>
				</div>

				{/* Divider */}
				<motion.hr variants={{
					hidden: { opacity: 0, y: 20 },
					show: {
						opacity: 1,
						y: 0,
						transition: { duration: 0.6, ease: "easeOut" },
					},
				}} className="border-gray-200 " />

				{/* Bottom Row */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						show: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6, ease: "easeOut" },
						},
					}}
					className="flex flex-col md:flex-row gap-6 items-center justify-between py-8 text-[13px]">
					<p className="order-2 md:order-1 text-gray-400">
						© {new Date().getFullYear()} CarRental. All rights reserved.
					</p>

					<ul className="flex items-center gap-6 order-1 md:order-2">
						<li><a href="#" className="hover:text-primary  transition-colors">Terms</a></li>
						<li className="text-gray-300 ">|</li>
						<li><a href="#" className="hover:text-primary  transition-colors">Privacy</a></li>
						<li className="text-gray-300 ">|</li>
						<li><a href="#" className="hover:text-primary  transition-colors">Cookies</a></li>
					</ul>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Footer;


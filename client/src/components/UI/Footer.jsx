import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "../../index.js";

const Footer = () => {
	return (
		<footer className="w-full bg-slate-50 text-gray-500/80 pt-16 border-t border-gray-200">
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10">
					{/* Brand & Social */}
					<div className="space-y-6">
						<Logo />

						<p className="text-sm leading-relaxed max-w-xs font-medium text-gray-600">
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
								<a
									key={index}
									href="#"
									aria-label={label}
									title={label}
									className="cursor-pointer text-gray-500 hover:text-primary transition-colors">
									<Icon className="w-5 h-5" />
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
							Quick Links
						</h3>
						<ul className="flex flex-col gap-3 text-sm font-medium">
							<li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
							<li><Link to="/cars" className="hover:text-primary transition-colors">Browse Cars</Link></li>
							<li><Link to="/owner" className="hover:text-primary transition-colors">List Your Car</Link></li>
							<li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
						</ul>
					</div>

					{/* Resources */}
					<div className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
							Resources
						</h3>
						<ul className="flex flex-col gap-3 text-sm font-medium">
							<li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
							<li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
							<li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
							<li><Link to="/insurance" className="hover:text-primary transition-colors">Insurance</Link></li>
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
							Contact
						</h3>
						<ul className="flex flex-col gap-3 text-sm font-medium">
							<li className="flex items-center gap-2">
								<MapPin size={16} className="text-primary" />
								<span>Jaipur, IN 302015</span>
							</li>
							<li className="flex items-center gap-2">
								<Mail size={16} className="text-primary" />
								<span>car@example.com</span>
							</li>
							<li className="flex items-center gap-2">
								<Phone size={16} className="text-primary" />
								<span>+91-7342162313</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<hr className="border-gray-200" />

				{/* Bottom Row */}
				<div className="flex flex-col md:flex-row gap-6 items-center justify-between py-8 text-[13px] font-medium">
					<p className="order-2 md:order-1 text-gray-400">
						© {new Date().getFullYear()} CarRental. All rights reserved.
					</p>

					<ul className="flex items-center gap-6 order-1 md:order-2">
						<li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
						<li className="text-gray-300">|</li>
						<li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
						<li className="text-gray-300">|</li>
						<li><Link to="/help" className="hover:text-primary transition-colors">Help</Link></li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

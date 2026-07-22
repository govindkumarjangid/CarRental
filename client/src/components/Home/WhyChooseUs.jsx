import { Title } from "../../index.js";
import { Car, ShieldCheck, MapPin, Clock } from "lucide-react";

const features = [
	{
		icon: Car,
		title: "Premium Cars",
		desc: "Handpicked fleet of top-tier luxury, sport, and electric vehicles maintained to mint condition.",
		badge: "Top Fleet"
	},
	{
		icon: ShieldCheck,
		title: "Fully Insured",
		desc: "Every rental comes with comprehensive zero-deductible insurance protection for total peace of mind.",
		badge: "100% Secure"
	},
	{
		icon: MapPin,
		title: "Multiple Locations",
		desc: "Seamless pick-up & drop-off available across 25+ major metro cities and international airports.",
		badge: "Nationwide"
	},
	{
		icon: Clock,
		title: "24/7 Support",
		desc: "Dedicated customer service concierge & instant roadside assistance available round the clock.",
		badge: "Always On"
	}
];

const WhyChooseUs = () => {
	return (
		<section className="w-full py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
			<div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
				<Title
					title="Why Choose Us"
					subTitle="Experience unmatched luxury, premium safety standards, and flawless service on every drive."
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 sm:mt-14">
					{features.map((item) => {
						const IconComponent = item.icon;
						return (
							<div
								key={item.title}
								className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-300 flex flex-col items-start group">

								<div className="absolute top-6 right-6 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
									{item.badge}
								</div>

								<div className="w-14 h-14 rounded-2xl bg-light text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
									<IconComponent size={28} />
								</div>

								<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
									{item.title}
								</h3>

								<p className="text-sm text-gray-600 leading-relaxed font-medium">
									{item.desc}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
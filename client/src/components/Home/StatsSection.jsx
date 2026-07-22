import { motion } from "motion/react";
import { Car, MapPin, CheckCircle, Star } from "lucide-react";

const stats = [
	{
		label: "Luxury Cars",
		value: "100+",
		icon: Car,
		desc: "Verified Fleet"
	},
	{
		label: "Cities Covered",
		value: "25+",
		icon: MapPin,
		desc: "Pan-India Presence"
	},
	{
		label: "Completed Bookings",
		value: "15K+",
		icon: CheckCircle,
		desc: "Happy Customers"
	},
	{
		label: "Average Rating",
		value: "4.9★",
		icon: Star,
		desc: "Based on 3,500+ Reviews"
	}
];

const StatsSection = () => {
	return (
		<section className="w-full py-16 bg-gradient-to-r from-gray-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
			<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
			<div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => {
						const IconComponent = stat.icon;
						return (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
								className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all group">
								<div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
									<IconComponent size={24} />
								</div>
								<div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-primary transition-colors">
									{stat.value}
								</div>
								<div className="text-base font-bold text-gray-200">
									{stat.label}
								</div>
								<div className="text-xs text-gray-400 mt-0.5">
									{stat.desc}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;

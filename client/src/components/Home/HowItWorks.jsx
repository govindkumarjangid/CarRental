import { motion } from "motion/react";
import { Title } from "../../index.js";
import { MapPin, Car, KeyRound } from "lucide-react";

const steps = [
	{
		number: "01",
		title: "1. Select Location",
		description: "Choose your pickup & drop-off city, date, and preferred time with a single tap.",
		icon: MapPin
	},
	{
		number: "02",
		title: "2. Choose Car",
		description: "Browse 100+ verified luxury, SUV, or electric models suited for your journey.",
		icon: Car
	},
	{
		number: "03",
		title: "3. Drive",
		description: "Unlock keyless access or take delivery at your doorstep and enjoy the drive.",
		icon: KeyRound
	}
];

const HowItWorks = () => {
	return (
		<section className="w-full py-24 bg-white border-t border-slate-100">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<Title
					title="How It Works"
					subTitle="Renting your dream luxury vehicle is fast, easy, and completely transparent in 3 simple steps."
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
					{steps.map((step, index) => {
						const IconComponent = step.icon;
						return (
							<motion.div
								key={step.number}
								initial={{ opacity: 0, y: 25 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.15 }}
								className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs hover:shadow-lg hover:border-primary/30 transition-all group">
								
								<div className="absolute top-4 right-6 text-4xl font-black text-slate-200 group-hover:text-primary/20 transition-colors">
									{step.number}
								</div>

								<div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all shadow-sm">
									<IconComponent size={30} />
								</div>

								<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
									{step.title}
								</h3>

								<p className="text-sm text-gray-600 font-medium leading-relaxed max-w-xs">
									{step.description}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;

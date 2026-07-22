import { motion } from "motion/react";

const brands = [
	{
		name: "Tesla",
		tag: "Electric Luxury",
		logo: "/svgs/tesla-logo.svg",
	},
	{
		name: "BMW",
		tag: "Sheer Driving Pleasure",
		logo: "/svgs/bmw-logo.svg",
	},
	{
		name: "Audi",
		tag: "Vorsprung durch Technik",
		logo: "/svgs/audi-logo.svg",
	},
	{
		name: "Mercedes-Benz",
		tag: "The Best or Nothing",
		logo: "/svgs/mercedes-benz-logo.svg",
	},
	{
		name: "Toyota",
		tag: "Unmatched Reliability",
		logo: "/svgs/toyota-logo.svg",
	},
	{
		name: "Honda",
		tag: "Power of Dreams",
		logo: "/svgs/honda-logo.svg",
	},
];
const BrandsSection = () => {
	return (
		<div className="w-full bg-white py-12 border-y border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<p className="text-center text-xs sm:text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8">
					Trusted by Drivers & Partnered with Top Luxury Brands
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
					{brands.map((brand, index) => (
						<motion.div
							key={brand.name}
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, delay: index * 0.05 }}
							whileHover={{ y: -4 }}
							className="flex flex-col items-center justify-center rounded-2xl bg-white  transition-all duration-300 group">
							<img
								src={brand.logo}
								alt={brand.name}
								className="h-30 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BrandsSection;

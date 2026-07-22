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
				<p className="text-center text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase mb-8">
					Trusted by Drivers & Partnered with Top Luxury Brands
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
					{brands.map((brand) => (
						<div
							key={brand.name}
							className="flex flex-col items-center justify-center rounded-2xl bg-white transition-all duration-300 group hover:-translate-y-1">
							<img
								src={brand.logo}
								alt={brand.name}
								className="h-24 sm:h-28 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BrandsSection;

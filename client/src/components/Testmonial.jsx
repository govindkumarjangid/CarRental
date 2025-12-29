import { useAppContext } from "../context/AppContext";

const Testmonial = () => {
	const { UserTitle, motion, useRef, setShowReview, showReview } =
		useAppContext();

	const testimonials = [
		{
			name: "Emma Rodriguez",
			address: "Barcelona, Spain",
			image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
			rating: 5,
			review: "Absolutely outstanding service! The team went above and beyond to ensure my experience was seamless, exceptional, and enjoyable. Highly recommend!",
		},
		{
			name: "Liam Johnson",
			address: "New York, USA",
			image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
			rating: 4,
			review: "Great experience overall. The staff was friendly, impressive, and attentive, and the quality of service exceeded my expectations. Will definitely return!",
		},
		{
			name: "Sophia Lee",
			address: "Seoul, South Korea",
			image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
			rating: 5,
			review: "A truly exceptional experience from start to finish. The attention to detail and personalized service made me feel valued and cared for. Highly recommend!",
		},
	];

	const ref = useRef(null);

	const Star = ({ filled }) => (
		<svg
			className="w-4 h-4 text-primary dark:text-main-bg"
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
			/>
		</svg>
	);
	return (
		<>
			<div className="max-w-8xl m-auto py-28 px-6 md:px-16 lg:px-24 xl:px-34  dark:bg-linear-to-r dark:from-main-bg dark:to-second-bg">
				<UserTitle
					title="What Our Customers Say"
					subTitle="Discover why discerning travelers choose StayVenture for their luxury accomodations around the world."
				/>

				<div className="flex justify-end">
					<button
						onClick={() => setShowReview(true)}
						className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer dark:text-gray-200"
					>
						Add Testimonial
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 place-items-center">
					{testimonials.map((testimonial, index) => (
						<motion.div
							ref={ref}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								duration: 0.5,
								delay: index * 0.2,
								type: "spring",
								stiffness: 100,
							}}
							key={index}
							className="bg-white p-6 rounded-xl shadow-lg hover:-translate-2 hover:shadow-2xl transition-all duration-300 dark:bg-second-bg dark:text-white dark:hover:shadow-gray-700"
						>
							<div className="flex items-center gap-3">
								<img
									className="w-12 h-12 rounded-full"
									src={testimonial.image}
									alt={testimonial.name}
								/>
								<div>
									<p className="text-xl dark:text-gray-400">
										{testimonial.name}
									</p>
									<p className="text-gray-500 dark:text-gray-400">
										{testimonial.address}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-1 mt-4">
								{Array(5)
									.fill(0)
									.map((_, index) => (
										<Star
											key={index}
											filled={testimonial.rating > index}
										/>
									))}
							</div>
							<p className="text-gray-500 max-w-90 mt-4 dark:text-gray-400">
								{testimonial.review}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</>
	);
};

export default Testmonial;

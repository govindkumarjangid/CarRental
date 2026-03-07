import { useAuthStore } from "../../store/useAuthStore.js";
import MarqueeRow from "./MarqueeRow.jsx";
import { iconList, Title } from "../../index.js";
import { useEffect } from "react";

const Testmonial = () => {
	const { reviews, setShowReview, fetchReviews } = useAuthStore();

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<div className="max-w-8xl m-auto py-28 px-6 md:px-16 lg:px-24">

			<Title
				title="What Our Customers Say"
				subTitle="Discover why discerning travelers choose StayVenture for their luxury accomodations around the world."
			/>

			{/* add review button  */}
			<div className="flex justify-end px-3 max-w-7xl m-auto">
				<button
					onClick={() => setShowReview(true)}
					className="flex group items-center justify-center gap-2 px-3 py-0.5 border-2 border-gray-500 text-gray-600 hover:bg-primary rounded-md mt-18 cursor-pointer hover:text-light hover:border-light active:scale-95 transition-all duration-300"
				>
					Add
					<iconList.Plus size={20} />
				</button>
			</div>

			{/* testimonial cards marquee  */}
			<section className="relative py-10 mt-10 w-full max-w-7xl overflow-hidden px-3 sm:px-6 mx-auto">
				<div className="absolute left-0 top-0 h-full w-10 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
				<div className="space-y-7">
					<MarqueeRow items={reviews} reverse={false} />
					<MarqueeRow items={reviews} reverse={true} />
				</div>
				<div className="absolute right-0 top-0 h-full w-10 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
			</section>

		</div>
	);
};
export default Testmonial;

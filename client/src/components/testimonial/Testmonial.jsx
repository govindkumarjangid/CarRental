import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import MarqueeRow from "./MarqueeRow.jsx";
import { Title } from "../../index.js";
import { Plus } from "lucide-react";

const defaultReviews = [
	{
		_id: "1",
		name: "Rahul Sharma",
		location: "Jaipur, Rajasthan",
		rating: 5,
		review: "Best rental service! Rented a BMW for my weekend trip to Udaipur. Flawless car condition and 2-minute instant pickup.",
	},
	{
		_id: "2",
		name: "Ananya Verma",
		location: "Mumbai, Maharashtra",
		rating: 5,
		review: "Extremely smooth booking process. The Tesla Model S was super clean and battery was fully charged. 10/10 experience!",
	},
	{
		_id: "3",
		name: "Vikram Malhotra",
		location: "Delhi NCR",
		rating: 5,
		review: "Prompt customer support and zero hidden costs. Rented an Audi A6 for business meetings. Will definitely book again.",
	},
	{
		_id: "4",
		name: "Priya Patel",
		location: "Ahmedabad, Gujarat",
		rating: 5,
		review: "Affordable luxury rates and door-step delivery. CarRental made our family road trip unforgettable!",
	}
];

const Testmonial = () => {
	const { reviews, setShowReview, fetchReviews } = useAuthStore();

	useEffect(() => {
		fetchReviews();
	}, []);

	const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;

	return (
		<div className="w-full py-24 bg-slate-50 border-t border-slate-100">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
					<div className="text-left w-full sm:w-auto">
						<Title
							title="Customer Reviews"
							subTitle="Read what our satisfied drivers have to say about their rental experience."
						/>
					</div>
					<button
						onClick={() => setShowReview(true)}
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold text-sm hover:border-primary hover:text-primary transition-all shadow-xs active:scale-98 cursor-pointer shrink-0">
						<Plus size={16} />
						<span>Write Review</span>
					</button>
				</div>

				{/* Testimonial Cards Marquee */}
				<section className="relative py-4 w-full overflow-hidden">
					<div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent" />
					<div className="space-y-6">
						<MarqueeRow items={displayReviews} reverse={false} />
						<MarqueeRow items={displayReviews} reverse={true} />
					</div>
					<div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent" />
				</section>
			</div>
		</div>
	);
};

export default Testmonial;
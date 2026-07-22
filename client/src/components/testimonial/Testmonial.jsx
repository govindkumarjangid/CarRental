import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import MarqueeRow from "./MarqueeRow.jsx";
import { Title } from "../../index.js";
import { Plus } from "lucide-react";

const Testmonial = () => {
	const { reviews, setShowReview, fetchReviews } = useAuthStore();

	useEffect(() => {
		fetchReviews();
	}, []);

	const displayReviews = reviews && reviews.length > 0 ? reviews : [];

	return (
		<div className="w-full py-24 bg-slate-50 border-t border-slate-100">
			<div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
				<Title
					title="Customer Reviews"
					subTitle="Read what our satisfied drivers have to say about their rental experience."
				/>
				<div className="flex items-center justify-center md:justify-end my-8">
					<button
						onClick={() => setShowReview(true)}
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold text-sm hover:border-primary hover:text-primary transition-all shadow-xs active:scale-98 cursor-pointer shrink-0">
						<Plus size={16} />
						<span>Write Review</span>
					</button>
				</div>



				{/* Testimonial Cards  */}
				<section className="relative py-4 w-full overflow-hidden">
					<div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-linear-to-r from-slate-50 to-transparent" />
					<div className="space-y-6">
						<MarqueeRow items={displayReviews} reverse={false} />
						<MarqueeRow items={displayReviews} reverse={true} />
					</div>
					<div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-linear-to-l from-slate-50 to-transparent" />
				</section>
			</div>
		</div>
	);
};

export default Testmonial;
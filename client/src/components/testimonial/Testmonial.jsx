import { useAppContext } from "../../context/AppContext";
import MarqueeRow from "./MarqueeRow";

const Testmonial = () => {
	const {
		UserTitle,
		setShowReview,
		toast,
		axios,
		useEffect,
		useState,
		iconList,
		setReviewLoading
	} = useAppContext();

	const [reviews, setReviews] = useState([]);

	const getReviews = async () => {
		setReviewLoading(true);
		try {
			const { data } = await axios.get("/api/user/get-reviews");
			if (data.success) {
				setReviews(data.reviews);
				setReviewLoading(false);
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		} finally {
			setReviewLoading(true);
		}
	};

	useEffect(() => {
		getReviews();
	}, []);

	return (
		<div className="max-w-8xl m-auto py-28 md:px-16 lg:px-24">
			<UserTitle
				title="What Our Customers Say"
				subTitle="Discover why discerning travelers choose StayVenture for their luxury accomodations around the world."
			/>

			<div className="flex justify-end">
				<button
					onClick={() => setShowReview(true)}
					className="flex group items-center justify-center gap-2 px-3 py-0.5 border-2 border-gray-500 text-gray-600 hover:bg-primary rounded-md mt-18 cursor-pointer hover:text-light hover:border-light active:scale-95 transition-all duration-300"
				>
					Add
					<iconList.Plus size={20} />
				</button>
			</div>

			{/* Auto scrolling marquee two rows */}
			<section className="relative space-y-8 py-20 mt-10 md:max-w-6xl m-auto overflow-hidden">
				<div className="absolute left-0 top-0 h-full w-2 md:w-10 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
				<div className="rotate-5">
					<MarqueeRow items={reviews} reverse={false} />
				</div>
				<div className="rotate-5">
					<MarqueeRow items={reviews} reverse={true} />
				</div>
				<div className="absolute right-0 top-0 h-full w-2 md:w-10 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
			</section>
		</div>
	);
};
export default Testmonial;

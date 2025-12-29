import { useAppContext } from "../context/AppContext";
import TestimonialCard from "./TestimonialCard";

const Testmonial = () => {
	const {
		UserTitle,
		motion,
		useRef,
		setShowReview,
		toast,
		axios,
		useEffect,
		useState,
		iconList,
	} = useAppContext();

	const [reviews, setReviews] = useState([]);

	const ref = useRef(null);

	const getReviews = async () => {
		try {
			const { data } = await axios.get("/api/user/get-reviews");
			if (data.success) {
				setReviews(data.reviews);
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getReviews();
	}, []);

	const reviewCount = Array.isArray(reviews) ? reviews.length : 0;
	const sliderRef = useRef(null);

	const scrollLeft = () => {
		sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
	};

	const scrollRight = () => {
		sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
	};

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
						Add <iconList.Plus size={25} />
					</button>
				</div>

				{reviewCount <= 3 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 place-items-center">
						{reviews.map((review, index) => (
							<TestimonialCard
								key={index}
								review={review}
								index={index}
								ref={ref}
							/>
						))}
					</div>
				)}

				{reviewCount > 3 && (
					<div className="relative mt-10">
						{/* Left button */}
						<button
							onClick={scrollLeft}
							className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:scale-105 transition cursor-pointer"
						>
							<iconList.ChevronLeft />
						</button>

						{/* Slider */}
						<div className="overflow-x-auto no-scrollbar">
							<div
								ref={sliderRef}
								className="flex gap-6 snap-x snap-mandatory overflow-x-auto p-4 scroll-smooth no-scrollbar"
							>
								{reviews.map((review, index) => (
									<div
										key={index}
										className="min-w-[90%] sm:min-w-[60%] lg:min-w-[33%] snap-center"
									>
										<TestimonialCard review={review} />
									</div>
								))}
							</div>
						</div>

						{/* Right button */}
						<button
							onClick={scrollRight}
							className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:scale-105 transition cursor-pointer"
						>
							<iconList.ChevronRight />
						</button>
					</div>
				)}
			</div>
		</>
	);
};
export default Testmonial;

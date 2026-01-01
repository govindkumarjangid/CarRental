import { useAppContext } from "../context/AppContext";
import TestimonialCard from "./TestimonialCard";
import TestimonialSkeleton from "./TestimonialSkeleton";

const Testmonial = () => {
	const {
		UserTitle,
		useRef,
		setShowReview,
		toast,
		axios,
		useEffect,
		useState,
		iconList,
		motion,
		useInView,
	} = useAppContext();

	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });


	const getReviews = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get("/api/user/get-reviews");
			if (data.success) {
				setReviews(data.reviews);
			}
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getReviews();
	}, []);

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
						className="flex group items-center justify-center gap-2 px-4 py-1 border-2 border-gray-500 text-gray-600 hover:bg-primary rounded-md mt-18 cursor-pointer hover:text-light hover:border-light dark:border-white dark:text-white dark:hover:bg-second-bg active:scale-95 transition-all duration-300"
					>
						Add <iconList.Plus size={20} className="group-hover:translate-x-2 transition-transform duration-400" />
					</button>
				</div>

				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
					animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="relative mt-10">
					{/* Left button */}
					<button
						onClick={scrollLeft}
						className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:scale-105 transition cursor-pointer"
					>
						<iconList.ChevronLeft />
					</button>

					{/* Slider */}
					<div>
						<div
							ref={sliderRef}
							className="flex gap-4 snap-x snap-mandatory overflow-x-auto px-6 py-10 scroll-smooth no-scrollbar "
						>
							{
								!loading ? (
									reviews.map((review, index) => (
										<div
											key={index}
											className="min-w-full sm:min-w-[50%] lg:min-w-[32.6%] snap-center"
										>
											<TestimonialCard review={review} />
										</div>
									))
								) : (
									[1, 2, 3].map(i => (
										<TestimonialSkeleton key={i} />
									))
								)
							}
						</div>
					</div>

					{/* Right button */}
					<button
						onClick={scrollRight}
						className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:scale-105 transition cursor-pointer"
					>
						<iconList.ChevronRight />
					</button>

				</motion.div>

			</div>
		</>
	);
};
export default Testmonial;

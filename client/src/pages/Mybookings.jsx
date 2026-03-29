import { useBookingStore } from "../store/useBookingStore.js";
import {
	useEffect, BookingCard,
	EmptyBookings,
	BookingCardSkeleton,
	Title, iconList,
	useState, motion
} from "../index.js"


const Mybookings = () => {

	const [visibleCount, setVisibleCount] = useState(3);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const currency = import.meta.env.VITE_CURRENCY;
	const { bookings: storedBookings, fetchUserBookings, bookingLoading } = useBookingStore();
	useEffect(() => {
		fetchUserBookings();
	}, []);

	const handleLoadMore = () => {
		setIsLoadingMore(true);
		setTimeout(() => {
			setVisibleCount(prev => prev + 3);
			setIsLoadingMore(false);
		}, 800);
	};

	return (
		<>
			<div className="max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-16 pb-15 text-sm dark:bg-main-bg dark:text-dark-text">
				<Title
					title="My Bookings"
					subTitle="View and manage all your car bookings"
					align="left"
				/>
				<div>
					{
						bookingLoading ? (
							<>
								{
									[0, 1, 2].map((_, index) => (
										<BookingCardSkeleton index={index} key={index} />
									))
								}
							</>
						) : (
							<>
								{
									storedBookings.length === 0 ? (
										<EmptyBookings />
									) : (storedBookings.slice(0, visibleCount).map((booking, index) => (
										<BookingCard
											key={booking._id}
											booking={booking}
											index={index}
											currency={currency}
										/>
									)))
								}
							</>
						)
					}
				</div>
			</div>

			{/* Load More Button Container */}
			{!bookingLoading && visibleCount < storedBookings.length && (
				<div className="flex justify-center mt-5 mb-5">
					<motion.button
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeIn" }}
						onClick={handleLoadMore}
						disabled={isLoadingMore}
						className={`flex group items-center justify-center gap-2 px-5 py-2 border-2  rounded-md mb-5 transition-all duration-300
								${isLoadingMore
								? 'border-gray-300 text-gray-600 cursor-wait'
								: 'border-gray-500 text-gray-600 hover:bg-primary cursor-pointer hover:text-light hover:border-light active:scale-95'
							}`}
					>
						{isLoadingMore ? (
							<>
								Loading...
								<iconList.Loader size={22} className="animate-spin" />
							</>
						) : (
							<>
								Load More
								<iconList.ArrowDown size={25} className="animate-bounce pt-2" />
							</>
						)}
					</motion.button>
				</div>
			)}
		</>
	);
};

export default Mybookings;
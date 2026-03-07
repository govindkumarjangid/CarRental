import { useBookingStore } from "../store/useBookingStore.js";
import {
	useEffect, BookingCard,
	EmptyBookings,
	BookingCardSkeleton, Title
} from "../index.js"


const Mybookings = () => {

	const currency = import.meta.env.VITE_CURRENCY;
	const { bookings: storedBookings, fetchUserBookings, bookingLoading } = useBookingStore();
	useEffect(() => {
		fetchUserBookings();
	}, []);


	return (
		<>
			<div className="max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-16 pb-16 text-sm dark:bg-main-bg dark:text-dark-text">
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
									) : (storedBookings.map((booking, index) => (
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
		</>
	);
};

export default Mybookings;
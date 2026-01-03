import BookingCard from "../components/booking/BookingCard.jsx";
import BookingCardSkeleton from "../components/booking/BookingCardSkeleton.jsx";
import EmptyBookings from "../components/booking/EmptyBookings.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Mybookings = () => {
	const {
		UserTitle,
		useEffect,
		useState,
		currency,
		axios,
		loading,
		setLoading,
		toast,
	} = useAppContext();

	const [bookings, setBookings] = useState([]);

	const fetchMyBooking = async () => {
		setLoading(true);
		try {
			const { data } = await axios.get("/api/bookings/user");
			if (data.success) setBookings(data.bookings);
		} catch (error) {
			console.log(error.message);
			toast.error("Something went wrong while fetching your bookings");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMyBooking();
	}, []);


	return (
		<>
			<div className="max-w-8xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-16 pb-16 text-sm dark:bg-linear-to-r dark:to-main-bg dark:from-second-bg ">
				<UserTitle
					title="My Bookings"
					subTitle="View and manage all your car bookings"
					align="left"
				/>
				<div>
					{
						loading ? (
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
									bookings.length === 0 ? (
										<EmptyBookings />
									) : (bookings.map((booking, index) => (
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

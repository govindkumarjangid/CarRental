import BookingCard from "../components/BookingCard.jsx";
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
		Loader,
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

	if (loading) return <Loader />;

	return (
		<>
			<div className="max-w-8xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-16 pb-16 text-sm dark:bg-linear-to-r dark:to-[#081c24] dark:from-[#334b57] ">
				<UserTitle
					title="My Bookings"
					subTitle="View and manage all your car bookings"
					align="left"
				/>

				<div>
					{bookings.map((booking, index) => (
						<BookingCard
							key={booking._id}
							booking={booking}
							index={index}
							currency={currency}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Mybookings;

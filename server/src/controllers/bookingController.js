import Booking from "../models/Booking.js";
import Car from '../models/Car.js'

//* check avaliablity
export const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate }
  });

  return bookings.length === 0;
};


export const checkAvaliablityofCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    console.log(location, pickupDate, returnDate)
    if (!location || !pickupDate || !returnDate) {
      return res.json({ success: false, message: 'All fields are required' });
    }
    const car = await Car.find({ location, isAvaliable: true });

    const avaliableCarsPromises = car.map(async (car) => {
      const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvaliable: isAvaliable }
    })

    let avaliableCars = await Promise.all(avaliableCarsPromises);
    avaliableCars = avaliableCars.filter(car => car.isAvaliable === true);
    res.json({ success: true, cars: avaliableCars });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* create booking

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    if (pickupDate === '' || returnDate === '') {
      return res.json({ success: false, message: "Please choose pickup and return dates" })
    }

    const isAvaliable = await checkAvailability(car, pickupDate, returnDate);

    if (!isAvaliable) {
      return res.json({ success: false, message: "Car is not avaliable" })
    }
    // console.log(car, pickupDate, returnDate)


    const carData = await Car.find(car);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const pricePerDay = Number(car.pricePerDay)
    const price = pricePerDay * noOfDays;

    // console.log(carData[0].brand, picked, returned, noOfDays, price, carData.owner, _id, pickupDate, returnDate)

    await Booking.create({ car, owner: carData[0].owner, user: _id, pickupDate, returnDate, price });
    res.json({ success: true, message: 'Booking successfully' })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* list user bookings

export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* list owner bookings

export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: 'Access denied' });
    }
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
    res.json({ success: true, bookings });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* change booking status

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: 'Access denied' });
    }
    // console.log(bookingId, status)

    booking.status = status;
    await booking.save();
    res.json({ success: true, message: 'Booking status updated' });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}
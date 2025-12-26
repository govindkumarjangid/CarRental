import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"

export const cityList = ['Jaipur', 'Udaipur', 'Kota', 'Mumbai', 'Delhi', 'Gurugram']   

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    upload_icon,
    user_profile,
}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add car", path: "/owner/add-car", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

// export const dummyUserData = {
//     "_id": "6847f7cab3d8daecdb517095",
//     "name": "Govind Jangid",
//     "email": "admin@example.com",
//     "role": "owner",
//     "image": user_profile,
// }

// export const dummyCarData = [
//     {
//         "_id": "67ff5bc069c03d4e45f30b77",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "BMW",
//         "model": "X5",
//         "image": car_image1,
//         "year": 2006,
//         "category": "SUV",
//         "seating_capacity": 4,
//         "fuel_type": "Hybrid",
//         "transmission": "Semi-Automatic",
//         "pricePerDay": 300,
//         "location": "New York",
//         "description": "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z",
//     },
//     {
//         "_id": "67ff6b758f1b3684286a2a65",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Toyota",
//         "model": "Corolla",
//         "image": car_image2,
//         "year": 2021,
//         "category": "Sedan",
//         "seating_capacity": 4,
//         "fuel_type": "Diesel",
//         "transmission": "Manual",
//         "pricePerDay": 130,
//         "location": "Chicago",
//         "description": "The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T08:33:57.993Z",
//     },
//     {
//         "_id": "67ff6b9f8f1b3684286a2a68",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Jeep ",
//         "model": "Wrangler",
//         "image": car_image3,
//         "year": 2023,
//         "category": "SUV",
//         "seating_capacity": 4,
//         "fuel_type": "Hybrid",
//         "transmission": "Automatic",
//         "pricePerDay": 200,
//         "location": "Los Angeles",
//         "description": "The Jeep Wrangler is a mid-size luxury SUV produced by Jeep. The Wrangler made its debut in 2003 as the first SUV ever produced by Jeep.",
//         "isAvaliable": false,
//         "createdAt": "2025-04-16T08:34:39.592Z",
//     },
//     {
//         "_id": "68009c93a3f5fc6338ea7e34",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Ford",
//         "model": "Neo 6",
//         "image": car_image4,
//         "year": 2022,
//         "category": "Sedan",
//         "seating_capacity": 2,
//         "fuel_type": "Diesel",
//         "transmission": "Semi-Automatic",
//         "pricePerDay": 209,
//         "location": "Houston",
//         "description": "This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-17T06:15:47.318Z",
//     },
//     {
//         "_id": "67ff5bc069c03d4e45f30c01",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Volvo",
//         "model": "XC90",
//         "image": car_image5,
//         "year": 2022,
//         "category": "SUV",
//         "seating_capacity": 7,
//         "fuel_type": "Hybrid",
//         "transmission": "Automatic",
//         "pricePerDay": 280,
//         "location": "California",
//         "description": "The Volvo XC90 is a luxury mid-size SUV known for premium comfort, advanced safety, and elegant Scandinavian design.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z"
//     },
//     {
//         "_id": "67ff5bc069c03d4e45f30c02",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Volvo",
//         "model": "S90",
//         "image": car_image6,
//         "year": 2020,
//         "category": "Sedan",
//         "seating_capacity": 5,
//         "fuel_type": "Petrol",
//         "transmission": "Automatic",
//         "pricePerDay": 220,
//         "location": "Chicago",
//         "description": "The Volvo S90 is a premium sedan offering comfort, luxury, and unmatched Volvo safety technology.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z"
//     },
//     {
//         "_id": "67ff5bc069c03d4e45f30c03",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Volvo",
//         "model": "XC60",
//         "image": car_image7,
//         "year": 2021,
//         "category": "SUV",
//         "seating_capacity": 5,
//         "fuel_type": "Diesel",
//         "transmission": "Automatic",
//         "pricePerDay": 240,
//         "location": "Miami",
//         "description": "The Volvo XC60 is a compact luxury SUV offering responsive performance and modern Scandinavian interior styling.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z"
//     },
//     {
//         "_id": "67ff5bc069c03d4e45f30c04",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Volvo",
//         "model": "V60",
//         "image": car_image8,
//         "year": 2019,
//         "category": "Wagon",
//         "seating_capacity": 5,
//         "fuel_type": "Hybrid",
//         "transmission": "Automatic",
//         "pricePerDay": 200,
//         "location": "Seattle",
//         "description": "The Volvo V60 is a stylish luxury wagon featuring advanced hybrid efficiency and excellent cargo versatility.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z"
//     },
//     {
//         "_id": "67ff5bc069c03d4e45f30c05",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Volvo",
//         "model": "C40 Recharge",
//         "image": car_image9,
//         "year": 2023,
//         "category": "EV",
//         "seating_capacity": 5,
//         "fuel_type": "Electric",
//         "transmission": "Automatic",
//         "pricePerDay": 260,
//         "location": "New York",
//         "description": "The Volvo C40 Recharge is Volvo’s fully electric compact SUV known for bold design, zero emissions, and impressive range.",
//         "isAvaliable": true,
//         "createdAt": "2025-04-16T07:26:56.215Z"
//     },
//     {
//         "_id": "67ff6ec969c03d4e45f30c01",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Tesla",
//         "model": "Model 3",
//         "image": car_image10,
//         "year": 2023,
//         "category": "EV",
//         "seating_capacity": 5,
//         "fuel_type": "Electric",
//         "transmission": "Semi-Automatic",
//         "pricePerDay": 250,
//         "location": "Jaipur",
//         "description": "The Tesla Model 3 offers long range, fast acceleration, and advanced autopilot features, making it perfect for clean and comfortable travel.",
//         "isAvaliable": true,
//         "createdAt": "2025-02-14T10:22:11.215Z"
//     },

//     {
//         "_id": "67ff6ff469c03d4e45f30c02",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Tata",
//         "model": "Nexon EV Max",
//         "image": car_image11,
//         "year": 2024,
//         "category": "EV",
//         "seating_capacity": 5,
//         "fuel_type": "Electric",
//         "transmission": "Automatic",
//         "pricePerDay": 150,
//         "location": "Jaipur",
//         "description": "The Tata Nexon EV Max is an efficient electric SUV offering excellent range, fast charging, and a smooth ride for city and highway travel.",
//         "isAvaliable": true,
//         "createdAt": "2025-03-01T08:45:31.215Z"
//     },

//     {
//         "_id": "67ff712a69c03d4e45f30c03",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "brand": "Hyundai",
//         "model": "Ioniq 5",
//         "image": car_image12,
//         "year": 2024,
//         "category": "EV",
//         "seating_capacity": 5,
//         "fuel_type": "Electric",
//         "transmission": "Automatic",
//         "pricePerDay": 280,
//         "location": "Jaipur",
//         "description": "The Hyundai Ioniq 5 is a futuristic EV with ultra-fast charging, premium interiors, and an impressive range — ideal for long drives around Rajasthan.",
//         "isAvaliable": true,
//         "createdAt": "2025-03-22T12:13:19.215Z"
//     }
// ];

// export const dummyMyBookingsData = [
//     {
//         "_id": "68482bcc98eb9722b7751f70",
//         "car": dummyCarData[0],
//         "user": "6847f7cab3d8daecdb517095",
//         "owner": "6847f7cab3d8daecdb517095",
//         "pickupDate": "2025-06-13T00:00:00.000Z",
//         "returnDate": "2025-06-14T00:00:00.000Z",
//         "status": "confirmed",
//         "price": 440,
//         "createdAt": "2025-06-10T12:57:48.244Z",
//     },
//     {
//         "_id": "68482bb598eb9722b7751f60",
//         "car": dummyCarData[1],
//         "user": "6847f7cab3d8daecdb517095",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "pickupDate": "2025-06-12T00:00:00.000Z",
//         "returnDate": "2025-06-12T00:00:00.000Z",
//         "status": "pending",
//         "price": 130,
//         "createdAt": "2025-06-10T12:57:25.613Z",
//     },
//     {
//         "_id": "684800fa0fb481c5cfd92e56",
//         "car": dummyCarData[2],
//         "user": "6847f7cab3d8daecdb517095",
//         "owner": "67fe3467ed8a8fe17d0ba6e2",
//         "pickupDate": "2025-06-11T00:00:00.000Z",
//         "returnDate": "2025-06-12T00:00:00.000Z",
//         "status": "pending",
//         "price": 600,
//         "createdAt": "2025-06-10T09:55:06.379Z",
//     },
//     {
//         "_id": "6847fe790fb481c5cfd92d94",
//         "car": dummyCarData[3],
//         "user": "6847f7cab3d8daecdb517095",
//         "owner": "6847f7cab3d8daecdb517095",
//         "pickupDate": "2025-06-11T00:00:00.000Z",
//         "returnDate": "2025-06-12T00:00:00.000Z",
//         "status": "confirmed",
//         "price": 440,
//         "createdAt": "2025-06-10T09:44:25.410Z",
//     }
// ]

// export const dummyDashboardData = {
//     "totalCars": 4,
//     "totalBookings": 2,
//     "pendingBookings": 0,
//     "completedBookings": 2,
//     "recentBookings": [
//         dummyMyBookingsData[0],
//         dummyMyBookingsData[1]
//     ],
//     "monthlyRevenue": 840
// }
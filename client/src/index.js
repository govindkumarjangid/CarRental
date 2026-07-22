import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import ProtectRoute from "./context/ProtectRoute.jsx";
import Hero from "./components/Home/Hero.jsx";
import FeaturedSection from "./components/Home/FeaturedSection.jsx";
import Banner from "./components/Home/Banner.jsx";
import Testmonial from "./components/testimonial/Testmonial.jsx";
import Newsletter from "./components/Home/Newsletter.jsx";
import CarCard from './components/car/CarCard.jsx';
import { Title } from './components/UI/Title.jsx';
import { iconList } from "./assets/assets.jsx";
import BookingCard from "./components/booking/BookingCard.jsx";
import EmptyBookings from "./components/booking/EmptyBookings.jsx";
import { Title as OwnerTitle } from "./components/owner/Title.jsx";
import OptimizedImage from "./components/UI/OptimizedImage.jsx";
import {
  CarCardSkeleton,
  BookingCardSkeleton,
  CarsPageSkeleton,
  DashboardSkeleton,
  FormSkeleton,
  TableSkeleton,
  UserTableSkeleton,
  CarDetailsPageSkeleton,
  HeroSkeleton,
  FeaturedSectionSkeleton,
  TestimonialSectionSkeleton,
  NewsletterSkeleton,
  LoginSkeleton,
  TestimonialFormSkeleton
} from "./components/skeletons";
import ResponsiveImage from "./components/UI/ResponsiveImage.jsx";
import IconButton from "./components/UI/IconButton.jsx";
import UserAvatar from "./components/UI/UserAvatar.jsx";
import AccordionItem from "./components/UI/AccordionItem.jsx";

import CarAvailablityModal from "./components/modals/CarAvailablityModal.jsx";

export {
  Navbar,
  Footer,
  ProtectRoute,
  Hero,
  FeaturedSection,
  Banner,
  Testmonial,
  Newsletter,
  CarCardSkeleton,
  CarCard,
  Title,
  BookingCard,
  EmptyBookings,
  BookingCardSkeleton,
  OwnerTitle,
  CarsPageSkeleton,
  DashboardSkeleton,
  FormSkeleton,
  TableSkeleton,
  UserTableSkeleton,
  CarDetailsPageSkeleton,
  HeroSkeleton,
  FeaturedSectionSkeleton,
  TestimonialSectionSkeleton,
  NewsletterSkeleton,
  LoginSkeleton,
  TestimonialFormSkeleton,
  OptimizedImage,
  ResponsiveImage,
  IconButton,
  UserAvatar,
  iconList,
  AccordionItem,
  CarAvailablityModal
}

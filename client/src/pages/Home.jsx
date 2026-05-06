import { lazy, Suspense } from "react";
import Hero from "../components/Home/Hero.jsx";
import FeaturedSection from "../components/Home/FeaturedSection.jsx";
import Testmonial from "../components/testimonial/Testmonial.jsx";
import Newsletter from "../components/Home/Newsletter.jsx";
import { ImportIcon } from "lucide-react";
import BannerSkeleton from "../components/Home/BannerSkeleton.jsx";

const Banner = lazy(() => import("../components/Home/Banner.jsx"));


const Home = () => {
	return (
		<>
			<Hero />
			<FeaturedSection />
			<Suspense fallback={<BannerSkeleton />}>
				<Banner />
			</Suspense>
			<Testmonial />
			<Newsletter />
		</>
	);
};

export default Home;

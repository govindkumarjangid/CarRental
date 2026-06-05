import { lazy, Suspense } from "react";
import Hero from "../components/Home/Hero.jsx";
import FeaturedSection from "../components/Home/FeaturedSection.jsx";
import { BannerSkeleton } from "../components/skeletons";

const Banner = lazy(() => import("../components/Home/Banner.jsx"));
const Testmonial = lazy(() => import("../components/testimonial/Testmonial.jsx"));
const Newsletter = lazy(() => import("../components/Home/Newsletter.jsx"));

const Home = () => {
	return (
		<>
			<Hero />
			<FeaturedSection />
			<Suspense fallback={<BannerSkeleton />}>
				<Banner />
			</Suspense>
			<Suspense fallback={<div className="h-64 w-full shimmer my-10" />}>
				<Testmonial />
			</Suspense>
			<Suspense fallback={<div className="h-48 w-full shimmer my-10" />}>
				<Newsletter />
			</Suspense>
		</>
	);
};

export default Home;



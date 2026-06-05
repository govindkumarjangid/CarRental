import { lazy, Suspense } from "react";
import Hero from "../components/Home/Hero.jsx";
import FeaturedSection from "../components/Home/FeaturedSection.jsx";
import { BannerSkeleton, TestimonialSectionSkeleton, NewsletterSkeleton } from "../components/skeletons";

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
			<Suspense fallback={<TestimonialSectionSkeleton />}>
				<Testmonial />
			</Suspense>
			<Suspense fallback={<NewsletterSkeleton />}>
				<Newsletter />
			</Suspense>
		</>
	);
};

export default Home;



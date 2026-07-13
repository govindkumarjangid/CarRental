import { lazy, Suspense } from "react";
import { HeroSkeleton, FeaturedSectionSkeleton, BannerSkeleton, TestimonialSectionSkeleton, NewsletterSkeleton } from "../components/skeletons";

const Hero = lazy(() => import("../components/Home/Hero.jsx"));
const FeaturedSection = lazy(() => import("../components/Home/FeaturedSection.jsx"));
const Banner = lazy(() => import("../components/Home/Banner.jsx"));
const Testmonial = lazy(() => import("../components/testimonial/Testmonial.jsx"));
const FAQSection = lazy(() => import("../components/Home/FAQSection.jsx"));
const Newsletter = lazy(() => import("../components/Home/Newsletter.jsx"));

const Home = () => {
	return (
		<>
			<Suspense fallback={<HeroSkeleton />}>
				<Hero />
			</Suspense>
			<Suspense fallback={<FeaturedSectionSkeleton />}>
				<FeaturedSection />
			</Suspense>
			<Suspense fallback={<BannerSkeleton />}>
				<Banner />
			</Suspense>
			<Suspense fallback={<TestimonialSectionSkeleton />}>
				<Testmonial />
			</Suspense>
			<Suspense fallback={null}>
				<FAQSection />
			</Suspense>
			<Suspense fallback={<NewsletterSkeleton />}>
				<Newsletter />
			</Suspense>
		</>
	);
};

export default Home;

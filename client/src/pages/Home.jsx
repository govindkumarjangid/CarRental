import { lazy, Suspense } from "react";
import { HeroSkeleton, FeaturedSectionSkeleton, BannerSkeleton, TestimonialSectionSkeleton, NewsletterSkeleton } from "../components/skeletons";

const Hero = lazy(() => import("../components/Home/Hero.jsx"));
const BrandsSection = lazy(() => import("../components/Home/BrandsSection.jsx"));
const FeaturedSection = lazy(() => import("../components/Home/FeaturedSection.jsx"));
const WhyChooseUs = lazy(() => import("../components/Home/WhyChooseUs.jsx"));
const HowItWorks = lazy(() => import("../components/Home/HowItWorks.jsx"));
const Testmonial = lazy(() => import("../components/testimonial/Testmonial.jsx"));
const StatsSection = lazy(() => import("../components/Home/StatsSection.jsx"));
const Banner = lazy(() => import("../components/Home/Banner.jsx"));
const FAQSection = lazy(() => import("../components/Home/FAQSection.jsx"));
const Newsletter = lazy(() => import("../components/Home/Newsletter.jsx"));

const Home = () => {
	return (
		<main className="w-full overflow-hidden bg-white">
			{/*  Hero Section  */}
			<Suspense fallback={<HeroSkeleton />}>
				<Hero />
			</Suspense>

			{/*  Popular Brands Section */}
			<Suspense fallback={<div className="h-24 bg-slate-50 animate-pulse" />}>
				<BrandsSection />
			</Suspense>

			{/* Featured Luxury Cars */}
			<Suspense fallback={<FeaturedSectionSkeleton />}>
				<FeaturedSection />
			</Suspense>

			{/* Why Choose Us */}
			<Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse" />}>
				<WhyChooseUs />
			</Suspense>

			{/* How It Works */}
			<Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
				<HowItWorks />
			</Suspense>

			{/* Customer Reviews */}
			<Suspense fallback={<TestimonialSectionSkeleton />}>
				<Testmonial />
			</Suspense>

			{/* Statistics Section */}
			<Suspense fallback={<div className="h-32 bg-gray-900 animate-pulse" />}>
				<StatsSection />
			</Suspense>

			{/* Owner Banner */}
			<Suspense fallback={<BannerSkeleton />}>
				<Banner />
			</Suspense>

			{/* FAQ Section */}
			<Suspense fallback={null}>
				<FAQSection />
			</Suspense>

			{/* Newsletter */}
			<Suspense fallback={<NewsletterSkeleton />}>
				<Newsletter />
			</Suspense>
		</main>
	);
};

export default Home;

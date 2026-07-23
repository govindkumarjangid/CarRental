import Hero from "../components/Home/Hero.jsx";
import BrandsSection from "../components/Home/BrandsSection.jsx";
import FeaturedSection from "../components/Home/FeaturedSection.jsx";
import WhyChooseUs from "../components/Home/WhyChooseUs.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import Testmonial from "../components/testimonial/Testmonial.jsx";
import StatsSection from "../components/Home/StatsSection.jsx";
import Banner from "../components/Home/Banner.jsx";
import FAQSection from "../components/Home/FAQSection.jsx";
import Newsletter from "../components/Home/Newsletter.jsx";

const Home = () => {
	return (
		<main className="w-full overflow-hidden bg-white">
			{/* Hero Section */}
			<Hero />

			{/* Popular Brands Section */}
			<BrandsSection />

			{/* Featured Luxury Cars */}
			<FeaturedSection />

			{/* Why Choose Us */}
			<WhyChooseUs />

			{/* How It Works */}
			<HowItWorks />

			{/* Customer Reviews */}
			<Testmonial />

			{/* Statistics Section */}
			<StatsSection />

			{/* Owner Banner */}
			<Banner />

			{/* FAQ Section */}
			<FAQSection />

			{/* Newsletter */}
			<Newsletter />
		</main>
	);
};

export default Home;

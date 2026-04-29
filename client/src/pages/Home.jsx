import Hero from "../components/Home/Hero.jsx";
import FeaturedSection from "../components/Home/FeaturedSection.jsx";
import Banner from "../components/Home/Banner.jsx";
import Testmonial from "../components/testimonial/Testmonial.jsx";
import Newsletter from "../components/Home/Newsletter.jsx";
const Home = () => {
	return (
		<>
			<Hero />
			<FeaturedSection />
			<Banner />
			<Testmonial />
			<Newsletter />
		</>
	);
};

export default Home;

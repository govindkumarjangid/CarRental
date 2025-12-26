import Hero from '../components/Hero.jsx';
import FeaturedSection from '../components/FeaturedSection.jsx';
import Banner from '../components/Banner.jsx';
import Testmonial from '../components/Testmonial.jsx';
import Newsletter from '../components/Newsletter.jsx';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testmonial />
      <Newsletter />
    </div>
  )
}

export default Home;
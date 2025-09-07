import HeroSection from "../../components/block/home/HeroSection";
import Category from "../../components/block/home/Category";
import HowTLworks from "../../components/block/home/HowTLworks";

import Readytosell from "../../components/block/home/Readytosell";
import Testimonials from "../../components/block/home/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Category />
      <HowTLworks />

      <Readytosell />
      <Testimonials />
    </div>
  );
};

export default Home;

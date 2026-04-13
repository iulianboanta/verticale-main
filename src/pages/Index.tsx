import Navbar from "@/components/ghidbeauty/Navbar";
import HeroSection from "@/components/ghidbeauty/HeroSection";
import CategoryGrid from "@/components/ghidbeauty/CategoryGrid";
import FeaturedListings from "@/components/ghidbeauty/FeaturedListings";
import CtaBanner from "@/components/ghidbeauty/CtaBanner";
import MostVisited from "@/components/ghidbeauty/MostVisited";
import AdBanner from "@/components/ghidbeauty/AdBanner";
import RecentlyAdded from "@/components/ghidbeauty/RecentlyAdded";
import BlogSection from "@/components/ghidbeauty/BlogSection";
import CountiesGrid from "@/components/ghidbeauty/CountiesGrid";
import Footer from "@/components/ghidbeauty/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <CategoryGrid />
      <FeaturedListings />
      <AdBanner />
      <CtaBanner variant="register" />
      <MostVisited />
      <CountiesGrid />
      <RecentlyAdded />
      <CtaBanner variant="upgrade" />
      <BlogSection />
    </main>
    <Footer />
  </div>
);

export default Index;

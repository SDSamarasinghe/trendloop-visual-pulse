import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundVideo from "./BackgroundVideo";
import AnimatedSection from "./AnimatedSection";

const Hero = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('services');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <BackgroundVideo 
        src="/videos/background-hero.mp4"
        poster="/images/hero-poster.jpg"
        overlayOpacity={0.4}
        className="z-0"
      />
      
      {/* Additional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 z-10"></div>
      <div className="absolute inset-0 video-overlay z-10"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2 
            }}
          >
            <span className="block text-gradient-brand">TRENDLOOP</span>
            <span className="block text-gradient-gold mt-2">VISUAL PULSE</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              ease: "easeOut" 
            }}
          >
            Transform Your Brand With 
            <span className="text-gradient-gold font-medium"> Powerful Visuals</span>
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: "easeOut" 
            }}
          >
            Stunning Visuals & Strategic Marketing Solutions
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.6,
              ease: "easeOut" 
            }}
          >
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-full btn-glow shadow-premium hover:shadow-glow transition-all duration-300"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group glass border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              View Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 2,
              ease: "easeOut" 
            }}
          >
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "100+", label: "Happy Clients" },
              { number: "5", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center glass-dark rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.2 + (index * 0.1),
                  ease: "easeOut" 
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 rounded-full p-2"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
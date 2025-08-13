import { useState, useEffect } from "react";
import { Instagram, Video, Building, Camera, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const services = [
    {
      icon: Instagram,
      title: "Social Media Branding & Short Reels",
      description: "Engage your audience with stunning social content and viral-worthy reels that drive results. Our creative team crafts compelling narratives that boost engagement and drive conversions across all social platforms.",
      backgroundImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: { projects: "500+", engagement: "300%" },
      features: ["Instagram Reels", "TikTok Content", "Brand Stories", "Social Strategy"]
    },
    {
      icon: Video,
      title: "Film & Music Videos",
      description: "Cinematic storytelling that captures emotions and creates lasting impressions for your brand. From concept to final cut, we deliver premium video content that resonates with your audience.",
      backgroundImage: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      stats: { projects: "200+", awards: "15+" },
      features: ["Music Videos", "Commercial Films", "Brand Stories", "Post Production"]
    },
    {
      icon: Building,
      title: "Corporate Videos & Documentaries",
      description: "Professional company profiles, documentaries, and event highlights that showcase your story with authenticity and impact. Perfect for corporate communications and brand building.",
      backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: { companies: "100+", satisfaction: "98%" },
      features: ["Corporate Profiles", "Training Videos", "Event Coverage", "Testimonials"]
    },
    {
      icon: Camera,
      title: "Event Photography",
      description: "Capture every special moment with our expert event photography services. From corporate events to celebrations, we preserve memories with artistic precision and professional quality.",
      backgroundImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      stats: { events: "300+", photos: "50K+" },
      features: ["Corporate Events", "Conferences", "Product Launches", "Social Events"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="services" className="relative overflow-hidden">
      {/* Section Header */}
      <div className="relative z-20 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our{" "}
            <span className="text-gradient-brand">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We create visuals that speak, stories that resonate, and content that converts.
            From social media magic to cinematic masterpieces.
          </motion.p>
        </div>
      </div>

      {/* Full-Width Slider */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${services[currentSlide].backgroundImage})` }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <motion.div
                    className="text-white space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {/* Service Icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange to-orange/80 rounded-2xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {(() => {
                        const IconComponent = services[currentSlide].icon;
                        return <IconComponent className="h-10 w-10 text-white" />;
                      })()}
                    </motion.div>

                    {/* Service Title */}
                    <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                      {services[currentSlide].title}
                    </h3>

                    {/* Description */}
                    <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                      {services[currentSlide].description}
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-orange">What We Offer:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {services[currentSlide].features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-orange rounded-full" />
                            <span className="text-white/80">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-orange to-black hover:from-orange/90 hover:to-black/90 text-white font-semibold px-8 py-4 rounded-full"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        View Portfolio
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Right Content - Stats */}
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(services[currentSlide].stats).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-3xl font-bold text-orange mb-2">{value}</div>
                          <div className="text-white/80 capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-6">
          {/* Auto-play Control */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
          >
            {isAutoPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-orange scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-orange to-black"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
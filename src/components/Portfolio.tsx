import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import LazyLoad from "./LazyLoad";
import portfolioSocial from "@/assets/portfolio-social.jpg";
import portfolioFilm from "@/assets/portfolio-film.jpg";
import portfolioCorporate from "@/assets/portfolio-corporate.jpg";
import portfolioPhotography from "@/assets/portfolio-photography.jpg";
import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioContent from "@/assets/portfolio-content.jpg";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const portfolioItems = [
    {
      id: 1,
      category: "social",
      title: "Social Media Campaign",
      image: portfolioSocial,
      type: "Social Media",
      description: "Viral content that drove 2M+ impressions"
    },
    {
      id: 2,
      category: "film",
      title: "Music Video Production",
      image: portfolioFilm,
      type: "Film & Music",
      description: "Award-winning cinematic storytelling"
    },
    {
      id: 3,
      category: "corporate",
      title: "Corporate Documentary",
      image: portfolioCorporate,
      type: "Corporate",
      description: "Professional brand storytelling"
    },
    {
      id: 4,
      category: "photography",
      title: "Event Photography",
      image: portfolioPhotography,
      type: "Photography",
      description: "Capturing unforgettable moments"
    },
    {
      id: 5,
      category: "social",
      title: "Brand Content Creation",
      image: portfolioBranding,
      type: "Branding",
      description: "Complete brand identity transformation"
    },
    {
      id: 6,
      category: "film",
      title: "Creative Content Studio",
      image: portfolioContent,
      type: "Content Creation",
      description: "High-impact visual content"
    }
  ];

  const filters = [
    { id: "all", label: "All Work" },
    { id: "social", label: "Social Media" },
    { id: "film", label: "Film & Video" },
    { id: "corporate", label: "Corporate" },
    { id: "photography", label: "Photography" }
  ];

  const filteredItems = activeFilter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--primary))_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our{" "}
            <span className="text-gradient-brand">Portfolio</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover our latest creative work and see how we transform brands 
            through powerful visual storytelling and strategic content creation.
          </motion.p>
          
          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {filters.map((filter, index) => (
              <motion.div
                key={filter.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`transition-all duration-300 px-6 py-2 rounded-full font-medium ${
                    activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-premium' 
                      : 'glass border-white/20 text-foreground hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
        
        {/* Portfolio Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${activeFilter}-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <LazyLoad
                  placeholder={
                    <div className="aspect-video bg-muted animate-pulse rounded-xl" />
                  }
                >
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 group-hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-premium">
                    {/* Image Container */}
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>

                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                </LazyLoad>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <AnimatedSection animation="fadeInUp" delay={0.8} className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-full btn-glow shadow-premium hover:shadow-glow transition-all duration-300">
              View Full Portfolio
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Portfolio;
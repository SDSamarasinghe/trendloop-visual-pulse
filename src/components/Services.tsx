import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Video, Building, Camera } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const Services = () => {
  const services = [
    {
      icon: Instagram,
      title: "Social Media Branding & Short Reels",
      description: "Engage your audience with stunning social content and viral-worthy reels that drive results.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Video,
      title: "Film & Music Videos",
      description: "Cinematic storytelling that captures emotions and creates lasting impressions for your brand.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Building,
      title: "Corporate Videos & Documentaries",
      description: "Professional company profiles, documentaries, and event highlights that showcase your story.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Camera,
      title: "Event Photography",
      description: "Capture every special moment with our expert event photography services.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary))_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--secondary))_0%,transparent_50%)]" />
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
            <span className="text-gradient-brand">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We create visuals that speak, stories that resonate, and content that converts.
            From social media magic to cinematic masterpieces.
          </motion.p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="group h-full hover:shadow-premium transition-all duration-500 border-border/50 hover:border-primary/50 glass-dark backdrop-blur-sm">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  {/* Icon Container */}
                  <motion.div 
                    className={`mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-gradient-brand transition-all duration-300 min-h-[3rem] flex items-center justify-center">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fadeInUp" delay={0.6} className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="group bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-full btn-glow shadow-premium hover:shadow-glow transition-all duration-300">
              <span className="flex items-center">
                Explore Our Portfolio
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
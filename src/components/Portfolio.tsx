import { useState } from "react";
import { Button } from "@/components/ui/button";
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
      type: "Social Media"
    },
    {
      id: 2,
      category: "film",
      title: "Music Video Production",
      image: portfolioFilm,
      type: "Film & Music"
    },
    {
      id: 3,
      category: "corporate",
      title: "Corporate Documentary",
      image: portfolioCorporate,
      type: "Corporate"
    },
    {
      id: 4,
      category: "photography",
      title: "Event Photography",
      image: portfolioPhotography,
      type: "Photography"
    },
    {
      id: 5,
      category: "social",
      title: "Brand Content Creation",
      image: portfolioBranding,
      type: "Branding"
    },
    {
      id: 6,
      category: "film",
      title: "Creative Content Studio",
      image: portfolioContent,
      type: "Content Creation"
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
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-pink">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our latest creative work and see how we bring brands to life.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "cta" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="transition-all duration-300"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg hover:shadow-glow transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-sm text-orange font-medium">{item.type}</span>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Video, Building, Camera } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Instagram,
      title: "Social Media Branding & Short Reels",
      description: "Engage your audience with stunning social content and viral-worthy reels that drive results."
    },
    {
      icon: Video,
      title: "Film & Music Videos",
      description: "Cinematic storytelling that captures emotions and creates lasting impressions for your brand."
    },
    {
      icon: Building,
      title: "Corporate Videos & Documentaries",
      description: "Professional company profiles, documentaries, and event highlights that showcase your story."
    },
    {
      icon: Camera,
      title: "Event Photography",
      description: "Capture every special moment with our expert event photography services."
    }
  ];

  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-orange">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We create visuals that speak, stories that resonate, and content that converts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-orange/50">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
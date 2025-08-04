import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              TrendLoop
            </h3>
            <p className="text-muted-foreground mb-4">
              Transforming brands with powerful visuals and strategic marketing.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                className="text-muted-foreground hover:text-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:hello@trendloop.agency" 
                className="text-muted-foreground hover:text-pink transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#services" className="hover:text-orange transition-colors">Social Media Branding</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Film & Music Videos</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Corporate Videos</a></li>
              <li><a href="#services" className="hover:text-orange transition-colors">Event Photography</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                hello@trendloop.agency
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 TrendLoop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
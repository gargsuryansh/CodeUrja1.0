import React from 'react';
import { Link } from "react-router-dom";
import { 
  Map, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Leaf,
  Users,
  FileText,
  Calculator
} from 'lucide-react';

const FooterSection = ({ title, children }) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ to, children }) => (
  <Link 
    to={to}
    className="block mb-2 text-gray-400 hover:text-green-500 transition-colors duration-200"
  >
    <div className="flex items-center">
      <ChevronRight className="h-4 w-4 mr-1" />
      {children}
    </div>
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection title="About LandPro">
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <Leaf className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-xl font-bold text-white">LandPro</span>
              </div>
              <p className="text-sm">
                Your trusted partner in land management solutions. We provide comprehensive 
                services for property development, land surveying, and environmental 
                assessment.
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <Map className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Building2 className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Calculator className="h-5 w-5" />
              </a>
            </div>
          </FooterSection>

          <FooterSection title="Services">
            <div className="space-y-2">
              <FooterLink to="/land-surveying">Land Surveying</FooterLink>
              <FooterLink to="/property-development">Property Development</FooterLink>
              <FooterLink to="/environmental-assessment">Environmental Assessment</FooterLink>
              <FooterLink to="/zoning-compliance">Zoning Compliance</FooterLink>
              <FooterLink to="/land-valuation">Land Valuation</FooterLink>
              <FooterLink to="/permits">Permits & Licenses</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Resources">
            <div className="space-y-2">
              <FooterLink to="/property-maps">Property Maps</FooterLink>
              <FooterLink to="/land-records">Land Records</FooterLink>
              <FooterLink to="/regulations">Land Regulations</FooterLink>
              <FooterLink to="/market-analysis">Market Analysis</FooterLink>
              <FooterLink to="/faqs">FAQs</FooterLink>
              <FooterLink to="/support">Support</FooterLink>
            </div>
          </FooterSection>

          <FooterSection title="Contact Us">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-500" />
                <a href="mailto:info@landpro.com" 
                   className="hover:text-green-500 transition-colors">
                  info@landpro.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                <a href="tel:+1234567890" 
                   className="hover:text-green-500 transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                <span>123 Land Management Ave, Suite 100<br />City, State 12345</span>
              </div>
            </div>
          </FooterSection>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Stay Updated with LandPro
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 bg-gray-800 rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-2 bg-green-600 text-white rounded-r hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {currentYear} LandPro. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

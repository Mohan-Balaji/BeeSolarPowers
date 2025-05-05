import React from "react";
import { Link } from "wouter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-secondary text-3xl">
                <i className="fas fa-solar-panel"></i>
              </span>
              <div>
                <h2 className="font-heading font-bold text-white text-xl">BEE SOLAR POWERS</h2>
                <p className="text-xs text-gray-300">Authorized Loom Solar Distributor</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium solar energy solutions. Powering homes and businesses with clean, renewable energy since 2018.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=solar-panels">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Solar Panels</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=inverters">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Inverters</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=batteries">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Batteries</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=complete-systems">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Complete Systems</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories">
                  <a className="text-gray-300 hover:text-white transition-colors duration-200">Accessories</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">123 Solar Street, Green Park, New Delhi, 110016, India</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">info@beesolarpower.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-secondary"></i>
                <span className="text-gray-300">Mon-Sat: 9AM to 6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BEE SOLAR POWERS. All rights reserved. | Authorized Distributor of Loom Solar Pvt Ltd</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const AboutSection: React.FC = () => {
  const stats = [
    { number: "500+", label: "Installations Completed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "5 Yr", label: "Installation Warranty" },
    { number: "24×7", label: "Customer Support" }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1611365892117-bce37392ba03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Solar Energy System" 
              className="rounded-lg shadow-xl max-w-full" 
              width="600" 
              height="400" 
            />
            <img 
              src="https://images.unsplash.com/photo-1545213156-0f5524058daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
              alt="Solar Technician" 
              className="absolute -bottom-8 -right-8 w-48 h-48 object-cover rounded-lg shadow-xl border-4 border-white hidden md:block" 
            />
            <div className="absolute -top-6 -left-6 bg-secondary text-primary p-4 rounded-lg shadow-lg font-heading font-bold text-xl md:text-2xl hidden md:block">
              Since 2018
            </div>
          </div>
          
          <div>
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              About BEE SOLAR POWERS
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">Your Trusted Partner in Solar Energy Solutions</h2>
            <p className="text-gray-600 mb-4">
              BEE SOLAR POWERS is a leading provider of solar energy solutions, dedicated to making renewable energy accessible to homes and businesses across the region.
            </p>
            <p className="text-gray-600 mb-6">
              As an authorized distributor of Loom Solar Pvt Ltd, we bring you the highest quality solar panels and systems with industry-leading performance and reliability. Our team of certified professionals is committed to delivering exceptional service from consultation to installation and beyond.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">{stat.number}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <Link href="/about">
              <Button className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

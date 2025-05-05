import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-r from-primary to-primary-light text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Harness the Power <span className="text-secondary">of the Sun</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Premium solar solutions for homes and businesses. Save money and contribute to a greener planet with BEE SOLAR POWERS.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact#quote">
                <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-6 py-3 h-auto">
                  Get a Free Quote
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className={cn(
                  "bg-white bg-opacity-10 hover:bg-opacity-20 border border-white",
                  "text-white font-semibold px-6 py-3 h-auto"
                )}>
                  Our Services
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1627585148143-a59b6fd5e56a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=36&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NTU5MjA1Mg&ixlib=rb-4.0.3&q=80&w=120" 
                alt="Loom Solar Logo" 
                className="h-9 mr-3 rounded" 
              />
              <span className="text-sm text-gray-200">Authorized Distributor of Loom Solar Pvt Ltd</span>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Solar Panel Installation" 
              className="rounded-lg shadow-xl max-w-full"
              width="600"
              height="400"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="text-primary bg-secondary rounded-full p-3 mr-3">
                  <i className="fas fa-bolt text-xl"></i>
                </div>
                <div>
                  <p className="text-primary font-bold">30% Energy Savings</p>
                  <p className="text-sm text-gray-600">Average for our customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

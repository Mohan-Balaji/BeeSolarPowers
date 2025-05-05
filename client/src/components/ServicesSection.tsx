import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: "fas fa-clipboard-list",
      title: "Consultation & Site Survey",
      description: "Professional assessment of your location, energy needs, and budget to design the optimal solar system.",
      features: [
        "Detailed solar potential analysis",
        "Energy consumption evaluation",
        "Custom system design and quotes"
      ]
    },
    {
      icon: "fas fa-tools",
      title: "Professional Installation",
      description: "Expert installation by certified technicians ensuring safety, performance, and reliability.",
      features: [
        "Certified installation team",
        "Proper mounting and wiring",
        "System testing and commissioning"
      ]
    },
    {
      icon: "fas fa-wrench",
      title: "Maintenance & Support",
      description: "Regular maintenance and prompt support to ensure your solar system operates at peak efficiency.",
      features: [
        "Scheduled maintenance visits",
        "Remote system monitoring",
        "24/7 technical support"
      ]
    },
    {
      icon: "fas fa-file-contract",
      title: "Documentation & Approvals",
      description: "Assistance with permits, utility interconnection, and incentive applications for a hassle-free experience.",
      features: [
        "Permit acquisition assistance",
        "Grid connection paperwork",
        "Subsidy application support"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
            Our Services
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Complete Solar Energy Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From consultation to installation and maintenance, we provide everything you need for your solar journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="md:w-1/3 bg-primary p-6 text-white flex justify-center items-center">
                <i className={`${service.icon} text-5xl`}></i>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="font-heading font-semibold text-xl mb-3 text-primary">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-gray-600 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3">
              Learn More About Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

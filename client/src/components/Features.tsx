import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: "fas fa-certificate",
      title: "Premium Quality",
      description: "Authorized distributor of Loom Solar, offering high-efficiency panels and systems."
    },
    {
      icon: "fas fa-tools",
      title: "Expert Installation",
      description: "Our certified technicians ensure proper setup and maximum energy production."
    },
    {
      icon: "fas fa-headset",
      title: "Dedicated Support",
      description: "Ongoing maintenance and support to keep your system running efficiently."
    },
    {
      icon: "fas fa-coins",
      title: "Cost Savings",
      description: "Significant reduction in electricity bills and attractive government incentives."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Why Choose BEE SOLAR POWERS?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">We provide end-to-end solar energy solutions with premium products, expert installation, and ongoing support.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="text-secondary text-4xl mb-4 inline-block">
                <i className={feature.icon}></i>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-primary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

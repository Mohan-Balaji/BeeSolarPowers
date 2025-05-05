import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Services: React.FC = () => {
  const services = [
    {
      id: "consultation",
      icon: "fas fa-clipboard-list",
      title: "Consultation & Site Survey",
      description: "Professional assessment of your location, energy needs, and budget to design the optimal solar system.",
      details: [
        "Comprehensive energy audit to understand your consumption patterns",
        "Detailed roof or site assessment to determine the best placement of panels",
        "Solar potential analysis using advanced software tools",
        "Financial analysis including ROI calculations and payback period estimation",
        "Custom system design with 3D modeling and visualization"
      ],
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      id: "installation",
      icon: "fas fa-tools",
      title: "Professional Installation",
      description: "Expert installation by certified technicians ensuring safety, performance, and reliability.",
      details: [
        "Installation by MNRE-certified solar professionals",
        "Adherence to international safety standards and best practices",
        "Quality mounting structures for secure panel attachment",
        "Professional electrical wiring with premium components",
        "Thorough testing and commissioning of the complete system"
      ],
      image: "https://images.unsplash.com/photo-1545213156-0f5524058daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "maintenance",
      icon: "fas fa-wrench",
      title: "Maintenance & Support",
      description: "Regular maintenance and prompt support to ensure your solar system operates at peak efficiency.",
      details: [
        "Scheduled preventive maintenance visits",
        "Panel cleaning and efficiency optimization",
        "Performance monitoring and reporting",
        "24/7 technical support for any system issues",
        "Emergency repair service with minimal downtime"
      ],
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      id: "documentation",
      icon: "fas fa-file-contract",
      title: "Documentation & Approvals",
      description: "Assistance with permits, utility interconnection, and incentive applications for a hassle-free experience.",
      details: [
        "Preparation and submission of all required permits and applications",
        "Liaison with local authorities and utility companies",
        "Assistance with net metering registration process",
        "Documentation for availing government subsidies and tax benefits",
        "Comprehensive handover documentation with warranties and certificates"
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    }
  ];

  const projectTypes = [
    {
      title: "Residential Solar",
      description: "Solar energy solutions for homes, reducing electricity bills and providing energy independence.",
      icon: "fas fa-home",
      features: [
        "Rooftop solar panel installation",
        "Battery storage options",
        "Smart monitoring systems",
        "Grid-tied and off-grid solutions"
      ],
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "Commercial Solar",
      description: "Help businesses reduce operational costs and meet sustainability goals with customized commercial solar installations.",
      icon: "fas fa-building",
      features: [
        "Large-scale rooftop systems",
        "Carport solar installations",
        "Building integrated photovoltaics",
        "Commercial energy storage"
      ],
      image: "https://images.unsplash.com/photo-1605980625600-88d8d6005b08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
    },
    {
      title: "Industrial Solar",
      description: "Power manufacturing facilities and industrial operations with high-capacity solar energy systems.",
      icon: "fas fa-industry",
      features: [
        "MW-scale installations",
        "Ground-mounted solar arrays",
        "High voltage systems",
        "Custom solutions for heavy power consumption"
      ],
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Solar Energy Services | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="Complete solar energy services from consultation to installation and maintenance. BEE SOLAR POWERS offers professional solar solutions for residential, commercial, and industrial clients." 
        />
        <meta 
          name="keywords" 
          content="solar services, solar installation, solar maintenance, solar consultation, commercial solar, residential solar" 
        />
        <link rel="canonical" href="/services" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-10 px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Services
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Complete Solar Energy Services
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              From consultation to installation and maintenance, we provide end-to-end solar energy solutions for homes and businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-6 py-3 h-auto" asChild>
                <a href="#services">Explore Services</a>
              </Button>
              <Button className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white text-white font-semibold px-6 py-3 h-auto" asChild>
                <a href="/contact#quote">Get a Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              What We Offer
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Our Comprehensive Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We take care of every aspect of your solar journey, providing expert guidance and professional execution at each step.
            </p>
          </div>
          
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'order-1 md:order-2' : ''}>
                  <div className="bg-secondary bg-opacity-20 text-primary text-4xl w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact#quote">
                    <Button className="bg-primary hover:bg-primary-light text-white font-semibold">
                      Inquire About This Service
                    </Button>
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'order-2 md:order-1' : ''}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-lg shadow-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Project Types
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Solar Solutions For Every Need</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide specialized solar installations for different property types and energy requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-secondary bg-opacity-20 text-primary text-xl w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <i className={project.icon}></i>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-primary">{project.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact#quote">
                    <Button className="w-full bg-primary hover:bg-primary-light text-white font-semibold">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Process
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">How We Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures a smooth experience from initial consultation to final installation.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-primary bg-opacity-20"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        1
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Initial Consultation</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Initial Consultation</h3>
                      <p className="text-gray-600">
                        We begin with a thorough discussion of your energy needs, goals, and budget. This helps us understand your requirements and expectations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        2
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Site Assessment</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Site Assessment</h3>
                      <p className="text-gray-600">
                        Our technicians conduct a detailed site survey to evaluate solar potential, roof condition, optimal panel placement, and electrical requirements.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        3
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Custom Design & Proposal</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Custom Design & Proposal</h3>
                      <p className="text-gray-600">
                        Based on our findings, we design a custom solar system and prepare a detailed proposal including system specifications, costs, savings, and ROI.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        4
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Approvals & Paperwork</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Approvals & Paperwork</h3>
                      <p className="text-gray-600">
                        We handle all necessary permits, applications, and documentation required for your solar installation, including utility interconnection.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        5
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Professional Installation</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Professional Installation</h3>
                      <p className="text-gray-600">
                        Our certified technicians perform the installation efficiently and safely, adhering to all quality standards and regulations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        6
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">System Activation & Monitoring</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">System Activation & Monitoring</h3>
                      <p className="text-gray-600">
                        We commission your system, provide training on monitoring tools, and ensure everything is functioning optimally before handover.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex items-center md:w-1/2 md:justify-end md:pr-8 z-10">
                      <div className="bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mr-4 md:mr-0">
                        7
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-primary md:hidden">Ongoing Support & Maintenance</h3>
                    </div>
                    
                    <div className="md:w-1/2 pl-16 md:pl-8 mt-2 md:mt-0">
                      <h3 className="font-heading font-semibold text-xl text-primary hidden md:block mb-3">Ongoing Support & Maintenance</h3>
                      <p className="text-gray-600">
                        We provide continued support with regular maintenance visits, performance monitoring, and responsive customer service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Customer Experiences
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from customers who have experienced our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-secondary text-xl">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The entire process from consultation to installation was smooth and professional. The team was knowledgeable and took time to explain everything. Our system has been running flawlessly for 6 months now."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Rajesh Sharma</h4>
                  <p className="text-gray-500 text-sm">Residential Customer, Delhi</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-secondary text-xl">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "BEE SOLAR POWERS installed a 25kW system for our manufacturing facility. Their expertise in handling commercial projects was evident. The system has reduced our electricity costs by 70% and the ROI is better than projected."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Priya Patel</h4>
                  <p className="text-gray-500 text-sm">Business Owner, Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-secondary text-xl">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "We were initially concerned about maintenance, but the team's ongoing support has been excellent. They proactively monitor our system performance and conduct regular maintenance checks. Very satisfied with the service."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Arun Verma</h4>
                  <p className="text-gray-500 text-sm">Apartment Complex, Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              FAQ
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">How long does a typical solar installation take?</h3>
              <p className="text-gray-600">
                The actual installation typically takes 1-3 days for residential systems and 1-2 weeks for commercial systems, depending on system size and complexity. However, the entire process including permits and approvals can take 4-8 weeks.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">What happens if there's an issue with my solar system?</h3>
              <p className="text-gray-600">
                We provide 24/7 support for all installed systems. In case of any issues, our monitoring system will alert us, and our technical team will address the problem promptly, either remotely or with an on-site visit as required.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Do you handle warranty claims for Loom Solar products?</h3>
              <p className="text-gray-600">
                Yes, as an authorized distributor, we handle all warranty claims for Loom Solar products. If any component is faulty or underperforming within the warranty period, we manage the entire claims process on your behalf.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">How often should solar panels be serviced?</h3>
              <p className="text-gray-600">
                We recommend a professional inspection and servicing once a year to ensure optimal performance. This includes checking electrical connections, mounting structures, and cleaning panels as needed. Regular cleaning may be required in dusty areas.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Can you help with government subsidies and incentives?</h3>
              <p className="text-gray-600">
                Absolutely. We help you navigate the paperwork for all applicable government subsidies, tax benefits, and incentives. Our team stays updated with the latest policies to ensure you receive all financial benefits you're eligible for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Ready to Switch to Solar?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            Get in touch with us today for a free consultation and discover how our services can help you harness the power of the sun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact#quote">
              <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-6 py-3 h-auto">
                Request a Free Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-white hover:bg-gray-100 text-primary font-bold px-6 py-3 h-auto">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

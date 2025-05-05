import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const About: React.FC = () => {
  const missionValues = [
    {
      title: "Our Mission",
      description: "To accelerate the transition to sustainable energy through accessible solar solutions that provide economic benefits to our customers and positive environmental impact."
    },
    {
      title: "Our Vision",
      description: "To become the leading provider of solar energy solutions in the region, known for quality, reliability, and exceptional customer service."
    },
    {
      title: "Our Values",
      points: [
        "Quality - We never compromise on the quality of our products and services",
        "Integrity - We operate with transparency and honesty in all interactions",
        "Innovation - We continuously seek new and better ways to serve our customers",
        "Sustainability - We are committed to environmental responsibility",
        "Customer-first - We prioritize customer satisfaction and long-term relationships"
      ]
    }
  ];

  const timeline = [
    { year: "2018", event: "Founded BEE SOLAR POWERS with a focus on residential installations" },
    { year: "2019", event: "Became authorized distributor of Loom Solar Pvt Ltd" },
    { year: "2020", event: "Expanded to commercial and industrial solar solutions" },
    { year: "2021", event: "Reached milestone of 300+ installations across the region" },
    { year: "2022", event: "Launched comprehensive maintenance and support services" },
    { year: "2023", event: "Expanded product range with latest solar technology" }
  ];

  const team = [
    {
      name: "Rajiv Kumar",
      position: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      bio: "With over 15 years of experience in renewable energy, Rajiv founded BEE SOLAR POWERS with a vision to make solar energy accessible to all."
    },
    {
      name: "Priya Sharma",
      position: "Technical Director",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
      bio: "Priya is a certified solar engineer with expertise in designing efficient solar systems for various applications."
    },
    {
      name: "Amit Patel",
      position: "Operations Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Amit ensures smooth execution of projects from consultation to installation and after-sales support."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="Learn about BEE SOLAR POWERS, your trusted partner in solar energy solutions and authorized distributor of Loom Solar products. Our mission, vision, and commitment to renewable energy." 
        />
        <meta 
          name="keywords" 
          content="about BEE SOLAR POWERS, solar company, solar energy provider, Loom Solar distributor, renewable energy company" 
        />
        <link rel="canonical" href="/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-10 px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Story
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              About BEE SOLAR POWERS
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Your trusted partner in solar energy solutions since 2018. As an authorized distributor of Loom Solar Pvt Ltd, we bring quality and reliability to every installation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
                Our Company
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
                Leading the Way in Solar Energy Solutions
              </h2>
              <p className="text-gray-600 mb-4">
                BEE SOLAR POWERS was founded in 2018 with a clear mission: to accelerate the transition to renewable energy by providing high-quality solar solutions that are accessible, reliable, and cost-effective.
              </p>
              <p className="text-gray-600 mb-6">
                As an authorized distributor of Loom Solar Pvt Ltd, we offer premium solar panels and complete energy systems backed by industry-leading warranties and performance guarantees. Our team of certified professionals brings expertise and attention to detail to every project, ensuring optimal system design and installation.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we are proud to have completed over 500 installations across residential, commercial, and industrial sectors, helping our customers reduce their carbon footprint while saving significantly on electricity costs.
              </p>
              
              <div className="flex space-x-4">
                <Link href="/services">
                  <Button className="bg-primary hover:bg-primary-light text-white font-semibold">
                    Our Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1611365892117-bce37392ba03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Solar Energy System" 
                className="rounded-lg shadow-md h-full object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Solar Panels" 
                className="rounded-lg shadow-md h-48 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1545213156-0f5524058daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Solar Installation" 
                className="rounded-lg shadow-md h-48 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1548075933-d9fc9cea6dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Solar Inverter" 
                className="rounded-lg shadow-md h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Foundation
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Mission, Vision & Values
            </h2>
            <p className="text-lg text-gray-600">
              Built on a solid foundation of principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {missionValues.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-heading font-bold text-2xl text-primary mb-4">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 mb-4">{item.description}</p>
                )}
                {item.points && (
                  <ul className="space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Journey
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Growing with the Solar Revolution
            </h2>
            <p className="text-lg text-gray-600">
              A look at our journey and key milestones since our founding.
            </p>
          </div>
          
          <div className="relative border-l-2 border-primary pl-8 ml-4 md:ml-0 md:mx-auto md:max-w-3xl">
            {timeline.map((item, index) => (
              <div key={index} className="mb-10 relative">
                <div className="absolute -left-[41px] bg-secondary rounded-full w-10 h-10 flex items-center justify-center border-4 border-white">
                  <span className="text-primary font-bold text-sm">{item.year.substring(2)}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="font-heading font-bold text-xl text-primary">{item.year}</div>
                  <p className="text-gray-600">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Leadership
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The experienced professionals leading BEE SOLAR POWERS forward.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-primary mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
                Why Choose Us
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
                The BEE SOLAR POWERS Advantage
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Authorized Loom Solar Distributor</h3>
                    <p className="text-gray-600">Access to premium solar products with manufacturer warranty and support.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Expert Consultation</h3>
                    <p className="text-gray-600">Personalized system design based on your specific energy needs and budget.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Quality Installation</h3>
                    <p className="text-gray-600">Certified technicians using best practices for safe, reliable, and efficient installation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Comprehensive Warranty</h3>
                    <p className="text-gray-600">Product warranties plus our own installation guarantee for complete peace of mind.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-check"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Ongoing Support</h3>
                    <p className="text-gray-600">Regular maintenance, monitoring, and prompt assistance whenever you need it.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1662964730487-42e7f347cf61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Solar Panel Installation" 
                className="rounded-lg shadow-xl"
              />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">500+</div>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">98%</div>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Ready to Switch to Solar Energy?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            Contact BEE SOLAR POWERS today for a free consultation and discover how we can help you harness the power of the sun for your energy needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100 font-bold px-6 py-3 h-auto">
                Contact Us
              </Button>
            </Link>
            <Link href="/contact#quote">
              <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-6 py-3 h-auto">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

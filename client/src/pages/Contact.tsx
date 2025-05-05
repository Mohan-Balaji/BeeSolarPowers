import React from "react";
import { Helmet } from "react-helmet-async";
import ContactSection from "@/components/ContactSection";
import QuoteForm from "@/components/QuoteForm";

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="Get in touch with BEE SOLAR POWERS for all your solar energy needs. Request a quote, ask questions, or schedule a consultation with our solar experts." 
        />
        <meta 
          name="keywords" 
          content="contact solar company, solar energy quote, solar consultation, solar installation inquiry" 
        />
        <link rel="canonical" href="/contact" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-10 px-4 py-2 rounded-full font-medium text-sm mb-4">
              Get In Touch
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Contact BEE SOLAR POWERS
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Have questions about solar solutions? Need a quote for your project? Our team is here to help you with all your solar energy needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <ContactSection />
      
      {/* Quote Form */}
      <QuoteForm />
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
              Quick Answers
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about contacting us and getting started.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">How quickly can I expect a response to my inquiry?</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 business hours. For urgent matters, please call our office directly.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">What information should I provide for an accurate quote?</h3>
              <p className="text-gray-600">
                To provide the most accurate quote, it helps if you can share your average monthly electricity bill, your location, available roof/space area, and any specific requirements you may have.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Do you offer site visits before providing a quote?</h3>
              <p className="text-gray-600">
                Yes, we always conduct a thorough site assessment before providing a final quote. The initial quote based on your information gives you a general idea, but the site visit helps us provide precise specifications and pricing.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Are there any charges for consultation or site assessment?</h3>
              <p className="text-gray-600">
                No, our initial consultations and site assessments are completely free of charge and come with no obligation.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">What areas do you service?</h3>
              <p className="text-gray-600">
                We currently service Delhi NCR, Mumbai, Bangalore, Chennai, Kolkata, and surrounding areas. Contact us to confirm if we cover your specific location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

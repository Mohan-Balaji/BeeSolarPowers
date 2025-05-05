import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import EnergyCalculator from "@/components/EnergyCalculator";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>BEE SOLAR POWERS | Authorized Distributor of Loom Solar Pvt Ltd</title>
        <meta 
          name="description" 
          content="BEE SOLAR POWERS - Your trusted partner for solar energy solutions. Authorized distributor of Loom Solar products. Installation, maintenance and solar energy systems for homes and businesses." 
        />
        <meta 
          name="keywords" 
          content="solar panels, solar energy, renewable energy, solar power, Loom Solar, clean energy, solar installation" 
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Hero />
      <Features />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <EnergyCalculator />
      <Testimonials />
      <QuoteForm />
    </>
  );
};

export default Home;

import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

// Helper to check if seed data already exists
async function hasData(table: any, columnName: string, value: any) {
  const result = await db.select().from(table).where(eq(table[columnName], value)).limit(1);
  return result.length > 0;
}

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Check if we have categories data
    const hasCategories = await db.select().from(schema.categories).limit(1);
    if (hasCategories.length === 0) {
      // Seed categories
      const categoryData = [
        { name: "Solar Panels", slug: "solar-panels" },
        { name: "Inverters", slug: "inverters" },
        { name: "Batteries", slug: "batteries" },
        { name: "Complete Systems", slug: "complete-systems" },
        { name: "Accessories", slug: "accessories" },
      ];

      console.log("Seeding categories...");
      await db.insert(schema.categories).values(categoryData);
    }

    // Seed products if needed
    const hasProducts = await db.select().from(schema.products).limit(1);
    if (hasProducts.length === 0) {
      // Seed products
      const productsData = [
        {
          name: "Loom Solar Shark 550W Mono Panel",
          description: "High-efficiency monocrystalline panel with anti-reflective coating for maximum energy production.",
          category: "Solar Panels",
          price: "24999.00",
          discountPrice: "27999.00",
          imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          rating: "4.9",
          featured: true,
        },
        {
          name: "Loom Solar 3kW Hybrid Inverter",
          description: "Smart hybrid inverter with grid and battery support, featuring 98.2% efficiency and Wi-Fi monitoring.",
          category: "Inverters",
          price: "38499.00",
          discountPrice: "41999.00",
          imageUrl: "https://images.unsplash.com/photo-1548075933-d9fc9cea6dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          rating: "4.8",
          featured: true,
        },
        {
          name: "Loom Solar Li-ion 5kWh Battery",
          description: "Long-life lithium-ion battery with 10-year warranty, 95% depth of discharge, and compact design.",
          category: "Batteries",
          price: "115999.00",
          discountPrice: "124999.00",
          imageUrl: "https://images.unsplash.com/photo-1584276433295-4b59fff8f591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          rating: "4.7",
          featured: true,
        },
        {
          name: "Loom Solar 10kW Commercial System",
          description: "Complete commercial solar power system with panels, inverter, and mounting hardware for businesses.",
          category: "Complete Systems",
          price: "750000.00",
          discountPrice: "790000.00",
          imageUrl: "https://images.unsplash.com/photo-1611365892117-bce37392ba03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          rating: "4.9",
          featured: false,
        },
        {
          name: "Loom Solar Mounting Structure Kit",
          description: "High-quality aluminum and stainless steel mounting kit for secure installation of solar panels.",
          category: "Accessories",
          price: "12999.00",
          discountPrice: "14999.00",
          imageUrl: "https://images.unsplash.com/photo-1545213156-0f5524058daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          rating: "4.6",
          featured: false,
        }
      ];

      console.log("Seeding products...");
      await db.insert(schema.products).values(productsData);
    }

    // Seed testimonials if needed
    const hasTestimonials = await db.select().from(schema.testimonials).limit(1);
    if (hasTestimonials.length === 0) {
      // Seed testimonials
      const testimonialsData = [
        {
          name: "Rajesh Sharma",
          location: "Delhi",
          role: "Homeowner",
          content: "The team at BEE SOLAR POWERS was professional from start to finish. They helped us choose the right system for our home, installed it efficiently, and the after-sales support has been excellent. Our electricity bills have reduced by almost 80%!",
          rating: 5,
          avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Priya Patel",
          location: "Mumbai",
          role: "Business Owner",
          content: "As a business owner, reducing operational costs is always a priority. The solar system installed by BEE SOLAR POWERS has significantly reduced our electricity expenses. The ROI has been better than expected. Highly recommend their services!",
          rating: 5,
          avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Arun Verma",
          location: "Bangalore",
          role: "Apartment Complex",
          content: "We were concerned about the initial investment, but the team at BEE SOLAR POWERS explained the long-term benefits and helped us understand the government incentives. The installation was quick and clean. We're now enjoying free electricity during daylight hours!",
          rating: 5,
          avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg",
        }
      ];

      console.log("Seeding testimonials...");
      await db.insert(schema.testimonials).values(testimonialsData);
    }

    // Seed settings if needed
    const hasSettings = await db.select().from(schema.settings).limit(1);
    if (hasSettings.length === 0) {
      // Seed settings
      const settingsData = [
        { key: "company_name", value: "BEE SOLAR POWERS" },
        { key: "company_tagline", value: "Authorized Distributor: Loom Solar Pvt Ltd" },
        { key: "company_address", value: "123 Solar Street, Green Park, New Delhi, 110016, India" },
        { key: "company_phone", value: "+91 98765 43210" },
        { key: "company_email", value: "info@beesolarpower.com" },
        { key: "company_hours", value: "Mon-Sat: 9AM to 6PM" },
        { key: "social_facebook", value: "#" },
        { key: "social_twitter", value: "#" },
        { key: "social_instagram", value: "#" },
        { key: "social_linkedin", value: "#" },
        { key: "social_youtube", value: "#" },
        { key: "map_location", value: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1623825593682!5m2!1sen!2sin" },
      ];

      console.log("Seeding settings...");
      await db.insert(schema.settings).values(settingsData);
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seed();

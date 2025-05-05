import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Product, Category } from "@shared/schema";
import ProductCard from "@/components/ProductCard";

const Products: React.FC = () => {
  const [location] = useLocation();
  const search = location.search;
  const urlParams = new URLSearchParams(typeof search === 'string' ? search : '');
  const categoryParam = urlParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || "all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', activeCategory],
    queryFn: async ({ queryKey }) => {
      const [_, category] = queryKey;
      const url = category && category !== "all" && typeof category === 'string'
        ? `/api/products?category=${encodeURIComponent(category)}` 
        : "/api/products";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  // Filter products based on search term
  useEffect(() => {
    if (!products) return;
    
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(typeof search === 'string' ? search : '');
    if (activeCategory && activeCategory !== "all") {
      params.set("category", activeCategory);
    } else {
      params.delete("category");
    }
    
    const newSearch = params.toString();
    const searchStr = newSearch ? `?${newSearch}` : "";
    
    // Update URL without navigating
    window.history.replaceState(null, "", `/products${searchStr}`);
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Solar Products | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="Browse our complete range of high-quality solar panels, inverters, batteries and accessories. Authorized distributor of Loom Solar products for residential and commercial applications." 
        />
        <meta 
          name="keywords" 
          content="solar products, solar panels, solar inverters, solar batteries, Loom Solar products, solar accessories" 
        />
        <link rel="canonical" href="/products" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white bg-opacity-10 px-4 py-2 rounded-full font-medium text-sm mb-4">
              Our Products
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Premium Solar Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Explore our range of high-quality solar products. As an authorized distributor of Loom Solar, we offer the latest and most efficient solar technology for your home or business.
            </p>
          </div>
        </div>
      </section>

      {/* Products Listing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="w-full md:w-auto">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                <Button
                  key="all"
                  variant={activeCategory === "all" ? "default" : "outline"}
                  className={
                    activeCategory === "all"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }
                  onClick={() => setActiveCategory("all")}
                >
                  All Products
                </Button>
                
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.name ? "default" : "outline"}
                    className={
                      activeCategory === category.name
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {isLoading ? (
            // Skeleton loader
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-5 w-24 mb-2" />
                        <Skeleton className="h-6 w-48 my-2" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-full mt-4 mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-10 w-24 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 text-gray-300">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
              <p className="text-gray-500">
                {searchTerm
                  ? `No products matching "${searchTerm}" in ${activeCategory === "all" ? "any category" : activeCategory}`
                  : `No products available in ${activeCategory}`}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
                Premium Quality
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-6">
                Why Choose Loom Solar Products?
              </h2>
              <p className="text-gray-600 mb-6">
                As an authorized distributor of Loom Solar Pvt Ltd, we offer you access to the highest quality solar products with industry-leading warranties and performance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-medal"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Superior Efficiency</h3>
                    <p className="text-gray-600">Loom Solar panels offer up to 21% efficiency rating, maximizing energy production even in low-light conditions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">IEC Certified</h3>
                    <p className="text-gray-600">All products meet international quality and safety standards with proper certifications.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Extended Warranty</h3>
                    <p className="text-gray-600">Enjoy peace of mind with 25-year performance warranty and 10-year product warranty on solar panels.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary rounded-full p-2 text-primary mt-1 mr-4">
                    <i className="fas fa-thumbs-up"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-1">Made in India</h3>
                    <p className="text-gray-600">Support local manufacturing with high-quality products made for Indian conditions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Loom Solar Panel" 
                className="rounded-lg shadow-md h-full object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1612969308146-066015efc293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Solar Panels Installation" 
                className="rounded-lg shadow-md h-48 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1629452532919-66992e47aef6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Solar Panel Closeup" 
                className="rounded-lg shadow-md h-48 object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1631281956016-3cdc1b23d1b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Solar Panel Installation" 
                className="rounded-lg shadow-md h-full object-cover" 
              />
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
              Get answers to common questions about our products.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">How do I choose the right solar panel system for my home?</h3>
              <p className="text-gray-600">
                Selecting the right system depends on your energy consumption, available roof space, budget, and location. Our experts will conduct a thorough assessment and recommend the optimal solution tailored to your specific needs.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">What is the difference between monocrystalline and polycrystalline panels?</h3>
              <p className="text-gray-600">
                Monocrystalline panels are made from single-crystal silicon, offering higher efficiency and a sleeker appearance but at a higher cost. Polycrystalline panels use multiple silicon fragments, providing good performance at a more affordable price point.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">How long do solar panels last?</h3>
              <p className="text-gray-600">
                Loom Solar panels come with a 25-year performance warranty and typically have a lifespan of 25-30 years. They will continue to generate electricity even after this period, though at a slightly reduced efficiency.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Do I need batteries with my solar system?</h3>
              <p className="text-gray-600">
                Batteries are optional and depend on your needs. Grid-tied systems without batteries feed excess power back to the grid, while battery storage allows you to store energy for use during nighttime or power outages.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-semibold text-primary mb-2">What maintenance do solar panels require?</h3>
              <p className="text-gray-600">
                Solar panels require minimal maintenance. Occasional cleaning to remove dust and debris is typically sufficient. We recommend a professional inspection once a year to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
            Ready to Invest in Solar?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            Our team is ready to help you choose the right solar products for your needs and budget. Get a free consultation and quote today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-secondary hover:bg-secondary-dark text-primary font-bold px-6 py-3 h-auto" asChild>
              <a href="/contact#quote">Get a Free Quote</a>
            </Button>
            <Button className="bg-white hover:bg-gray-100 text-primary font-bold px-6 py-3 h-auto" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;

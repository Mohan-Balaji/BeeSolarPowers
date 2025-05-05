import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, getStarRating } from "@/lib/utils.tsx";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  const filterButtons = [
    { id: "all", label: "All Products" },
    { id: "Solar Panels", label: "Solar Panels" },
    { id: "Inverters", label: "Inverters" },
    { id: "Batteries", label: "Batteries" },
    { id: "Complete Systems", label: "Complete Systems" },
    { id: "Accessories", label: "Accessories" },
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
            Our Products
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Premium Solar Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Authorized distributor of high-efficiency Loom Solar products for residential and commercial applications.
          </p>
        </div>
        
        {/* Product Categories */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              variant={activeCategory === button.id ? "default" : "outline"}
              className={
                activeCategory === button.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
              onClick={() => setActiveCategory(button.id)}
            >
              {button.label}
            </Button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loader for products
            Array(3).fill(0).map((_, i) => (
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
            ))
          ) : (
            products?.slice(0, 3).map((product) => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-secondary bg-opacity-20 text-primary text-xs font-semibold px-2.5 py-1 rounded">
                        {product.category}
                      </span>
                      <h3 className="font-heading font-semibold text-xl my-2">{product.name}</h3>
                    </div>
                    <div className="bg-white shadow-sm rounded-md p-2">
                      <div className="flex items-center">
                        <i className="fas fa-star text-secondary mr-1"></i> {product.rating?.toString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-heading font-bold text-primary text-xl">
                        {formatCurrency(product.price)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          {formatCurrency(product.discountPrice)}
                        </span>
                      )}
                    </div>
                    <Link href="/contact#quote">
                      <Button className="inline-flex items-center bg-primary hover:bg-primary-light text-white">
                        Inquire <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3">
              View All Products <i className="fas fa-arrow-right ml-1"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

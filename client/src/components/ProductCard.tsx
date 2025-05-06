import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatCurrency, getStarRating } from "@/lib/utils.tsx";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
              <i className="fas fa-star text-secondary mr-1"></i> 
              {product.rating ? parseFloat(product.rating.toString()).toFixed(1) : "N/A"}
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-medium text-primary">
              {product.name.split(' ')[2] || ''} {product.name.includes('kW') ? '' : 'kW'}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
              Available
            </span>
          </div>
          <Link href="/contact#quote">
            <Button className="inline-flex items-center bg-primary hover:bg-primary-light text-white">
              Inquire <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

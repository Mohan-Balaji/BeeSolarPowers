import React from "react";
import { Calculator, CalculatorResult } from "@/components/ui/calculator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const EnergyCalculator: React.FC = () => {
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  const handleRequestQuote = () => {
    navigate("/contact#quote");
  };

  const handleSaveResult = async (result: CalculatorResult) => {
    try {
      await apiRequest("POST", "/api/calculator", result);
      // No need to show a toast for successful saving as it's a background operation
    } catch (error) {
      console.error("Error saving calculator result:", error);
      // Also no need to notify the user of backend errors for this feature
    }
  };

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10">
          <div className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full font-medium text-sm mb-4">
            Calculate Your Savings
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">See How Much You Can Save with Solar</h2>
          <p className="text-lg text-gray-200 mb-6">
            Use our calculator to estimate your potential savings and return on investment. Enter your average monthly electricity bill to get started.
          </p>
        </div>
        
        <Calculator 
          onRequestQuote={handleRequestQuote} 
          onSaveResult={handleSaveResult} 
        />
      </div>
    </section>
  );
};

export default EnergyCalculator;

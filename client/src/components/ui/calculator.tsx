import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { calculateSolarSystem, formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface CalculatorProps {
  onRequestQuote?: () => void;
  onSaveResult?: (result: CalculatorResult) => void;
}

export interface CalculatorResult {
  monthlyBill: number;
  location: string;
  systemSize: number;
  systemCost: number;
  monthlySavings: number;
  annualSavings: number;
  roiPeriod: number;
}

export function Calculator({ onRequestQuote, onSaveResult }: CalculatorProps) {
  const [monthlyBill, setMonthlyBill] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [systemSize, setSystemSize] = useState<string>("3");
  const [customSize, setCustomSize] = useState<string>("");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [showCustomField, setShowCustomField] = useState<boolean>(false);

  // Handle system size change
  const handleSystemSizeChange = (value: string) => {
    setSystemSize(value);
    if (value === "custom") {
      setShowCustomField(true);
    } else {
      setShowCustomField(false);
    }
  };

  const handleCalculate = () => {
    if (!monthlyBill || !location || (systemSize === "custom" && !customSize)) return;

    setCalculating(true);
    
    // Get the kW value
    const kwSize = systemSize === "custom" 
      ? parseFloat(customSize) 
      : parseFloat(systemSize);
      
    // In a real app, this could be an API call
    setTimeout(() => {
      const calculationResult = calculateSolarSystem(
        parseFloat(monthlyBill), 
        location, 
        kwSize // Pass the selected or custom kW
      );
      
      const fullResult: CalculatorResult = {
        monthlyBill: parseFloat(monthlyBill),
        location,
        systemSize: calculationResult.systemSize,
        systemCost: calculationResult.systemCost,
        monthlySavings: calculationResult.monthlySavings,
        annualSavings: calculationResult.annualSavings,
        roiPeriod: calculationResult.roiPeriod
      };
      
      setResult(fullResult);
      
      if (onSaveResult) {
        onSaveResult(fullResult);
      }
      
      setCalculating(false);
    }, 500); // Simulate API delay
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="monthly-bill" className="text-gray-200 font-medium mb-2">
            Average Monthly Electricity Bill (₹)
          </Label>
          <Input
            id="monthly-bill"
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full p-3 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-gray-200 font-medium mb-2">
            Your Location
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location" className="w-full p-3 bg-white text-primary focus:ring-2 focus:ring-secondary h-12">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Kolkata">Kolkata</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="system-size" className="text-gray-200 font-medium mb-2">
            System Size (kW)
          </Label>
          <Select value={systemSize} onValueChange={handleSystemSizeChange}>
            <SelectTrigger id="system-size" className="w-full p-3 bg-white text-primary focus:ring-2 focus:ring-secondary h-12">
              <SelectValue placeholder="Select system size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 kW</SelectItem>
              <SelectItem value="2">2 kW</SelectItem>
              <SelectItem value="3">3 kW</SelectItem>
              <SelectItem value="4">4 kW</SelectItem>
              <SelectItem value="5">5 kW</SelectItem>
              <SelectItem value="custom">Custom Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {showCustomField && (
          <div>
            <Label htmlFor="custom-size" className="text-gray-200 font-medium mb-2">
              Enter Custom Size (kW)
            </Label>
            <Input
              id="custom-size"
              type="number"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder="e.g. 7.5"
              className="w-full p-3 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        )}
        
        <Button
          onClick={handleCalculate}
          disabled={!monthlyBill || !location || (systemSize === "custom" && !customSize) || calculating}
          className="w-full bg-secondary hover:bg-secondary-dark text-primary font-bold py-3 px-6 rounded-md transition-colors duration-200 h-12"
        >
          {calculating ? "Calculating..." : "Calculate Savings"}
        </Button>
      </div>
      
      {result ? (
        <Card className="bg-white shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-primary text-2xl text-center">Your Estimated Solar Savings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Selected System Size</p>
                <p className="font-heading font-bold text-primary text-2xl">{result.systemSize} kW</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Estimated System Cost</p>
                <p className="font-heading font-bold text-primary text-2xl">{formatCurrency(result.systemCost)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Monthly Savings</p>
                <p className="font-heading font-bold text-green-600 text-2xl">{formatCurrency(result.monthlySavings)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Annual Savings</p>
                <p className="font-heading font-bold text-green-600 text-2xl">{formatCurrency(result.annualSavings)}</p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Return on Investment Period</p>
              <p className="font-heading font-bold text-primary text-2xl">{result.roiPeriod} years</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <Progress className="bg-secondary h-2.5 rounded-full" value={(result.roiPeriod / 10) * 100} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-gray-600 mb-4 text-center">Get a detailed analysis and custom quote for your property</p>
            <Button 
              onClick={onRequestQuote} 
              className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              Request Detailed Quote
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-white shadow-xl rounded-lg hidden lg:block">
          <CardHeader>
            <CardTitle className="text-primary text-2xl text-center">Solar Savings Calculator</CardTitle>
            <CardDescription className="text-center">
              Enter your monthly electricity bill and location to see your potential savings with solar energy.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-secondary"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <p>Fill out the form to calculate your solar savings.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

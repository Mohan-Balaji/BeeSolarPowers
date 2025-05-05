import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  interested: z.string().min(1, "Please select what you're interested in"),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const QuoteForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      interested: "Residential Solar Installation",
      comments: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await apiRequest("POST", "/api/quote", data);
      
      if (response.ok) {
        toast({
          title: "Quote Request Submitted",
          description: "Thank you for your inquiry. Our team will get back to you shortly!",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the server. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="quote" className="py-16 bg-gradient-to-r from-primary to-primary-light text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Get Your Free Solar Consultation Today</h2>
            <p className="text-lg text-gray-200 mb-8">
              Fill out the form and our team will get back to you within 24 hours with a free consultation and quote tailored to your needs.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center">
                <i className="fas fa-check-circle text-secondary text-xl mr-3"></i>
                <span>No obligation quote</span>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center">
                <i className="fas fa-check-circle text-secondary text-xl mr-3"></i>
                <span>Expert advice</span>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center">
                <i className="fas fa-check-circle text-secondary text-xl mr-3"></i>
                <span>Custom solutions</span>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg flex items-center">
                <i className="fas fa-check-circle text-secondary text-xl mr-3"></i>
                <span>Fast response</span>
              </div>
            </div>
            
            <div className="flex items-center mb-8">
              <img 
                src="https://images.unsplash.com/photo-1627585148143-a59b6fd5e56a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=36&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NTU5MjA1Mg&ixlib=rb-4.0.3&q=80&w=120" 
                alt="Loom Solar Logo" 
                className="h-10 mr-4 rounded bg-white p-1" 
              />
              <span>Authorized Distributor of Loom Solar Pvt Ltd</span>
            </div>
          </div>
          
          <div className="bg-white shadow-xl rounded-lg p-6 text-primary">
            <h3 className="font-heading font-semibold text-xl mb-6 text-center">Request Your Free Quote</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">First Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Last Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Email Address *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="border border-gray-300 focus:ring-accent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">City</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Pincode</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="interested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">I'm interested in:</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-gray-300 focus:ring-accent">
                            <SelectValue placeholder="Select what you're interested in" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Residential Solar Installation">Residential Solar Installation</SelectItem>
                          <SelectItem value="Commercial Solar Installation">Commercial Solar Installation</SelectItem>
                          <SelectItem value="Industrial Solar Installation">Industrial Solar Installation</SelectItem>
                          <SelectItem value="Rooftop Solar Plant">Rooftop Solar Plant</SelectItem>
                          <SelectItem value="Ground-mounted Solar Plant">Ground-mounted Solar Plant</SelectItem>
                          <SelectItem value="Solar Products">Solar Products</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="border border-gray-300 focus:ring-accent h-24" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-secondary hover:bg-secondary-dark text-primary font-bold py-3 h-auto" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                
                <p className="text-gray-500 text-sm text-center">
                  By submitting, you agree to our <a href="#" className="text-accent hover:underline">privacy policy</a>.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;

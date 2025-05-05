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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
}

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon!",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the server. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Visit Us",
      details: [
        "123 Solar Street, Green Park",
        "New Delhi, 110016",
        "India"
      ]
    },
    {
      icon: "fas fa-phone-alt",
      title: "Call Us",
      details: [
        "+91 98765 43210",
        "+91 12345 67890",
        "Mon-Sat: 9AM to 6PM"
      ]
    },
    {
      icon: "fas fa-envelope",
      title: "Email Us",
      details: [
        "info@beesolarpower.com",
        "support@beesolarpower.com",
        "sales@beesolarpower.com"
      ]
    }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
            Contact Us
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">Get In Touch With Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about solar solutions? Our team is here to help you with any inquiries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-card">
              <div className="inline-block p-4 rounded-full bg-primary text-white text-2xl mb-4">
                <i className={info.icon}></i>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-primary">{info.title}</h3>
              <p className="text-gray-600">
                {info.details.map((detail, i) => (
                  <span key={i}>
                    {detail}
                    {i < info.details.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h3 className="font-heading font-semibold text-2xl mb-4 text-primary">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Your Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Subject</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-gray-300 focus:ring-accent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 text-sm font-medium">Your Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="border border-gray-300 focus:ring-accent h-32" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-3" 
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="h-full w-full min-h-[300px]">
              {/* Google Map Embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1623825593682!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="BEE SOLAR POWERS Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

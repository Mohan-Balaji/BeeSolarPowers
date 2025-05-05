import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStarRating } from "@/lib/utils.tsx";
import { Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSection: React.FC = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-accent bg-opacity-10 text-accent px-4 py-2 rounded-full font-medium text-sm mb-4">
            Testimonials
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from homeowners and businesses who have switched to solar with BEE SOLAR POWERS.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loader
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="testimonial-card">
                <Skeleton className="h-5 w-32 mb-4" />
                <Skeleton className="h-24 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="flex items-center mb-4">
                  <div className="text-secondary text-xl">
                    {getStarRating(testimonial.rating)}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.avatarUrl || "https://randomuser.me/api/portraits/lego/5.jpg"} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

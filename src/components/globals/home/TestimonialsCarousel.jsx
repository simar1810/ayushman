"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, User } from "lucide-react"
import { testimonials } from "@/config/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsCarousel() {
  return (
    <section className="py-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Happy Clients</h2>
              <p className="text-gray-600 text-lg">Our customers speak for us.</p>
            </div>
            <div className="flex justify-end mt-8 gap-2">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
              <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full">
                <Card className="bg-[#F7F9FB] border-0 shadow-none hover:shadow-none transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-2 mb-6">
                      <Avatar>
                        <AvatarImage src="/" />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-1">{testimonial.name}</h4>
                        <StarRating rating={testimonial.rating} />
                      </div>
                    </div>
                    <blockquote className="text-gray-600 text-base leading-relaxed">"{testimonial.text}"</blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  )
}
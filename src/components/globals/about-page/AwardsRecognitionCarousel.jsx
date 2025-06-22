"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { User } from "lucide-react"
import { coaches } from "@/config/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function AwardsRecognitionCarousel() {
  return <section className="py-16">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Awards and Recognitions</h2>
            <p className="text-gray-600 text-lg">Id nisl lacus penatibus bibendum vitae lectus et a. Lorem nulla nulla nulla faucibus amet feugiat ultricies. Posuere arcu enim.</p>
          </div>
          <div className="flex justify-end mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
            <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
          </div>
        </div>

        <CarouselContent className="-ml-2 md:-ml-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <CarouselItem key={item} className="pl-2 md:pl-4 basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/8 h-full">
              <Image
                src="/achievement.png"
                alt="Achievement"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  </section>
}
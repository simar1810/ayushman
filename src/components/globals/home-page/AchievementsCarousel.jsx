"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { User } from "lucide-react"
import { coaches } from "@/config/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function AchievementsCarousel() {
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
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Achievements</h2>
            <p className="text-gray-600 text-lg">Id nisl lacus penatibus bibendum vitae lectus et a. Lorem nulla nulla nulla faucibus amet feugiat ultricies. Posuere arcu enim.</p>
          </div>
          <div className="flex justify-end mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
            <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
          </div>
        </div>

        <CarouselContent className="-ml-2 md:-ml-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <CarouselItem key={item} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full">
              <div className="max-w-[400px] w-full mx-auto sm:max-w-[2000px] sm:mx-0 overflow-hidden hover:shadow-lg transition-shadow p-0 aspect-[9/10] relative rounded-[16px]">
                <Image
                  src="/achievement.png"
                  alt="Achievement"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bg-white w-[90%] p-4 rounded-[10px] bottom-6 left-1/2 translate-x-[-50%] z-[100]">
                  <h3 className="text-xl font-semibold mb-3">Title Goes Here</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  </section>
}
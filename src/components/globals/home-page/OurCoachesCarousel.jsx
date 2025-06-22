"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { User } from "lucide-react"
import { coaches } from "@/config/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OurCoachesCarousel() {
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
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Happy Clients</h2>
            <p className="text-gray-600 text-lg">Our customers speak for us.</p>
          </div>
          <div className="flex justify-end mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
            <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
          </div>
        </div>

        <CarouselContent className="-ml-2 md:-ml-4">
          {coaches.map((coach, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full">
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Avatar className="mx-auto w-[64px] h-[64px]">
                    <AvatarImage src="/" />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-2">{coach.name}</h3>
                  <p className="text-gray-600 mb-4">{coach.specialty}</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Available</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  </section>
}
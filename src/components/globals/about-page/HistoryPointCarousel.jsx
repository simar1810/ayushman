"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { User } from "lucide-react"
import { coaches } from "@/config/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function HistoryPointCarousel() {
  return <section className="bg-[#EFFBFF] py-16 md:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Health Point History</h2>
            <p className="text-gray-600 text-lg">Sometimes by accident, sometimes chunks as necessary making this the first true generator</p>
          </div>
          <div className="flex items-center mt-8 gap-2">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
            <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
          </div>
        </div>
        <div className="col-span-2">
          <CarouselContent className="-ml-2 md:-ml-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <CarouselItem key={item} className="max-h-[300px] pl-2 md:pl-4 basis-1/1 sm:basis-1/2 md:basis-1/3 h-full">
                <div className="bg-white rounded-[10px] aspect-square flex flex-col">
                  <div className="p-4">
                    <h3 className="text-[32px] md:text-[40px] text-[#6DB20D] font-bold mt-8">2016-2018</h3>
                    <p className="text-[#547593] text-[12px] md:text-[14px] leading-[1.2] mt-2">Normal distribution of letters, as opposed to using 'Content here, content here</p>
                  </div>
                  <Image
                    src="/health-point.png"
                    alt=""
                    height={200}
                    width={200}
                    className="w-full mt-auto h-[60px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  </section>
}
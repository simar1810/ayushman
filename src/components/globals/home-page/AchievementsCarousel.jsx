"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { User } from "lucide-react";
import { achievements, coaches } from "@/config/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function AchievementsCarousel() {
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
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Achievements
              </h2>
              <p className="text-gray-600 text-lg">
                Shaping India’s Wellness Revolution Over the past few years,
                we’ve created a ripple effect across the wellness
                industry—empowering individuals, training passionate coaches,
                and building a thriving franchise network. Our mission-driven
                model has helped transform lives through sustainable nutrition,
                mental well-being, and accessible wellness coaching. Every award
                and milestone is a reflection of the trust, dedication, and
                impact we’ve created together.
              </p>
            </div>
            <div className="flex justify-end mt-8 gap-2">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0" />
              <CarouselNext className="static translate-y-0 h-12 w-12 bg-green-500 hover:bg-green-600 border-0 text-white" />
            </div>
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {achievements.map((achievement, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 h-full"
              >
                <div className="max-w-[400px] w-full mx-auto sm:max-w-[2000px] sm:mx-0 overflow-hidden hover:shadow-lg transition-shadow p-0 aspect-[9/10] relative rounded-[16px]">
                  <Image
                    src="/achievement.png"
                    alt="Achievement"
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bg-white w-[90%] p-4 rounded-[10px] bottom-6 left-1/2 translate-x-[-50%] z-[100]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <h3 className="text-xl font-semibold">
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
}

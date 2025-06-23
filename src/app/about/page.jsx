import AwardsRecognitionCarousel from "@/components/globals/about-page/AwardsRecognitionCarousel";
import HistoryPointCarousel from "@/components/globals/about-page/HistoryPointCarousel";
import PageHeader from "@/components/globals/core/PageHeader";
import RegistrationForm from "@/components/globals/core/RegistrationForm";
import AchievementsCarousel from "@/components/globals/home-page/AchievementsCarousel";
import Faqs from "@/components/globals/home-page/Faqs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Dot } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <PageHeader title="About" description="" />
      <div className="max-w-7xl px-4 py-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/service-logo.svg"
              height={100}
              width={100}
              alt=""
              className="h-4 w-4 object-contain"
            />
            <p className="font-semibold">About Us</p>
          </div>
          <h4 className="text-[28px] md:text-[48px] leading-[1.2] font-bold mt-4 mb-10">
            Transforming Lives Through Care
          </h4>
          <p className="text-[#909090] text-[14px] mb-9">
            Wellness is more than food or fitness. It’s about care—care for the
            body, mind, and spirit. We’ve created a system where expert coaches,
            proven systems, and empathetic service come together to help people
            take charge of their well-being and income.
          </p>

          <div className="flex flex-col sm:flex-row border-[1px] border-[#E2E2E2] rounded-[10px]">
            <Image
              alt=""
              className="min-h-[240px] w-full md:w-[200px] object-cover rounded-[10px]"
              height={200}
              width={200}
              src="/coach-about.png"
            />
            <div className="p-4">
              <p className="text-[20px] text-[#222222] my-4">
                Welcome Message from Our CEO
              </p>
              <p className="text-[#909090] leading-[1.2] text-[14px]">
                "We started with one goal: to help people live better and earn
                better. Today, our coaches are doing just that—impacting health
                and creating financial freedom through purpose-driven business."
                — Joseph Dondelion CEO, Ayuman Health Solutions
              </p>
              <p className="text-[14px] mt-4">Joseph Doolenan</p>
              <p className="text-[14px] text-[#6DB20D] mt-2">
                CEO, Ayushman Health Solutions
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="py-4 px-4 bg-[#F0FFD9] rounded-[10px] mb-4">
            <h2 className="font-bold">Our Mission</h2>
          </div>
          <div className="pl-10">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src="/service-logo.svg"
                  height={100}
                  width={100}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                <h4 className="font-bold">Promoting Mental Wellness</h4>
              </div>
              <p className="text-[14px] text-[#909090] mt-2 leading-[1.3]">
                We go beyond diets—our programs integrate mindfulness, stress
                relief, and habit-building tools that empower our clients to
                create true, lasting change.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/service-logo.svg"
                  height={100}
                  width={100}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                <h4 className="font-bold">Empowering Individuals</h4>
              </div>
              <p className="text-[14px] text-[#909090] mt-2 leading-[1.3]">
                From homemakers to professionals, we equip individuals with
                coaching, tools, and business models to turn their passion for
                health into a powerful income stream.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/service-logo.svg"
                  height={100}
                  width={100}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                <h4 className="font-bold">Supporting Personal Growth</h4>
              </div>
              <p className="text-[14px] text-[#909090] mt-2 leading-[1.3]">
                We believe personal well-being and financial independence go
                hand in hand. Our systems support both transformation and
                entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-[#EF8C6B]/10">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-[600px] mx-auto lg:mr-0 lg:ml-auto py-4 pl-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                List Your Wellness Center
              </h1>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                We’re actively onboarding qualified professionals and new
                centers.
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Get discovered in your area</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Fill last-minute appointments</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    Strengthen your digital presence
                  </p>
                </div>
              </div>
              <Button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
                Read More
              </Button>
            </div>
            <div>
              <Image
                src="/about.png"
                alt="Happy patient"
                width={500}
                height={400}
                className="w-full max-h-[400px] rounded-l-2xl object-cover object-left"
              />
            </div>
          </div>
        </div>
      </section>
      <HistoryPointCarousel />
      <AchievementsCarousel />
      <AwardsRecognitionCarousel />
      <div className="max-w-7xl mx-auto px-4 py-5 mt-10">
        <h3 className="text-[28px] md:text-[40px] font-bold leading-[1]">
          Register Now
        </h3>
        <p className="">Our customers speak for us.</p>
      </div>
      <RegistrationForm />
      <Faqs />
    </main>
  );
}

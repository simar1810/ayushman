import { ImWhatsapp } from "react-icons/im";
import AchievementsCarousel from "@/components/globals/home-page/AchievementsCarousel";
import Faqs from "@/components/globals/home-page/Faqs";
import OurCoachesCarousel from "@/components/globals/home-page/OurCoachesCarousel";
import TestimonialsCarousel from "@/components/globals/home-page/TestimonialsCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/config/data";
import {
  Calendar,
  CheckCircle,
  Dot,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Twitter,
  User,
  Users,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/globals/core/RegistrationForm";
import GoogleTranslate from "@/components/googletranslator";

export default function Home() {
  return (
    <main>
      <div className="bg-[]">
        <div className="bg-[#FFFFF6]">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col md:flex-row items-center gap-10">
            <div>
              <h3 className="text-[40px] md:text-[72px] font-bold leading-[1.1]">
                We Care AboutYour Health
              </h3>
              <p className="text-[24px] md:text-[40px] text-[#6DB20D]">
                Health care solutions
              </p>
              <p className="max-w-[40ch] text-[#5E6883] text-[16px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy{" "}
              </p>
            </div>
            <Image
              src="/hero.png"
              height={720}
              width={720}
              alt=""
              className="max-h-[450px] sm:max-h-[550px] lg:max-h-[650px] object-contain"
            />
            <div className="w-[80%] md:w-full left-1/2 translate-x-[-50%] absolute flex items-center justify-between bottom-0 md:bottom-6 md:left-0 md:translate-x-0 rounded-full">
              <div className="bg-white grid grid-cols-2 md:grid-cols-4 items-center divide-x-2 divide-gray-100 gap-4 py-3 px-8 rounded-md md:rounded-full border-1 shadow-lg">
                <div className="md:px-2 lg:px-4">
                  <p className="text-[#6DB20D] font-bold">Treatment</p>
                  <p>Dental Care</p>
                </div>
                <div className="md:px-2 lg:px-4">
                  <p className="text-[#6DB20D] font-bold">Location</p>
                  <p>Kanpur, U.P.</p>
                </div>
                <div className="md:px-2 lg:px-4">
                  <p className="text-[#6DB20D] font-bold">Clinic name</p>
                  <p>Shiva Clinic Center</p>
                </div>
                <Button className="bg-[#6DB20D] hover:bg-[#6DB20D] rounded-full">
                  Search Now
                </Button>
              </div>
              <Image
                src="/wp-logo.png"
                height={100}
                width={100}
                alt=""
                className="w-[56px] h-[56px] object-cover mr-10 hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="max-w-xl text-center md:text-left text-3xl font-bold text-gray-900 mb-4">
              India's leading healthcare search & booking service
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Users className="h-8 w-8 text-[#67C6A1]" />
                <div className="text-4xl font-bold text-[#67C6A1]">4,200</div>
              </div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Heart className="h-8 w-8 text-[#EF8C6B]" />
                <div className="text-4xl font-bold text-[#EF8C6B]">12M</div>
              </div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Calendar className="h-8 w-8 text-[#4397F8]" />
                <div className="text-4xl font-bold text-[#4397F8]">6,887</div>
              </div>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="max-w-[20ch] text-[32px] md:text-[48px] leading-[1.2] text-center md:text-left font-bold text-gray-900 mb-4">
              Holistic Mental Health Solutions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white hover:bg-[#F0FFD9] transition-shadow p-"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Image
                      src="/service-logo.svg"
                      height={100}
                      width={100}
                      alt=""
                      className="h-16 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <AchievementsCarousel />
      <section className="bg-[#EF8C6B]/10">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-[600px] mx-auto lg:mr-0 lg:ml-auto py-4 pl-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Id nisl lacus posuere accumsan pretium, bibendum
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Quick pain-reducing treatment</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    Professional medical consultation
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
      <TestimonialsCarousel />
      <RegistrationForm />
      <OurCoachesCarousel />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Coaches
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"></div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Receive health & wellness updates and tips right to your inbox
            </p>
            <Button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <Faqs />
    </main>
  );
}

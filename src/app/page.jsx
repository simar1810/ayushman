"use client";
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
import { useRef, useState } from "react";
import Popupmodal from "@/components/PopupModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <main>
      <div className="bg-[]">
        <div className="bg-[#FFFFF6]">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col md:flex-row items-center gap-10">
            <div>
              <h3 className="text-[40px] md:text-[72px] font-bold leading-[1.1]">
                We Care About Your Wellness
              </h3>
              <p className="text-[24px] md:text-[40px] text-[#6DB20D]">
                Make Your Health Your Priority
              </p>
              <p className="max-w-[40ch] text-[#5E6883] text-[16px]">
                Nutrition & Lifestyle Solutions That Work We empower individuals
                to transform their health with personalized nutrition, wellness
                coaching, and holistic lifestyle programs. Whether you’re
                looking to improve your own health or build a career in
                wellness, we’ve got the tools, training, and support you need.
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
              <div className="bg-white flex items-center  rounded-full transition-transform duration-300 hover:shadow-xl hover:scale-105">
                <Button
                  className="bg-[#6DB20D] hover:bg-[#5a9c0b] text-white font-semibold py-6 px-10 rounded-full transition-colors duration-200"
                  onClick={handleOpenModal}
                >
                  Register Now
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
              India's leading Wellness Diet Plan Center
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Users className="h-8 w-8 text-[#67C6A1]" />
                <div className="text-4xl font-bold text-[#67C6A1]">10,000</div>
              </div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Heart className="h-8 w-8 text-[#EF8C6B]" />
                <div className="text-4xl font-bold text-[#EF8C6B]">9999+</div>
              </div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <Calendar className="h-8 w-8 text-[#4397F8]" />
                <div className="text-4xl font-bold text-[#4397F8]">1M+</div>
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
              Holistic Diet Health Solutions
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

      <section className="bg-[#EF8C6B]/10">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-[600px] mx-auto lg:mr-0 lg:ml-auto py-10 pl-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Business Opportunity
              </h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Want to Build Your Own Wellness Business? Make Your Own Franchise.
              </h3>
              <div className=" space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    🌱 Learn from industry experts
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    📦 Get proven business systems
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    💼 Full branding & marketing support
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">
                    🤝 Community of 1000+ Franchise owner's
                  </p>
                </div>
              </div>
              <Button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800">
                Read More
              </Button>
            </div>
            {/* <AchievementsCarousel /> */}
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
      {showModal && <Popupmodal onClose={handleCloseModal} />}
      <Faqs />
    </main>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Dot,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleTranslate from "@/components/googletranslator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ayushman",
  description: "Powered By WellnessZ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-4 py-4 relative">
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-gray-700 hover:text-green-500">
                  Home
                </Link>
                <Link
                  href="/coaches"
                  className="text-gray-700 hover:text-green-500"
                >
                  Coaches
                </Link>
                <Link
                  href="/coach-services"
                  className="text-gray-700 hover:text-green-500"
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-500"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-500"
                >
                  About Us
                </Link>
              </nav>
              <Image
                src="/logo.svg"
                height={100}
                width={100}
                alt=""
                className="h-16 object-contain md:absolute top-1/2 left-1/2 md:translate-x-[-50%] md:translate-y-[-50%] "
              />
              <div className="flex items-center space-x-4 md:space-x-8">
                <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 ml-auto md:ml-0">
                  Book Now
                </Button>
                <button className="md:hidden">
                  <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <GoogleTranslate />
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
        <footer className="bg-[#323333] text-white pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div>
                <Image
                  src="/logo.svg"
                  height={100}
                  width={100}
                  alt=""
                  className="h-16 object-contain"
                />
                <p className="text-gray-400 mb-4">
                  We’re on a mission to make India healthier—one meal, one
                  coach, one transformation at a time. From personalized plans
                  to scalable franchise support, we’re the trusted name in
                  nutrition & wellness entrepreneurship.
                </p>
                <div className="flex space-x-4">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">About Health</h3>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/about"
                >
                  About Us
                </Link>
               
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/contact"
                >
                  Contact us
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/register"
                >
                  Register
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">For Patients</h3>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Sign up
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Log In
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Subscribe to our Blog
                </Link>
                <h3 className="text-lg font-semibold mb-4 mt-8">
                  For Practices
                </h3>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  List Your Practice
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Practice Portal
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Practice Pricing
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Specialties</h3>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Walk-In Medical Clinic
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Naturopath
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Mental Health Practitioner
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Physiotherapist
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Optometrist
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Dietitian
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Chiropractor
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Audiologist
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">&nbsp;</h3>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Massage Therapist
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Osteopath
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Pharmacy
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Dentist
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Acupuncturist
                </Link>
                <Link
                  className="block mb-1 text-gray-400 hover:text-white"
                  href="/"
                >
                  Occupational Therapist
                </Link>
              </div>

              {/* <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">info@ahs.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">123 Health St, Medical City</span>
                </div>
              </div>
            </div> */}
            </div>
          </div>
          <div className="px-4 border-t border-[#5D5D5D] mt-6 py-6 text-center ">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
              <p className="text-gray-400">© Copyright 2023 Health care</p>
              <Link
                className="block mb-1 text-gray-400 hover:text-white ml-auto"
                href="/"
              >
                Terms of Service
              </Link>
              <Dot />
              <Link
                className="block mb-1 text-gray-400 hover:text-white"
                href="/"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

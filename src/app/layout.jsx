import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Dot,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

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
        <Navbar />
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
                  <Link
                    href="https://www.facebook.com/ayushmanhealthsolution/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/ayushmanhealthsolution/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
                  <Link
                    href="https://x.com/AyushmanHS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/channel/UCzXX45tB44qdszNbPe01S0Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
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
        <div className="fixed bottom-0 right-0 p-4">
          <Link
            href="https://api.whatsapp.com/send?phone=919999999999&text=Hello%20Ayushman%20Team,%20I%20would%20like%20to%20book%20a%20demo."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/wp-logo.png"
              alt="WhatsApp"
              width={60}
              height={60}
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>
      </body>
    </html>
  );
}

"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "./googletranslator";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/coaches", label: "Coaches" },
    { href: "/coach-services", label: "Pricing" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="bg-white shadow-md relative top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 relative">
          {/* Left: Nav Links */}
          <nav className="hidden md:flex space-x-6 text-[15px] font-medium text-gray-700">
            {[
              { href: "/", label: "Home" },
              { href: "/coaches", label: "Coaches" },
              { href: "/coach-services", label: "Pricing" },
              { href: "/contact", label: "Contact Us" },
              { href: "/about", label: "About Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-700 transition-all duration-300 ease-in-out hover:text-green-600 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-green-600 after:transition-all after:duration-300 after:ease-in-out"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right: Google Translate */}
          <div className="hidden md:flex items-center space-x-2 text-[14px] text-gray-600 font-medium">
            <span>Select Language:</span>
            <GoogleTranslate />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg z-40 transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col justify-between md:hidden`}
      >
        {/* Nav Links */}
        <div className="flex flex-col p-6 space-y-6 text-[16px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Google Translate + Contact Info */}
        <div className="flex flex-col justify-between h-full p-6 border-t border-gray-200 space-y-4">
          {/* Google Translate for Mobile */}
          <div className="flex justify-center">
            <GoogleTranslate />
          </div>

          <div className="mt-auto flex flex-col items-center space-y-2 text-sm text-gray-600">
            <Image
              src="/logo.svg"
              height={48}
              width={48}
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <p>📞 +91-9876543210</p>
            <p>📧 support@example.com</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

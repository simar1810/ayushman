"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CoachDetails({ coach }) {
  const {
    name,
    city,
    state,
    profilePhoto,
    organisation,
    about,
    specialization,
    awards,
    subscriptionPlan,
    email,
    mobileNumber,
    totalClients,
    joiningDate,
    expectedNoOfClients,
    clientTransformations = [],
  } = coach;

  // Carousel state
  const [current, setCurrent] = useState(0);
  const images = clientTransformations;

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-white/20 p-1">
                <img
                  src={profilePhoto || "/placeholder.svg"}
                  alt={name}
                  className="w-full h-full rounded-full object-cover border-4 border-white/30"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">{name}</h1>
              <p className="text-xl text-emerald-100 mb-4">{organisation}</p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {city}, {state}
                  </span>
                </div>
              
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalClients}</div>
                  <div className="text-sm text-emerald-100">Total Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {expectedNoOfClients}
                  </div>
                  <div className="text-sm text-emerald-100">
                    Expected Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {awards?.length || 0}
                  </div>
                  <div className="text-sm text-emerald-100">Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Quick Info */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium">{mobileNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium">Joined {joiningDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About & Specialization */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {name}
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p className="text-lg leading-relaxed">
                  {about || "No about information provided."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Specialization
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-emerald-700 border-emerald-200 bg-emerald-50"
                  >
                    {specialization}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Clients</span>
                      <span className="font-semibold text-gray-900">
                        {totalClients}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Target Clients</span>
                      <span className="font-semibold text-gray-900">
                        {expectedNoOfClients}
                      </span>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      {awards?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Awards & Recognition
              </h2>
              <p className="text-lg text-gray-600">
                Celebrating excellence and achievements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award) => (
                <Card
                  key={award._id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={award.image || "/placeholder.svg"}
                      alt={award.title}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-semibold text-lg text-gray-900">
                        {award.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Transformations Carousel */}
      {images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Client Transformations
              </h2>
              <p className="text-lg text-gray-600">
                Real results from real people
              </p>
            </div>  

            <div className="relative max-w-2xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                <div className="aspect-[4/3] relative">
                  <img
                    src={
                      images[current]?.img1 ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={`Transformation ${current + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay for better button visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

                  {/* Navigation buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Dots indicator */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        current === index
                          ? "bg-emerald-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Book a consultation with {name} and take the first step towards your
            goals
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

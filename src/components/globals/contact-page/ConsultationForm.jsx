"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialist: "",
    date: "",
    time: "",
  })

  const [showSpecialistDropdown, setShowSpecialistDropdown] = useState(false)

  const specialists = [
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedist",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSpecialistSelect = (specialist) => {
    setFormData((prev) => ({
      ...prev,
      specialist: specialist,
    }))
    setShowSpecialistDropdown(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main consultation section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Form section */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Get Online</h1>
                <h2 className="text-4xl font-bold text-blue-900 mb-8">Consultation</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First name and Last name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">First name*</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Last name*</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Email and Specialist row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Email address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Specialist*</label>
                      <button
                        type="button"
                        onClick={() => setShowSpecialistDropdown(!showSpecialistDropdown)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-left flex items-center justify-between bg-white"
                      >
                        <span className={formData.specialist ? "text-gray-900" : "text-gray-400"}>
                          {formData.specialist || "Choose a specialist"}
                        </span>
                        <ChevronDown className="w-5 h-5 text-green-500" />
                      </button>

                      {showSpecialistDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          {specialists.map((specialist) => (
                            <button
                              key={specialist}
                              type="button"
                              onClick={() => handleSpecialistSelect(specialist)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {specialist}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date and Time row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Date*</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        placeholder="mm/dd"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Time*</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        placeholder="hh:mm"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7CB342] hover:opacity-90 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 mt-8"
                  >
                    Make an appointment
                  </button>
                </form>
              </div>
            </div>

            {/* Image section */}
            <div className="relative lg:block hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/doctor-stetoscope.png"
                  alt="Doctor with stethoscope"
                  width={400}
                  height={600}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

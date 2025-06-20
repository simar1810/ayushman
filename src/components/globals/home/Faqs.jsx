"use client";
import { faqs } from "@/config/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Faqs() {
  const [opened, setOpened] = useState();
  return <section className="py-16 bg-[#F4F1EA]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg">
            <button
              onClick={() => setOpened(prev => prev === index ? undefined : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 cursor-pointer"
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
            {opened === index && <p className="w-full px-6 py-4 text-left flex justify-between items-center">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
}
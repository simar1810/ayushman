import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegistrationForm() {
  return <section className="bg-[#F0FFD9]">
    <div className="mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/about.png"
            alt="Happy patient"
            width={500}
            height={400}
            className="w-full h- rounded-r-2xl object-cover object-left"
          />
        </div>
        <div className="max-w-[600px] p-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Register Now</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-b-1 border-gray-300 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-b-1 border-gray-300 focus:outline-none"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="number"
                className="w-full px-4 py-3 border-b-1 border-gray-300 focus:outline-none"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={1}
                className="w-full px-4 border-b-1 py-2 border-gray-300 focus:outline-none"
                placeholder="Your message"
              />
            </div>
            <Button className="w-fit ml-auto block h-auto bg-green-500 text-white font-bold cursor-pointer rounded-full hover:bg-green-600">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  </section>
}
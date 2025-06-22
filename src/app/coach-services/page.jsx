import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return <div className="max-w-7xl mx-auto px-4 py-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Services Offered</h2>
          <p className="text-gray-600 mb-8">Access a wide variety of healthcare specialties, across India.</p>
          <Tabs>
            <TabsList className="w-full bg-transparent flex items-center gap-0">
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-1">Service 1</TabsTrigger>
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-2">Service 2</TabsTrigger>
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-3">Service 3</TabsTrigger>
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-4">Service 4</TabsTrigger>
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-5">Service 5</TabsTrigger>
              <TabsTrigger className="data-[state=active]:border-b-2 pb-4 border-0 border-b-2 border-[#808080]/20 rounded-[0px] data-[state=active]:shadow-none data-[state=active]:border-black" value="service-6">Service 6</TabsTrigger>
            </TabsList>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="border border-gray-200 p-0">
                  <CardContent className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Service {item}</h3>
                        <p className="text-sm text-gray-600">
                          Access a wide variety of healthcare specialties, across India.
                        </p>
                        <div className="text-2xl font-bold text-gray-900 mt-4">₹ 999.00</div>
                      </div>
                      <PlusCircle size={32} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <TabsContent value="service-1" className="mt-4"></TabsContent>
          </Tabs>
          <div className="text-center">
            <Button variant="outline" className="bg-white text-gray-900 border-gray-300">
              See All
            </Button>
          </div>
        </section>

        {/* Select Schedule Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Schedule</h2>
            <p className="text-gray-600">Access a wide variety of healthcare specialties, across India.</p>
          </div>

          {/* Schedule Date */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Schedules Date</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {[
                { day: "Sat", date: "01" },
                { day: "Sun", date: "02" },
                { day: "Mon", date: "03" },
                { day: "Tue", date: "04", selected: true },
                { day: "Wed", date: "05" },
                { day: "Thu", date: "06" },
                { day: "Fri", date: "07" },
                { day: "Sat", date: "08" },
                { day: "Sun", date: "09" },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg border text-center ${item.selected
                    ? "border-yellow-400 bg-yellow-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <div className="text-sm font-medium">{item.day}</div>
                  <div className="text-lg font-bold">{item.date}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Schedules Time</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {Array.from({ length: 12 }, (_, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg border text-center ${index === 3
                    ? "border-yellow-400 bg-yellow-50 text-gray-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <div className="text-sm font-medium">03:00 PM</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Selected Services</h3>
            <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
              <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Coach"
                width={48}
                height={48}
                className="rounded-full border-1"
              />
              <div>
                <h4 className="font-bold text-gray-900">Coach Name</h4>
                <p className="text-sm text-gray-600">Bary Bithoor Road, Near Bithoor Road</p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">Service 1</h5>
                  <p className="text-sm text-gray-600">
                    Access a wide variety of healthcare specialties, across India.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="font-bold text-gray-900">599.00</div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium text-gray-900">Service 2</h5>
                  <p className="text-sm text-gray-600">
                    Access a wide variety of healthcare specialties, across India.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="font-bold text-gray-900">599.00</div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">1,198.00</span>
              </div>
            </div>
            <Button className="w-full bg-[#6DB20D] hover:bg-[#6DB20D]/80 text-white py-3 rounded-lg">
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
}
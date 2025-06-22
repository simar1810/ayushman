import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { timings } from "@/config/data";
import { MapPin, PlusCircle } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return <main>
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white px-4 py-2 rounded-md inline-block mb-4">
          <span className="text-sm">Open Now</span>
          <span className="ml-4 text-sm">07 AM - 09 PM</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Coach Name goes here</h1>
        <p className="text-gray-600">Coach Clinic or office address goes here</p>
      </div>
    </section>
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 md:gap-4">
          <Image
            src="/details-1.png"
            alt=""
            height={400}
            width={400}
            className="max-h-[170px] md:max-h-[520px] h-full row-span-2 w-full rounded-[10px] object-cover"
          />
          <Image
            src="/details-2.png"
            alt=""
            height={400}
            width={400}
            className="max-h-[80px] md:max-h-[250px] h-full w-full rounded-[10px] object-cover"
          />
          <Image
            src="/details-3.png"
            alt=""
            height={400}
            width={400}
            className="max-h-[80px] md:max-h-[250px] h-full w-full rounded-[10px] object-cover"
          />
        </div>
      </div>
    </section>
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet consectetur. Nulla lorem feugiat quis arcu diam elementum velit ut suscipit
                ut. Risus tristique massa mauris duis tortor auctor. Diam sed dignissim vitae nullam tristique
                habitasse a sit. Leo tristique sit dolor vulputate mauris. Molestie ut habitant ut mauris ut mauris ut
                mauris ut mauris ut pellentesque fermentum.
              </p>
              <p>
                Dignissim integer nulla in dui sit. Pretium gravida lorem mauris tincidunt magna nibh. Eu ipsum orci
                semper pellentesque justo velit sagittis. Vulputate feugiat ante mauris ut sit odio consectetur.
                Molestie sit faucibus vel orci velit ut placerat habitasse.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Working hours</h3>
              <div className="space-y-2">
                {timings.map((item, index) => (
                  <div key={index} className="flex justify-between py-1">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-gray-900 font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Address</h2>
            <div className="bg-gray-200 h-64 rounded-lg mb-4 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=256&width=400"
                alt="Map"
                width={400}
                height={256}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full">
                <MapPin className="w-6 h-6 text-gray-900" />
              </div>
            </div>
            <p className="text-gray-600">
              Bary Bithoor Road, Near Bithoor Road, Near Kalyanpur,
              <br />
              Bary, Kalyanpur, Kanpur
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
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
        </div>
        <div>
          <div className="p-4 md:py-8 sm:px-6 lg:px-8 border-1 rounded-[10px]">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Coach"
                  width={60}
                  height={60}
                  className="rounded-full border-1"
                />
                <h3 className="text-xl font-bold">Coach Name</h3>
              </div>

              <div className="flex-1">
                <p className="text-[#687086] leading-[1.3] text-[14px] mb-6">
                  Lorem ipsum dolor sit amet consectetur. Nulla lorem feugiat quis arcu diam elementum velit ut suscipit
                  ut. Risus tristique massa mauris duis tortor auctor. Diam sed dignissim vitae nullam tristique habitasse
                  a sit. Leo tristique sit dolor vulputate mauris. Molestie ut habitant ut mauris ut mauris ut mauris ut
                  mauris ut pellentesque fermentum. Dignissim integer nulla in dui sit. Pretium gravida lorem mauris
                  tincidunt magna nibh. Eu ipsum orci semper pellentesque justo velit sagittis. Vulputate feugiat ante
                  mauris ut sit odio consectetur. Molestie sit faucibus vel orci velit ut placerat habitasse.
                </p>

                <Button className="bg-[#6DB20D] hover:bg-[#6DB20D]/80 text-white px-8 py-3 rounded-full w-full">
                  Book now for consultancy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
}
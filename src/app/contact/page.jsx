import ConsultationForm from "@/components/globals/contact-page/ConsultationForm";
import PageHeader from "@/components/globals/core/PageHeader";
import Faqs from "@/components/globals/home-page/Faqs";
import { Separator } from "@radix-ui/react-separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return <main>
    <PageHeader
      title="Contact Us"
      description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing"
    />
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-start gap-8">
          <Image
            src="/mail-logo.svg"
            height={60}
            width={60}
            alt=""
            className=" object-contain"
          />
          <div>
            <h3 className="text-[16px] md:text-[20px] text-[#102D47] font-bold uppercase mb-[2px]">Email Us</h3>
            <p className="max-w-[28ch] leading-[1.2] text-[#547593] mb-4">Please feel free to drop us a line. We will respond as soon as possible.</p>
            <Link href="#" className="text-[#6DB20D] flex items-center gap-1">
              <p className="text-[14px] md:text-[18px]">Leave a message</p>
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-8">
          <Image
            src="/careers.svg"
            height={60}
            width={60}
            alt=""
            className="object-contain"
          />
          <div>
            <h3 className="text-[16px] md:text-[20px] text-[#102D47] font-bold uppercase mb-[2px]">Careers</h3>
            <p className="max-w-[28ch] leading-[1.2] text-[#547593] mb-4">Please feel free to drop us a line. We will respond as soon as possible.</p>
            <Link href="#" className="text-[#6DB20D] flex items-center gap-1">
              <p className="text-[14px] md:text-[18px]">Send an application</p>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30277.69114171574!2d73.87799737653613!3d18.451408535710065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHotels!5e0!3m2!1sen!2sin!4v1750586967482!5m2!1sen!2sin"
        width="600"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-video max-h-[450px] w-full my-20 rounded-[20px]"
      />
    </div>
    <Separator className="h-[2px] bg-[#E1F1F6]" />
    <ConsultationForm />
    <Faqs />
  </main>
}
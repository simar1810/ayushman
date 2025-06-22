import PageHeader from "@/components/globals/core/PageHeader";
import Faqs from "@/components/globals/home-page/Faqs";
import { Check, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return <main>
    <PageHeader
      title="Coaches"
      description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing"
    />
    <div className="max-w-7xl p-4 md:p-8 mx-auto grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-[20px]">
      {Array.from({ length: 20 }, (_, i) => i + 1).map(coach => <div
        key={coach}
        className="bg-[#F6F6F6] p-[8px] md:p-[16px] rounded-[20px]"
      >
        <Image
          src="/hero.png"
          height={720}
          width={720}
          alt=""
          className="h-[200px] w-full object-cover rounded-t-[16px]"
        />
        <div className="bg-white rounded-b-[20px] p-4">
          <p className="font-bold text-[16px] md:text-[20px]">Dr. Mayank Agrwal</p>
          <p className="text-[12px] md:text-[14px] text-[#687086] font-semibold">Neurologist</p>
          <div className="flex items-center gap-1">
            <CheckCircle fill="#67C6A1" stroke="#FFFFFF" />
            <p className="text-[10px] md:text-[12px] text-[#687086] font-semibold">680 Consults done</p>
          </div>
        </div>
      </div>)}
    </div>
    <Faqs />
  </main>
}
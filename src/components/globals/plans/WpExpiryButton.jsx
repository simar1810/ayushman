import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function WpExpiryButton() {
  return <div className="fixed bottom-8 right-8 group z-[100]">
    <Link
      href="https://wa.link/3jbqrn"
      target="_blank"
      className="bg-white p-2 rounded-xl shadow-lg border-[1px] flex items-center justify-center"
    >
      <IoLogoWhatsapp className="text-[#25D366] w-[48px] h-[48px]" />
    </Link>
    <span className="absolute bottom-16 right-1/2 transform translate-x-1/2 bg-[#25D366] font-bold text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Enquire now!
    </span>
  </div>
}
import { videos } from "@/config/plan";

export default function Testimonials() {
  return <div className="max-w-[1200px] bg-white mx-auto p-4  md:p-8 rounded-md">
    <h2 className="text-[28px] md:text-[40px] lg:text-[64px] text-center font-bold leading-[1.1]">
      Why do 6000+ professionals believe in WellnessZ?
    </h2>
    {/* <p className="text-[#CCCCCC] font-semibold text-center mt-2 leading-[1]">
      Look at some of our amazing features
    </p> */}
    <div className="mt-4 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-1">
      {videos.map((video) => (
        <div key={video.id} className="flex flex-col items-center">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            className="w-full h-full gap-y-2 md:gap-y-10 aspect-[9/16] mb-2 md:mb-4"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="testimonial"
          />
        </div>
      ))}
    </div>
  </div>
}
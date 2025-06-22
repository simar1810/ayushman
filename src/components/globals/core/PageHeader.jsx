export default function PageHeader({
  title,
  description
}) {
  return <div className="bg-[#F0FFD9] h-[200px] md:h-[320px] text-center flex flex-col items-center justify-center">
    <h2 className="text-[30px] md:text-[60px] font-semibold">{title}</h2>
    <p className="max-w-[40ch] mx-auto text-[#102D47]">{description}</p>
  </div>
}
export default function FormControl({ title, className, ...props }) {
  return <label className={`block my-4 ${className}`}>
    <span className="block cursor-pointer font-bold">{title}</span>
    <input type={props.text || "text"}
      className="input w-full bg-[#EEEEEE] font-semibold mt-2 px-4 py-2 rounded-[8px] focus:outline-none border-2"
      {...props}
    />
  </label>
}
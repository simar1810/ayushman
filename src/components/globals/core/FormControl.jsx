export default function FormControl({
  label,
  className,
  ...props
}) {
  return <label className="w-full">
    <span>{label}</span>
    <input
      {...props}
      className="w-full bg-white px-4 py-2 my-4 block focus:outline-none rounded-[16px] border-1"
    />
  </label>
}
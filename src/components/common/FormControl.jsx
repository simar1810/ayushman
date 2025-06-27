export function FormControl({ label, ...props }) {
  return <label className="text-black mb-4 block">
    {label}
    <input
      type={props.type || "text"}
      {...props}
      className="input w-full mt-2 px-4 py-2 focus:outline-none block rounded-[8px] border-2"
    />
  </label>
}
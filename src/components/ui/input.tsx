
export function Input({
  className, type, min, max, step, defaultValue, defaultChecked, pattern, name, id, required, placeholder
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      type={type}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      defaultChecked={defaultChecked}
      pattern={pattern}
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      className={'block mt-2 px-2 py-1 w-full bg-slate-950 border border-slate-600 rounded-md '+ 
        'focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 '+
        'invalid:text-red-600 invalid:border invalid:border-red-600 '+
        'focus:invalid:text-red-600 focus:invalid:ring-red-600 focus:invalid:border-red-600 ' +
        ''
        +className}
    ></input>
  )
}
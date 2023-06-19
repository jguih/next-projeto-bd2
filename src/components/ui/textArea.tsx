
export function TextArea({
  className, name, id, placeholder, value, required
}: React.ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      value={value}
      className={'block mt-2 w-full px-2 py-1 bg-slate-950 border border-slate-600 rounded-md '+ 
        'focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 '+
        'invalid:text-red-600 invalid:border invalid:border-red-600 '+
        'focus:invalid:text-red-600 focus:invalid:ring-red-600 focus:invalid:border-red-600 '+className}
    />
  )
}
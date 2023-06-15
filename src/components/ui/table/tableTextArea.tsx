
export function TableTextArea({
  className, defaultValue, 
  defaultChecked, name, id, required, 
  placeholder, value, onChange, onKeyDown, onKeyUp,
  onBlur
}: React.ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      defaultValue={defaultValue}
      defaultChecked={defaultChecked}
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      className={`block bg-transparent rounded-md border-2 border-transparent
        hover:border-slate-500
        focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 
        invalid:text-red-600 invalid:border invalid:border-red-600 
        focus:invalid:text-red-600 focus:invalid:ring-red-600 focus:invalid:border-red-600 ${className}`}
      spellCheck={false}
    />
  )
}
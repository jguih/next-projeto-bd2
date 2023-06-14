
export function TableInput({
  className, type, min, max, step, defaultValue, 
  defaultChecked, pattern, name, id, required, 
  placeholder, value, onChange, onKeyDown, onKeyUp,
  onBlur
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
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      className={'block p-1 bg-transparent rounded-md '+ 
        'focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-4 '+
        'invalid:text-red-600 invalid:border invalid:border-red-600 '+
        'focus:invalid:text-red-600 focus:invalid:ring-red-600 focus:invalid:border-red-600 '+className}
      spellCheck={false}
    ></input>
  )
}
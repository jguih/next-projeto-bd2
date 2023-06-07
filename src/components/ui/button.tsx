
export default function Button({
  children, className, type
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      className={'py-1 px-2 border border-slate-600 bg-slate-800 hover:bg-slate-600 rounded-md '+className}
    >{children}</button>
  );
}
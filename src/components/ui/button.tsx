
export default function Button({
  children, className, type, onClick
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={'py-1 px-2 border border-slate-600 bg-slate-800 hover:bg-slate-600 rounded-md '+className}
    >{children}</button>
  );
}
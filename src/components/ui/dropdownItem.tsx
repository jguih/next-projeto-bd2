
export default function DropdownItem({
  children
}: { children: React.ReactNode }) {
  return (
    <div className='block my-1'>
      {children}
    </div>
  );
}
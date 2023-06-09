import { useState } from "react";
import Button from "./button";

export default function Dropdown({
  children, className
}: React.ComponentPropsWithoutRef<'div'>) {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <Button onClick={() => setShow((state) => !state)} type="button">Plataformas</Button>
      <div className={`${show ? '' : 'hidden'} left-0 mt-1 py-3 px-2 rounded bg-slate-700 w-full h-fit`}>
        {children}
      </div>
    </div>
  )
}
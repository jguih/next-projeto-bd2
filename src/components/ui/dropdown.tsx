import { useState } from "react";

type DropdownData = {
  children: React.ReactNode,
  className: string,
  label: string,
  endLabel: React.ReactNode
}

export default function Dropdown({
  children, className, label, endLabel
}: DropdownData) {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <div className={`py-1 px-2 border border-slate-600 rounded-md select-none flex items-center gap-6 ${show ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
        <div onClick={() => setShow((state) => !state)} className='flex items-center grow cursor-pointer'>
          {!show ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>}
          <span className='grow-0'>{label}</span>
        </div>
        <div>{endLabel}</div>
      </div>
      <div className={`${show ? '' : 'hidden'} left-0 mt-1 py-3 px-2 rounded bg-slate-800 w-full h-fit`}>
        {children}
      </div>
    </div>
  )
}
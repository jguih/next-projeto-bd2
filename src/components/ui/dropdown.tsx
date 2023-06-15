import { useEffect, useState } from "react";

type DropdownData = {
  children: React.ReactNode,
  label: string,
  endLabel?: React.ReactNode,
  show?: boolean
}

export default function Dropdown({
  children, label, endLabel, show
}: DropdownData) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (show !== undefined)
      setShouldShow(show)
  }, [show])

  return (
    <div>
      <div className={`py-1 px-2 border border-slate-600 rounded-md select-none flex items-center gap-6 ${show ? 'bg-slate-600' : 'bg-slate-800 hover:bg-slate-700'}`}>
        <div onClick={() => setShouldShow((state) => !state)} className='flex items-center grow cursor-pointer'>
          {!shouldShow ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>}
          <span className='grow-0'>{label}</span>
        </div>
        {endLabel && <div>{endLabel}</div>}
      </div>
      {shouldShow &&
        <div className={`left-0 mt-1 py-3 px-2 rounded bg-slate-900 w-full h-fit`}>
          {children}
        </div>}
    </div>
  )
}
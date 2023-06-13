import { Dispatch, SetStateAction } from "react"
import PlatformsDropdown from "../platformsDropdown"

export default function PlatformsDropdownView({
  onReturn, onChange, initialChecked, id
}: {
  onReturn: (event: React.MouseEvent) => null | void | undefined,
  onChange: (state: PlatformsDropdownData) => null | void,
  initialChecked: PlatformsDropdownData,
  id: string
}) {
  return (
    <div className='h-full'>
      <button onClick={(e) => onReturn(e)}
        className='p-1 rounded-full hover:bg-slate-600'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>
      <PlatformsDropdown
        id={id + '_tablePlatformsColumn'}
        onChange={onChange}
        initialChecked={initialChecked}
      />
    </div>
  )
}
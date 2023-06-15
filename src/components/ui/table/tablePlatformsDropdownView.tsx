import PlatformsDropdown from "../platformsDropdown"
import Button from "../button"

export default function TablePlatformsDropdownView({
  onReturn, onSave, onChange, initialChecked, id, show
}: {
  onReturn: (event: React.MouseEvent) => null | void | undefined,
  onSave: (event: React.MouseEvent) => null | void | undefined,
  onChange: (state: PlatformsDropdownData[]) => null | void,
  initialChecked: string[],
  id: string,
  show?: boolean
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
        show={show}
      />
      <div className='mx-auto mt-2'>
        <Button onClick={onSave}
          className='bg-green-700 hover:bg-green-600 w-full'
        >
          Save
        </Button>
      </div>
    </div>
  )
}
import usePlatform from "@/hooks/usePlatform"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Dropdown from "./dropdown"
import DropdownItem from "./dropdownItem"
import Checkbox from "./checkbox"

export default function PlatformsDropdown({
  id, onChange, initialChecked
}: {
  id: string,
  onChange: (state: PlatformsDropdownData) => null | void,
  initialChecked: PlatformsDropdownData
}) {
  const { platforms, isPlatformsLoading, isPlatformsError } = usePlatform();
  const [checked, setChecked] = useState<PlatformsDropdownData>(initialChecked)

  useEffect(() => {
    onChange(checked)
  }, [checked])

  useEffect(() => {
    setChecked(initialChecked)
  }, [initialChecked])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, platform: Platform) => {
    setChecked((prev) => {
      return {
        ...prev,
        [platform.name]: {
          checked: event.target.checked
        }
      }
    })
  }

  const getCheckedCountButton = (): React.ReactNode => {
    let count = 0;
    checked ?
      Object.values(checked).forEach((value) => {
        if (value.checked) count++
      }) : null
    return (
      <button
        className='px-2 rounded-full bg-sky-800 hover:bg-sky-600'
        type='button'
        onClick={() => setChecked({})}
      >{count}</button>
    )
  }

  return (
    <Dropdown
      className={'w-full'}
      label='Platforms'
      endLabel={getCheckedCountButton()}
    >
      {platforms?.map((platform, index) => {
        return (
          <DropdownItem key={index * 10}>
            <Checkbox
              key={index}
              label={platform.name}
              id={id+'_'+platform.name}
              checked={checked?.[platform.name]?.checked || false}
              onChange={(e) => handleCheckboxChange(e, platform)}
            />
          </DropdownItem>
        )
      })}
    </Dropdown>
  )
}
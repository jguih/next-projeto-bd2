import usePlatform from "@/hooks/usePlatform"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Dropdown from "./dropdown"
import DropdownItem from "./dropdownItem"
import Checkbox from "./checkbox"

export default function PlatformsDropdown({
  id, onChange, initialChecked, show
}: {
  id: string,
  onChange?: (state: PlatformsDropdownData[]) => null | void,
  initialChecked?: string[],
  show?: boolean
}) {
  const { platforms, isPlatformsLoading, isPlatformsError } = usePlatform();
  const [checked, setChecked] = useState<PlatformsDropdownData[]>([])

  useEffect(() => {
    onChange?.(checked)
  }, [checked])

  useEffect(() => {
    if (!platforms) return

    const arr: PlatformsDropdownData[] = platforms
      .map(p => {
        return {
          platform: p,
          checked: false
        }
      })
    setChecked(arr)
  }, [platforms])

  useEffect(() => {
    if (!platforms) return
    if (!initialChecked) return

    setChecked(old => {
      return old 
        .map(val => {
          if (initialChecked.includes(val.platform.name)) {
            return {
              ...val,
              checked: true
            }
          }
          return val
        })
    })
  }, [initialChecked, platforms])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, platform: Platform) => {
    setChecked((old) => {
      return old
        .map(val => {
          if (val.platform.name === platform.name)
            return {
              platform: platform,
              checked: event.target.checked
            }
          else return val
        }) as PlatformsDropdownData[]
    })
  }

  const getCheckedCountButton = (): React.ReactNode => {
    let count = checked.filter(val => val.checked).length ?? 0;
    return (
      <button
        className='px-2 rounded-full bg-sky-800 hover:bg-sky-600'
        type='button'
        onClick={() => setChecked([])}
      >{count}</button>
    )
  }

  const getChecked = (platformName: string): boolean => {
    return checked.filter((val) => val.platform.name === platformName)[0]?.checked ?? false
  }

  return (
    <Dropdown
      label='Platforms'
      endLabel={getCheckedCountButton()}
      show={show}
    >
      {platforms?.map((platform, index) => {
        return (
          <DropdownItem key={index * 10}>
            <Checkbox
              key={index}
              label={platform.name}
              id={id + '_' + platform.name}
              checked={getChecked(platform.name)}
              onChange={(e) => handleCheckboxChange(e, platform)}
            />
          </DropdownItem>
        )
      })}
    </Dropdown>
  )
}
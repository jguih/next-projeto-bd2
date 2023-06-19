import usePlatform from "@/hooks/usePlatform"
import { useEffect, useState } from "react"
import Dropdown from "./dropdown"
import DropdownItem from "./dropdownItem"
import Checkbox from "./checkbox"
import Loading from "./loading"

export default function PlatformsDropdown({
  id, onChange, initialChecked, show, reset
}: {
  id: string,
  onChange?: (state: PlatformsDropdownData[]) => null | void,
  initialChecked?: string[],
  show?: boolean,
  reset?: boolean
}) {
  const { platforms, isPlatformsLoading, isPlatformsError } = usePlatform();
  const [checked, setChecked] = useState<PlatformsDropdownData[]>([])

  useEffect(() => {
    onChange?.(checked)
  }, [checked])

  useEffect(() => {
    if (reset !== undefined) 
      resetChecked()
  }, [reset])

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
              platform: val.platform,
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

  const resetChecked = () => {
    console.log('reseting platforms dropdown...')
    setChecked(old => {
      return old
        .map(val => {
          return {
            ...val,
            checked: false
          }
        })
    })
  }

  const getEndLabel = (): React.ReactNode => {
    let count = checked.filter(val => val.checked).length ?? 0;
    return (
      <button
        className='px-2 rounded-full bg-sky-800 hover:bg-red-600'
        type='button'
        onClick={() => resetChecked()}
      >{count}</button>
    )
  }

  const getChecked = (platformName: string): boolean => {
    return checked.filter((val) => val.platform.name === platformName)[0]?.checked ?? false
  }

  if (isPlatformsLoading) {
    return (
      <Loading text='Loading Platforms...' />
    )
  }

  if (isPlatformsError) {
    return (
      <p>Error!</p>
    )
  }

  if (platforms) {
    return (
      <Dropdown
        label='Platforms'
        endLabel={getEndLabel()}
        show={show}
      >
        {platforms.map((platform, index) => {
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
}
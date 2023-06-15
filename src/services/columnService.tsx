import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { game } from "./httpService"
import Loading from "@/components/ui/loading"
import { TableInput } from "@/components/ui/table/tableInput"
import { TableTextArea } from "@/components/ui/table/tableTextArea"
import TablePlatformsList from "@/components/ui/table/tablePlatformsList"
import TablePlatformsDropdownView from "@/components/ui/table/tablePlatformsDropdownView"

export const InputColumn = (header: string, { ...props }: React.InputHTMLAttributes<HTMLInputElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ ...cellProps }) => {
      const initialValue = cellProps.getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)
      const [isLoading, setIsLoading] = useState(false);

      // If the initial value is changed externally, such as on the database 
      useEffect(() => {
        setValue(initialValue)
        setIsLoading(false)
      }, [initialValue])

      const updateGame = (valid: boolean) => {
        if (!valid) {
          setValue(initialValue)
          return
        }
        if (value !== initialValue) {
          const gameID = cellProps.row.original.id
          if (gameID) {
            setIsLoading(true)
            game.update(gameID, cellProps.column.id, value as string)
              .then((res) => {
                if (!res.ok) {
                  setValue(initialValue)
                  setIsLoading(false)
                }
              })
              .catch((err) => {
                setValue(initialValue)
                setIsLoading(false)
              })
          }
        }
      }

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          const input = e.currentTarget as HTMLInputElement
          updateGame(input.validity.valid)
        }
      }

      const handleBlur = async (e: React.FocusEvent) => {
        const input = e.currentTarget as HTMLInputElement
        updateGame(input.validity.valid)
      }

      if (!isLoading)
        return (
          <TableInput
            {...props}
            value={value as string}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`${props.className}`}
            spellCheck={false}
            disabled={isLoading}
          />
        )
      else
        return (
          <Loading text='Updating...' />
        )
    },
    header: header
  }
}

export const TextAreaColumn = (header: string, { ...props }: React.InputHTMLAttributes<HTMLTextAreaElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ ...cellProps }) => {
      const initialValue = cellProps.getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)
      const [isLoading, setIsLoading] = useState(false)

      // If the initial value is changed externally, such as on the database 
      useEffect(() => {
        setValue(initialValue)
        setIsLoading(false)
      }, [initialValue])

      const updateGame = (valid: boolean) => {
        if (!valid) {
          setValue(initialValue)
          return
        }
        if (value !== initialValue) {
          const gameID = cellProps.row.original.id
          if (gameID) {
            setIsLoading(true)
            game.update(gameID, cellProps.column.id, value as string)
              .then((res) => {
                if (!res.ok) {
                  setValue(initialValue)
                  setIsLoading(false)
                }
              })
              .catch((err) => {
                setValue(initialValue)
                setIsLoading(false)
              })
          }
        }
      }

      const handleBlur = (e: React.FocusEvent) => {
        const input = e.currentTarget as HTMLInputElement
        updateGame(input.validity.valid)
      }

      if (!isLoading)
        return (
          <TableTextArea
            {...props}
            value={value as string}
            onChange={e => setValue(e.target.value)}
            onBlur={handleBlur}
            className={`bg-transparent p-1 rounded resize-none
                focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 
                ${props.className}`}
            spellCheck={false}
            disabled={isLoading}
          />
        )
      else
        return (
          <Loading text='Updating...' />
        )
    },
    header: header
  }
}

export const CheckboxColumn = (header: string, { ...props }: React.InputHTMLAttributes<HTMLInputElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ ...cellProps }) => {
      const initialValue = cellProps.getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)
      const [isLoading, setIsLoading] = useState(false)

      // If the initial value is changed externally, such as on the database 
      useEffect(() => {
        setValue(initialValue)
        setIsLoading(false)
      }, [initialValue])

      const updateGame = (value: boolean) => {
        const gameID = cellProps.row.original.id
        if (gameID) {
          setIsLoading(true)
          game.update(gameID, cellProps.column.id, value ? 'true' : 'false')
            .then((res) => {
              if (!res.ok) {
                setValue(initialValue)
                setIsLoading(false)
              }
            })
            .catch((err) => {
              setValue(initialValue)
              setIsLoading(false)
            })
        }
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateGame(e.target.checked)
      }

      if (!isLoading)
        return (
          <div className='text-center'>
            <input
              {...props}
              type='checkbox'
              checked={value as boolean}
              onChange={handleChange}
              className={`bg-transparent p-1 rounded 
                focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 
                ${props.className}`}
              disabled={isLoading}
            />
          </div>
        )
      else
        return (
          <Loading />
        )
    },
    header: header
  }
}

export const PlatformsColumn = (header: string, { ...props }: React.InputHTMLAttributes<HTMLInputElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ ...cellProps }) => {
      const initialValue = cellProps.getValue() as string[];
      const [value, setValue] = useState(initialValue);
      const [isLoading, setIsLoading] = useState(false)
      const [showDropdownView, setShowDropdownView] = useState(false)

      // If the initial value is changed externally, such as on the database 
      useEffect(() => {
        setIsLoading(false)
        setShowDropdownView(false)
      }, [initialValue])

      const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
        if (arr1.length !== arr2.length) return false
        if (arr1 === arr2) return true

        const sortedArr1 = arr1
          .sort(
            (a, b) => {
              if (a < b) return -1
              if (a > b) return 1
              return 0
            })

        const sortedArr2 = arr2
          .sort(
            (a, b) => {
              if (a < b) return -1
              if (a > b) return 1
              return 0
            })

        return sortedArr1.every((val, index) => {
          return val === sortedArr2[index]
        })
      }

      const updateGame = () => {
        if (!areArraysEqual(value, initialValue)) {
          const gameID = cellProps.row.original.id
          if (gameID) {
            setIsLoading(true)
            game.update(gameID, cellProps.column.id, value)
              .then((res) => {
                if (!res.ok) {
                  setValue(initialValue)
                  setIsLoading(false)
                }
              })
              .catch((err) => {
                setValue(initialValue)
                setIsLoading(false)
              })
          }
        } else {
          setShowDropdownView(false)
        }
      }

      const handleOnChange = (state: PlatformsDropdownData[]) => {
        const values = state
          .filter(val => val.checked)
          .map(val => val.platform.name)
        setValue(values)
      }

      const handleOnSave = (event: React.MouseEvent) => {
        updateGame()
      }

      if (isLoading) {
        return (
          <Loading text='Updating...' />
        )
      }

      if (!showDropdownView)
        return (
          <TablePlatformsList
            onClick={(e) => setShowDropdownView(true)}
            value={initialValue}
          />
        )
      else
        return (
          <TablePlatformsDropdownView
            onReturn={() => setShowDropdownView(false)}
            onSave={handleOnSave}
            onChange={handleOnChange}
            initialChecked={initialValue}
            id={cellProps.row.original.id + ''}
            show={true}
          />
        )
    },
    header: header
  }
}
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { game } from "./httpService"
import PlatformsDropdownView from "@/components/ui/table/platformsDropdownView"
import Loading from "@/components/ui/loading"
import { TableInput } from "@/components/ui/table/tableInput"
import { TableTextArea } from "@/components/ui/table/tableTextArea"

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
                  setIsLoading(false)
                }
              })
              .catch((err) => {
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
                  setIsLoading(false)
                }
              })
              .catch((err) => {
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
              }
            })
            .catch((err) => {
              setValue(initialValue)
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

      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue);
      const [isLoading, setIsLoading] = useState(false)
      const [showDropdownView, setShowDropdownView] = useState(false)

      // If the initial value is changed externally, such as on the database 
      useEffect(() => {
        setIsLoading(false)
        setShowDropdownView(false)
      }, [initialValue])

      const updateGame = () => {
        const gameID = cellProps.row.original.id
        if (gameID) {
          setIsLoading(true)
          game.update(gameID, cellProps.column.id, value)
            .then((res) => {
              console.log(res)
              if (!res.ok) {
              }
            })
            .catch((err) => {
              console.log(err)
            })
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
          <div className='bg-transparent p-2 rounded hover:bg-slate-600 select-none cursor-pointer'
            onClick={() => setShowDropdownView(true)}
          >
            <pre>{initialValue.join('\n') || '...'}</pre>
          </div>
        )
      else
        return (
          <PlatformsDropdownView
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
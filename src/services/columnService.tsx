import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { game } from "./httpService"

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

      const updateGame = () => {
        if (!value) {
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
                }
              })
              .catch((err) => {
                setValue(initialValue)
              })
          }
        }
      }

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          const input = e.currentTarget as HTMLInputElement
          updateGame()
          input.blur()
        }
      }

      const handleBlur = async (e: React.FocusEvent) => {
        updateGame()
      }

      if (!isLoading)
        return (
          <input
            {...props}
            value={value as string}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`bg-transparent p-1 rounded
                  focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 
                  ${props.className}`}
            spellCheck={false}
            disabled={isLoading}
          />
        )
      else
        return (
          <p className={`${isLoading ? 'block' : 'hidden'} text-left text-red-600`}>Updating...</p>
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

      const updateGame = () => {
        if (!value) {
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
                }
              })
              .catch((err) => {
                setValue(initialValue)
              })
          }
        }
      }

      const handleBlur = (e: React.FocusEvent) => {
        updateGame()
      }
      if (!isLoading)
        return (
          <textarea
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
          <p className={`${isLoading ? 'block' : 'hidden'} text-left text-red-600`}>Updating...</p>
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
        )
      else
        return (
          <p className='text-left text-sky-600'>Updating...</p>
        )
    },
    header: header
  }
}
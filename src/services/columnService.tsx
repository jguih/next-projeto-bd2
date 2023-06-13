import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"

export const InputColumn = (header: string, {...props}: React.InputHTMLAttributes<HTMLInputElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          console.log(value)
        }
      }

      const handleBlur = (e: React.FocusEvent) => {
        //setValue(getValue())
      }

      return (
        <input
          {...props}
          value={value as string}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`bg-transparent border-2 border-slate-600 p-1 rounded 
              focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2 ${props.className}`}
          spellCheck={false}
        />
      )
    },
    header: header
  }
}

export const TextAreaColumn = (header: string, {...props}: React.InputHTMLAttributes<HTMLTextAreaElement> = {}): Partial<ColumnDef<Game>> => {
  return {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          console.log(value)
        }
      }

      const handleBlur = (e: React.FocusEvent) => {
        // setValue(getValue())
      }

      return (
        <textarea
          {...props}
          value={value as string}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`bg-transparent border-2 border-slate-600 p-1 rounded resize-none
            focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-2
            ${props.className}`}
          spellCheck={false}
        />
      )
    },
    header: header
  }
}
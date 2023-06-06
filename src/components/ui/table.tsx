import { useEffect, useReducer, useState } from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<Game>()

const columns = [
  columnHelper.accessor('id_game', {
    header: 'ID',
    cell: props => <span>{props.getValue()}</span>,
    footer: props => props.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: props => <span>{props.getValue()}</span>,
    footer: props => props.column.id,
  }),
  columnHelper.accessor('description', {
    header: 'Descrição',
    cell: props => <span>{props.getValue()}</span>,
    footer: props => props.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: props => <span>{props.getValue()}</span>,
    footer: props => props.column.id,
  }),
  columnHelper.accessor('discount', {
    header: 'Desconto',
    cell: props => <span>{props.getValue()}</span>,
    footer: props => props.column.id,
  }),
  columnHelper.accessor('isDiscountActive', {
    header: 'Desconto Ativo',
    cell: props => <span>{props.getValue() ? 'Sim' : 'Não'}</span>,
    footer: props => props.column.id,
  }),
]

export default function Table({ games }: { games: Game[] }) {
  const table = useReactTable({
    data: games,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table
        className='table-auto w-full border-separate border-spacing-2 p-1'>
        <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-2 text-left bg-transparent'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-slate-600 rounded-md p-2 bg-slate-800'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} className='p-2 text-left bg-transparent'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react';
import Button from './button';
import { game } from '@/services/httpService';

const columnHelper = createColumnHelper<Game>()

const columns = [
  columnHelper.display({
    header: props =>
      <input
        type='checkbox'
        checked={props.table.getIsAllRowsSelected()}
        onChange={props.table.getToggleAllRowsSelectedHandler()}
        className='w-4 h-4 rounded'
      ></input>,
    id: 'selection',
    cell: props =>
      <input
        type='checkbox'
        checked={props.row.getIsSelected()}
        onChange={props.row.getToggleSelectedHandler()}
        className='w-4 h-4 rounded'
      ></input>,
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('enUS_description', {
    header: 'Description',
    cell: props => <span>{props.getValue().split(' ', 20).join(' ') + '...'}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: props => <span>{`R$ ${props.getValue()}`}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('discount', {
    header: 'Discount',
    cell: props => <span>{`${props.getValue() * 100}%`}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('isDiscountActive', {
    header: 'Active',
    cell: props => <input type='checkbox' checked={props.getValue()} readOnly className='w-4 h-4 rounded accent-green-600' />,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('platforms', {
    header: 'Platforms',
    cell: props => <pre>{props.getValue().join('\n')}</pre>
  })
]

export default function Table({
  games
}: {
  games: Game[],
}) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: games,
    columns: columns,
    state: {
      rowSelection: rowSelection
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  async function handleDeleteSelected() {
    Object.keys(rowSelection).forEach((index) => {
      const id = table.getRow(index).original.id
      if (id)
        game.delete(id)
    })
    setRowSelection({})
  }

  return (
    <>
      {Object.keys(rowSelection).length > 0 ?
        <Button
          onClick={handleDeleteSelected}
          className='fixed w-fit bottom-2 inset-x-0 mx-auto bg-rose-600 hover:bg-rose-800'
        >Excluir Selecionados</Button> : null}
      <table
        className='table-auto w-full border-separate border-spacing-2 p-1'>
        <thead className=''>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map(header => (
                <th key={header.id}
                  className={`p-2 bg-transparent ${header.column.id === 'selection' ? 'text-center' : 'text-left'}`}
                >
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
            <tr key={row.id} className=''>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={`p-2 
                    ${cell.column.id === 'selection' ? 'text-center' : 'bg-slate-800 border border-slate-600 rounded-md '}
                    ${cell.column.id === 'isDiscountActive' ? 'text-center' : ''}
                    ${cell.column.id === 'discount' ? 'text-center' : ''}`}
                >
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
    </>
  )
}
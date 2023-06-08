
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

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
  columnHelper.accessor('id_game', {
    header: 'ID',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('description', {
    header: 'Descrição',
    cell: props => <span>{props.getValue().split(' ', 20).join(' ')+'...'}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('discount', {
    header: 'Desconto',
    cell: props => <span>{props.getValue()}</span>,
    //footer: props => props.column.id,
  }),
  columnHelper.accessor('isDiscountActive', {
    header: 'Ativo?',
    cell: props => <input type='checkbox' checked={props.getValue()} className='w-4 h-4 rounded accent-green-600'/>,
    //footer: props => props.column.id,
  }),
]

export default function Table({
  games, rowSelection, setRowSelection
}: {
  games: Game[],
  rowSelection: any,
  setRowSelection: any
}) {
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

  return (
    <table
      className='table-auto w-full border-separate border-spacing-2 p-1'>
      <thead className=''>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}
                className={`p-2 ${header.id == 'selection' ? 'text-center' : 'text-left'} bg-transparent`}>
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
              <td
                key={cell.id}
                className={`p-2 ${cell.id == `${row.id}_selection` ? 'text-center' : 'bg-slate-800 border border-slate-600 rounded-md'}`}>
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
  )
}
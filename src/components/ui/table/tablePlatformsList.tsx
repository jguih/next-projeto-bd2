import Button from "../button"

export default function TablePlatformsList({
  onClick, value
}: {
  onClick: React.MouseEventHandler,
  value: string[]
}) {
  return (
    <div className='bg-transparent p-2 rounded hover:bg-slate-700 select-none cursor-pointer'
      onClick={onClick}
    >
      <pre>{value.join('\n') || <p className='text-center text-sky-400 border-2 border-sky-600 rounded'>Add plaforms</p>}</pre>
    </div>
  )
}
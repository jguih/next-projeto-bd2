import { ReactElement } from "react";

export default function InsertButton({ ...props }) {
  return (
    <button
      className='py-1 px-2 border border-slate-600 bg-emerald-800 hover:bg-emerald-600 rounded-md'
      {...props}
    >Inserir</button>
  );
}
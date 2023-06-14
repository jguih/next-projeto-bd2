import React, { ChangeEventHandler, useEffect, useState } from "react";

type CheckboxData = {
  checked: boolean | undefined,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  label: string,
  id: string,
}

export default function Checkbox({
  label, id, checked, onChange
}: CheckboxData) {
  return (
    <div
      className={`hover:bg-slate-600 bg-slate-700 rounded select-none flex items-center ${checked && 'bg-sky-800 hover:bg-sky-600'}`}
    >
      <input id={id} type='checkbox' onChange={onChange} checked={checked}
        className='ml-2 accent-sky-600 w-5 h-5 peer'
      />
      <label htmlFor={id} 
        className='w-full select-none cursor-pointer p-2 peer-checked:text-sky-500'
      >{label}</label>
    </div>
  );
}
import { Input } from "./input";
import Button from "./button";
import Dropdown from "./dropdown";
import { FormEventHandler, useEffect, useState } from "react";
import DropdownItem from "./dropdownItem";
import Checkbox from "./checkbox";
import { handleSubmit } from "@/services/gameFormService";
import PlatformsDropdown from "./platformsDropdown";

type GameFormData = {
  className: string,
}

export default function GameForm({className}: {className: string}) {
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<PlatformsDropdownData>({})

  const getPlatforms = (): string[] => {
    const values = checkedCheckboxes ?
      Object.entries(checkedCheckboxes)
        .filter(value => value[1].checked)
        .map(value => value[0]) : null
    
    return values || [];
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, getPlatforms())} className={className}>
      <label className='block'>
        <span className='block text-sm'>Name</span>
        <Input name='name' type='text' required></Input>
      </label>
      <label className='block mt-3'>
        <span className='block text-sm'>Description</span>
        <Input name='enUS_description' type='text'></Input>
      </label>
      <label className='block mt-3 mb-3'>
        <span className='block text-sm'>Price</span>
        <Input
          name='price'
          type='number'
          min='0.00'
          step='0.01'
          required
        ></Input>
      </label>
      <label className='mb-3'>
        <span>Discount</span>
        <div className='flex gap-3'>
          <Input
            name='discount'
            type='number'
            min='0.00'
            max='1.00'
            step='0.01'
            defaultValue='0'
            className='flex-1'
            required
          />
          <input
            name='isDiscountActive'
            type='checkbox'
            className='w-8 h-8 mt-2 accent-green-600 flex-none rounded'
            defaultChecked={true}
          />
        </div>
      </label>
      <PlatformsDropdown
        checkedCheckboxes={checkedCheckboxes}
        setCheckedCheckboxes={setCheckedCheckboxes}
        id='gameForm'
      />
      <hr className='mt-3 border border-slate-700'></hr>
      <div className='w-fit mx-auto'>
        <Button type='submit' className='mt-3 mx-auto bg-green-600 hover:bg-green-800'>Adicionar Jogo</Button>
      </div>
    </form>
  )
}
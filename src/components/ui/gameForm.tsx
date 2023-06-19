import { Input } from "./input";
import Button from "./button";
import { handleSubmit } from "@/services/gameFormService";
import PlatformsDropdown from "./platformsDropdown";
import { useState } from "react";
import { TextArea } from "./textArea";

export default function GameForm({className}: {className: string}) {
  const [toggleResetDropdown, setToggleResetDropdown] = useState(false)
  let platforms: string[] = []

  const handleOnChange = (state: PlatformsDropdownData[]) => {
    const values = state
      .filter(val => val.checked)
      .map(val => val.platform.name)
    platforms = values;
  }

  const onSuccess = () => {
    setToggleResetDropdown(old => !old)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, platforms, onSuccess)} className={className}>
      <label className='block'>
        <span className='block text-sm'>Name</span>
        <Input name='name' type='text' required></Input>
      </label>
      <label className='block mt-3'>
        <span className='block text-sm'>Description</span>
        <TextArea name='enUS_description' className='h-32' />
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
            className='w-8 h-8 mt-2 accent-green-600 flex-none border rounded'
            defaultChecked={false}
          />
        </div>
      </label>
      <div className='mt-3'>
        <PlatformsDropdown
          onChange={handleOnChange}
          id='gameForm'
          reset={toggleResetDropdown}
        />
      </div>
      <hr className='mt-3 border border-slate-700'></hr>
      <div className='w-fit mx-auto'>
        <Button type='submit' className='mt-3 mx-auto bg-green-700 hover:bg-green-600'>Add Game</Button>
      </div>
    </form>
  )
}
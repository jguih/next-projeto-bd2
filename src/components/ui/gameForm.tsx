import { Input } from "./input";
import Button from "./button";
import Dropdown from "./dropdown";

export default function GameForm({ onSubmit, className }: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <label className='block'>
        <span className='block text-sm'>Nome</span>
        <Input name='name' type='text' required></Input>
      </label>
      <label className='block mt-3'>
        <span className='block text-sm'>Descrição</span>
        <Input name='description' type='text'></Input>
      </label>
      <label className='block mt-3 mb-3'>
        <span className='block text-sm'>Preço</span>
        <Input
          name='price'
          type='number'
          min='0.00'
          step='0.01'
          required
        ></Input>
      </label>
      <label className='mb-3'>
        <span>Desconto</span>
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
      <Dropdown className='mt-3'>
        
      </Dropdown>
      <hr className='mt-3 border border-slate-700'></hr>
      <div className='w-fit mx-auto'>
        <Button type='submit' className='mt-3 mx-auto bg-green-600 hover:bg-green-800'>Adicionar Jogo</Button>
      </div>
    </form>
  )
}
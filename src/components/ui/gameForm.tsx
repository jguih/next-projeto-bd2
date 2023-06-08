import { Input } from "./input";
import Button from "./button";

export default function GameForm({ onSubmit }: React.ComponentPropsWithoutRef<'form'>) {
  return (
    <form onSubmit={onSubmit}>
      <label className='block'>
        <span className='block text-sm'>Nome</span>
        <Input name='name' type='text' required></Input>
      </label>
      <label className='block mt-3'>
        <span className='block text-sm'>Descrição</span>
        <Input name='description' type='text'></Input>
      </label>
      <label className='block mt-3'>
        <span className='block text-sm'>Preço</span>
        <Input 
          name='price' 
          type='number' 
          min='0.00' 
          step='0.01'
          required
        ></Input>
      </label>
      <label className='mb-3'>Desconto</label>
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
      <Button type='submit' className='mt-3'>Inserir</Button>
    </form>
  )
}
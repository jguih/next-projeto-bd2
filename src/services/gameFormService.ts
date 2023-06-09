import axios from 'axios';

function getInput(input: any) {
  return input instanceof HTMLInputElement ? input : null
}

function parse(value: string) {
  return Number.parseFloat(value)
}

// const formatter = Intl.NumberFormat('en-US',{ minimumFractionDigits: 2, maximumFractionDigits: 2 })
export async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  
  const form = event.target as HTMLFormElement
  const elements = form.elements
  const getElement = (name: string) => elements.namedItem(name)
  const newGame: Game = {
    name: getInput(getElement('name'))?.value || '',
    enUS_description: getInput(getElement('enUS_description'))?.value || '',
    price: parse(getInput(getElement('price'))?.value || ''),
    discount: parse(getInput(getElement('discount'))?.value || ''),
    isDiscountActive: getInput(getElement('isDiscountActive'))?.checked || false
  }
  
  axios.post('/api/game', newGame)
    .then((res) => {
      console.log(res)
      form.reset()
    })
    .catch((err) => {
      console.log(err)
    })
}
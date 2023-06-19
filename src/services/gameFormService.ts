import { game } from "./httpService";

function getTextArea(input: any) {
  return input instanceof HTMLTextAreaElement ? input : null
}

function getInput(input: any) {
  return input instanceof HTMLInputElement ? input : null
}

function parse(value: string) {
  return Number.parseFloat(value)
}

export async function handleSubmit(
    event: React.FormEvent, platforms: string[], onSuccess?: () => void
  ) {
  event.preventDefault();
  
  const form = event.target as HTMLFormElement
  const elements = form.elements
  const getElement = (name: string) => elements.namedItem(name)
  const newGame: Game = {
    name: getInput(getElement('name'))?.value || '',
    enUS_description: getTextArea(getElement('enUS_description'))?.value || '',
    price: parse(getInput(getElement('price'))?.value || ''),
    discount: parse(getInput(getElement('discount'))?.value || ''),
    isDiscountActive: getInput(getElement('isDiscountActive'))?.checked || false,
    platforms: platforms
  }  

  game.add(newGame)
    .then((res) => {
      if (res.ok) {
        form.reset();
        onSuccess?.()
      }
    })
}
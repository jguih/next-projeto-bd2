type Game = {
  id?: number,
  name: string,
  enUS_description: string,
  price: number,
  discount: number,
  isDiscountActive: boolean,
  platforms: string[]
}

type next_api_data = {
  rows: Game[]
}
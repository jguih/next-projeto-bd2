type Game = {
  id_game?: number,
  name: string,
  description: string,
  price: number,
  discount: number,
  isDiscountActive: boolean
}

type next_api_data = {
  rows: Game[]
}
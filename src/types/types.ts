type Game = {
  id?: number,
  name: string,
  enUS_description: string,
  price: number,
  discount: number,
  isDiscountActive: boolean,
  platforms: string[]
}

type Platform = {
  id: number,
  name: string
}

type next_api_data = {
  rows: any[]
}

type CheckboxEvent = {
  value: any, 
  checked: boolean
}

type PlatformsDropdownData = {
  [name: string]: {
    checked: boolean
  }
}
export interface IFood {
  id?: number
  created_at: string
  user_id?: string
  updated_at?: string
  restaurant?: string
  rating?: number
  calories?: string
  protein?: string
  food_name?: string
  opinion?: string
  image?: string
}

export type TFoodUpdate = Omit<IFood, 'created_at'>

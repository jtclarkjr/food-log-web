import { createClient } from '@/app/utils/supabase/server'
import { Food } from './types'

export const fetchFoods = async (): Promise<Food[] | null> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('Food')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching foods:', error)
    return null
  }

  // console.log(data);
  return data
}

export const createFood = async (food: Omit<Food, 'id' | 'user_id'>): Promise<void> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const newFood = { ...food, user_id: user.id }

  const { error } = await supabase.from('Food').insert(newFood)

  if (error) {
    console.error('Error creating food:', error)
    throw error
  }
}

export const updateFood = async (food: Food): Promise<void> => {
  if (!food.id) throw new Error('Food ID is required for update')

  const supabase = await createClient()
  const { error } = await supabase.from('Food').update(food).eq('id', food.id)

  if (error) {
    console.error('Error updating food:', error)
    throw error
  }
}

export const deleteFood = async (id: number): Promise<void> => {
  const supabase = await createClient()
  const { error } = await supabase.from('Food').delete().eq('id', id)

  if (error) {
    console.error('Error deleting food:', error)
    throw error
  }
}

export const uploadImage = async (file: File): Promise<string | null> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const fileName = `${user.id}/${Date.now()}_${file.name}`
  const { error } = await supabase.storage.from('images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName)

  return data.publicUrl
}

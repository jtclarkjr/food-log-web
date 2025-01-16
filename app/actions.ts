import { createClient } from '@/app/utils/supabase/server'
import { IFood } from './types'
import { forbidden, unauthorized } from 'next/navigation'

export const fetchFoods = async (): Promise<IFood[] | null> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()

  const { data, error } = await supabase
    .from('Food')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching foods:', error)
  }

  return data
}

export const createFood = async (food: Omit<IFood, 'id' | 'user_id'>): Promise<void> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()

  const newFood = { ...food, user_id: user.id }

  const { error } = await supabase.from('Food').insert(newFood)

  if (error) {
    console.error('Error creating food:', error)
    throw error
  }
}

export const updateFood = async (food: IFood): Promise<void> => {
  if (!food.id) throw new Error('Food ID is required for update')

  const supabase = await createClient()
  const { error, count } = await supabase.from('Food').update(food).eq('id', food.id)

  if (error) {
    console.error('Error updating food:', error)
    throw error
  }

  if (count === 0) {
    console.warn('No rows updated, possible invalid ID or insufficient permissions')
    forbidden()
  }
}

export const deleteFood = async (id: number): Promise<void> => {
  const supabase = await createClient()
  const { error, count } = await supabase.from('Food').delete().eq('id', id)

  if (error) {
    console.error('Error deleting food:', error)
    throw error
  }

  if (count === 0) {
    console.warn('No rows deleted, possible invalid ID or insufficient permissions')
    forbidden()
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

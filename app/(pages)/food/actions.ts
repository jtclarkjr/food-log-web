'use server'
import { createClient } from '@/utils/supabase/server'
import { IFood, TFoodUpdate } from '@/types'
import { forbidden, redirect, unauthorized } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { track } from '@vercel/analytics/server'
import { reportValue } from '@vercel/flags'

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

export const fetchFoodById = async (foodId: string): Promise<IFood | null> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()

  const { data, error } = await supabase
    .from('Food')
    .select('*')
    .eq('id', foodId)
    .eq('user_id', user.id)
    .single() // Ensures only one result is returned

  if (error) {
    console.error('Error fetching food by ID:', error)
    return null
  }

  return data
}

export const createFood = async (formData: FormData): Promise<void> => {
  const imageFile = formData.get('image') as File | null

  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()

  let imageUrl: string | null = null
  if (imageFile) {
    imageUrl = await uploadImage(imageFile)
    if (!imageUrl) {
      console.error('Image upload failed')
      throw new Error('Image upload failed')
    }
  }
  const food: TFoodUpdate = {
    food_name: formData.get('food_name') as string,
    restaurant: formData.get('restaurant') as string,
    rating: Number(formData.get('rating')),
    calories: formData.get('calories') as string,
    protein: formData.get('protein') as string,
    opinion: formData.get('opinion') as string,
    image: imageUrl
  }

  const newFood = { ...food, user_id: user.id }

  const { error } = await supabase.from('Food').insert(newFood)

  if (error) {
    console.error('Error creating food:', error)
    throw error
  }

  revalidatePath('/food', 'layout')
  redirect('/food')
}

export const updateFood = async (formData: FormData): Promise<void> => {
  const id = Number(formData.get('id'))
  const imageFile = formData.get('image') as File | null
  const currentImage = formData.get('currentImage') as string

  if (!id) throw new Error('Food ID is required for update')

  let imageUrl: string | null = null
  if (currentImage && imageFile?.name === 'undefined') {
    imageUrl = currentImage
  } else if (imageFile) {
    imageUrl = await uploadImage(imageFile, currentImage)
    if (!imageUrl) {
      console.error('Image upload failed')
      throw new Error('Image upload failed')
    }
  }

  const food: TFoodUpdate = {
    food_name: formData.get('food_name') as string,
    restaurant: formData.get('restaurant') as string,
    rating: Number(formData.get('rating')),
    calories: formData.get('calories') as string,
    protein: formData.get('protein') as string,
    opinion: formData.get('opinion') as string,
    image: imageUrl
  }

  const supabase = await createClient()
  const { error, count } = await supabase.from('Food').update(food).eq('id', id)

  if (error) {
    console.error('Error updating food:', error)
    throw error
  }

  if (count === 0) {
    console.warn('No rows updated, possible invalid ID or insufficient permissions')
    forbidden()
  }
  reportValue('food', true)
  track('Update', {
    id: food.id || ''
  }),
    { flags: ['food'] }

  revalidatePath('/food', 'layout')
  redirect('/food')
}

export const deleteFood = async (formData: FormData): Promise<void> => {
  const id = Number(formData.get('id'))
  const image = formData.get('image') as string
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()
  const { error, count } = await supabase.from('Food').delete().eq('id', id)

  if (image) {
    const parts = image.split('/')
    const currentImageFile = parts[parts.length - 1]
    await deleteCurrentImage(currentImageFile)
  }

  if (error) {
    console.error('Error deleting food:', error)
    throw error
  }

  if (count === 0) {
    console.warn('No rows deleted, possible invalid ID or insufficient permissions')
    forbidden()
  }

  revalidatePath('/food', 'layout')
  redirect('/food')
}

const deleteCurrentImage = async (currentImage: string): Promise<void> => {
  const supabase = await createClient()
  const { error } = await supabase.storage.from('images').remove([`public/${currentImage}`])
  if (error) {
    console.error('Error deleting image from storage:', error)
    throw new Error('Image removal failed')
  }
}

export const uploadImage = async (file: File, oldFileUrl?: string): Promise<string> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  let fileName: string = ''

  if (oldFileUrl) {
    const parts = oldFileUrl.split('/')
    const currentImageFile = parts[parts.length - 1]
    fileName = `public/${currentImageFile}`
    const { error } = await supabase.storage.from('images').update(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    if (error) {
      console.error('Error updating image:', error)
      throw new Error('Image update failed')
    }
  } else {
    fileName = `public/${randomUUID().toUpperCase()}.jpg`
    const { error } = await supabase.storage.from('images').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    if (error) {
      console.error('Error uploading image:', error)
      throw new Error('Image upload failed')
    }
  }

  revalidatePath('/food', 'layout')

  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}

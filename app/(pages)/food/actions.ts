'use server'
import { createClient } from '@/utils/supabase/server'
import { IFood, TFoodUpdate } from '@/types'
import { forbidden, redirect, unauthorized } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'

// export const fetchFoods = async (): Promise<IFood[] | null> => {
//   const supabase = await createClient()
//   const {
//     data: { user },
//     error: userError
//   } = await supabase.auth.getUser()

//   // Redirects to unauthorized if no user
//   if (userError || !user) {
//     console.error('User not authenticated:', userError)
//     unauthorized()
//     return null
//   }

//   // Retrieve the user's authentication token
//   const {
//     data: { session },
//     error: sessionError
//   } = await supabase.auth.getSession()

//   if (sessionError || !session) {
//     console.error('Error retrieving session:', sessionError)
//     unauthorized()
//     return null
//   }

//   const token = session.access_token

//   try {
//     const response = await fetch('https://food-api.fly.dev/food', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}` // Include the token in the Authorization header
//       }
//     })

//     if (!response.ok) {
//       console.error('Error fetching foods:', response.statusText)
//       return null
//     }

//     const data: IFood[] = await response.json()
//     return data
//   } catch (error) {
//     console.error('Error fetching foods:', error)
//     return null
//   }
// }

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
  console.log(imageFile)
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
  if (currentImage && !imageFile) {
    imageUrl = currentImage
  }
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

  revalidatePath('/food', 'layout')
  redirect('/food')
}

export const deleteFood = async (formData: FormData): Promise<void> => {
  const id = Number(formData.get('id'))
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  // redirects to unauthorized if no user
  if (!user) unauthorized()
  const { error, count } = await supabase.from('Food').delete().eq('id', id)

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

export const uploadImage = async (file: File): Promise<string | null> => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const fileName = `public/${randomUUID().toUpperCase()}.jpg`
  const { error } = await supabase.storage.from('images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false
  })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  console.log(data)

  return data.publicUrl
}

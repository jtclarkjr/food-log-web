'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/auth/login?error=login')
  }

  revalidatePath('/food', 'layout')
  redirect('/food')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/auth/login?error=signup')
  }

  revalidatePath('/food', 'layout')
  redirect('/food')
}

// Currently has proper flow but no returned session so no login
// Also need to figure out on supabase how to get ios app and web, client ids working together
export const appleSignIn = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `` // supabase callback url
    }
  })

  if (data.url) {
    redirect(data.url)
  }

  if (error) {
    console.error('Error during Apple sign-in:', error)
  }
}

export async function signout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }
  redirect('/auth/login')
}

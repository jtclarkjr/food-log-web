import { redirect } from 'next/navigation'

export default function Unauthorized() {
  console.error('Invalid user')
  redirect('/auth/login')
}

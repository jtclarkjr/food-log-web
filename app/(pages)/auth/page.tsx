import { login, signout, signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import AuthError from './_components/authError'

export default async function AuthPage() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    return (
      <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
        <h1>Signout confirm</h1>
        <form style={{ marginTop: '1rem' }} action={signout}>
          <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '1rem' }}>
            Signout
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
      <h1>Sign in</h1>
      <form style={{ marginTop: '1rem' }}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
          autoComplete="current-password"
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', marginTop: '1rem' }}
          formAction={login}
        >
          Log In
        </button>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '1rem',
            border: '1px solid black'
          }}
          formAction={signup}
        >
          Sign Up
        </button>
      </form>
      <AuthError />
    </div>
  )
}

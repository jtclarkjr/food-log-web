import { login, signout, signup } from './actions'
import { createClient } from '@/app/utils/supabase/server'

export default async function LoginPage() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()
  if (data?.user) {
    return (
      <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
        <h1>Signout</h1>
        <form style={{ marginTop: '1rem' }} action={signout} method="post">
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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
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
    </div>
  )
}

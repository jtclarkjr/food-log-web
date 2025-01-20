import { Suspense } from 'react'
import AuthError from '../_components/authError'
import { signup } from '../actions'
import Link from 'next/link'

export default function AuthSignUpPage() {
  return (
    <Suspense>
      <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
        <h1>Sign Up</h1>
        <form style={{ marginTop: '1rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '1rem',
              border: 'solid gray 1px',
              borderRadius: 10,
              fontSize: '16px'
            }}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '15px',
              marginBottom: '1rem',
              border: 'solid gray 1px',
              borderRadius: 10,
              fontSize: '16px'
            }}
            autoComplete="current-password"
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '1rem',
              borderRadius: 5,
              border: '1px solid transparent',
              fontSize: '16px'
            }}
            formAction={signup}
          >
            Sign Up
          </button>
        </form>
        <div style={{ margin: '20px auto' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: '#0070f3', cursor: 'pointer' }}>
            Sign in here
          </Link>
        </div>
        <AuthError />
      </div>
    </Suspense>
  )
}

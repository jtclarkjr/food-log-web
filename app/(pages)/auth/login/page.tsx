import React, { Suspense } from 'react'
import { login, signup } from '../actions'
import AppleSignInButton from '../_components/appleSignin'
import AuthError from '../_components/authError'
import DiscordSignInButton from '../_components/discordSignIn'

export default function AuthLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            style={{
              width: '100%',
              padding: '15px',
              marginTop: '1rem',
              border: '1px solid black'
            }}
            formAction={login}
          >
            Log In
          </button>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              marginTop: '1rem',
              border: '1px solid black'
            }}
            formAction={signup}
          >
            Sign Up
          </button>
        </form>
        <AppleSignInButton />
        <DiscordSignInButton />
        <AuthError />
      </div>
    </Suspense>
  )
}

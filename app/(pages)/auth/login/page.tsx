import React, { Suspense } from 'react'
import EmailSignIn from '../_components/emailSignIn'
import AppleSignInButton from '../_components/appleSignin'
import AuthError from '../_components/authError'
import DiscordSignInButton from '../_components/discordSignIn'
import Link from 'next/link'

export default function AuthLoginPage() {
  return (
    <Suspense>
      <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
        <h1>Food log</h1>
        <div style={{ marginTop: '30px', marginBottom: '48px' }}>Please sign in to continue</div>
        <EmailSignIn />
        <AppleSignInButton />
        <DiscordSignInButton />
        <AuthError />
        <div style={{ margin: '20px auto' }}>
          <>Don&apos;t have an account?</>
          <Link href="/auth/signup" style={{ color: '#0070f3' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </Suspense>
  )
}

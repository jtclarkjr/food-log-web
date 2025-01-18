'use client'

import AppleIcon from '@mui/icons-material/Apple'
import { createClient } from '@/utils/supabase/client'

export default function AppleSignInButton() {
  const login = async () => {
    try {
      const supabase = await createClient()
      await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'https://food-log-web.vercel.app'
        }
      })
    } catch (error) {
      console.error('Error during Apple Sign-In:', error)
    }
  }

  return (
    <button
      type="button"
      onClick={login}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '15px',
        marginTop: '1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'var(--apple-button-bg)',
        color: 'var(--apple-button-text)',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      <AppleIcon style={{ marginRight: '8px' }} />
      Sign in with Apple
    </button>
  )
}

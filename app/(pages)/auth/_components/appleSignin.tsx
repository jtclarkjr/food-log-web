import Image from 'next/image'
import { signInWithApple } from '../actions'
import AppleIcon from '@public/icons/apple.svg'

export default function AppleSignInButton() {
  return (
    <form style={{ marginTop: '1rem' }}>
      <button
        type="submit"
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
        formAction={signInWithApple}
      >
        <Image priority src={AppleIcon} alt="apple" width={20} height={20} />
        <div style={{ marginLeft: '8px' }}>Sign in with Apple</div>
      </button>
    </form>
  )
}

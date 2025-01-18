import AppleIcon from '@mui/icons-material/Apple'
import { signInWithApple } from '../actions'

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
        <AppleIcon style={{ marginRight: '8px' }} />
        Sign in with Apple
      </button>
    </form>
  )
}

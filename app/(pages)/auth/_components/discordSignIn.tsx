import { signInWithDiscord } from '../actions'

export default function DiscordSignInButton() {
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
          backgroundColor: 'rgb(88, 101, 242)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px'
        }}
        formAction={signInWithDiscord}
      >
        Discord
      </button>
    </form>
  )
}

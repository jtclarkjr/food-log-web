import { signout } from '../actions'

export default async function AuthPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '8rem auto', textAlign: 'center' }}>
      <h1>Signout confirm</h1>
      <form style={{ marginTop: '1rem' }} action={signout}>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            marginTop: '1rem',
            border: '1px solid',
            cursor: 'pointer'
          }}
        >
          Signout
        </button>
      </form>
    </div>
  )
}

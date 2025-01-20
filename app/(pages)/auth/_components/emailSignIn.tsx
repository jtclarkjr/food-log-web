import { login } from '../actions'

export default function EmailSignIn() {
  return (
    <div>
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
          formAction={login}
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: '100%',
        padding: '15px',
        marginTop: '1rem',
        border: '1px solid black',
        cursor: pending ? 'not-allowed' : 'pointer',
        opacity: pending ? 0.6 : 1
      }}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  )
}

'use client'

import { useFormStatus } from 'react-dom'

export default function Button({ variant }: { variant: string }) {
  const { pending } = useFormStatus()

  // Determine button label and styles based on the variant
  const isSave = variant === 'save'
  const label = pending ? (isSave ? 'Saving...' : 'Deleting...') : isSave ? 'Save' : 'Delete'
  const buttonStyle = {
    width: '100%',
    padding: isSave ? '15px' : '10px',
    marginTop: isSave ? '1rem' : 0,
    border: '1px solid black',
    cursor: pending ? 'not-allowed' : 'pointer',
    opacity: pending ? 0.6 : 1,
    color: 'white'
  }

  return (
    <button
      type="submit"
      disabled={pending}
      style={buttonStyle}
      className={isSave ? 'save-button' : 'delete-button'}
    >
      <div style={{ fontSize: '16px' }}>{label}</div>
    </button>
  )
}

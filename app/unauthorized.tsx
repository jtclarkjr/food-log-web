'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Unauthorized() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Decrement the countdown every second
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // Redirect to the login page after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/login')
    }, 5000)

    // Clear timers on component unmount
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <div>
      <h2>Unauthorized</h2>
      <p>Please log in to access this page.</p>
      <p>Redirecting to the login page in {countdown} seconds...</p>
      <p>OR</p>
      <Link style={{ color: 'blue' }} href="/login">
        Login here
      </Link>
    </div>
  )
}

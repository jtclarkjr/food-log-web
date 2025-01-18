'use client'
import React, { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AuthError() {
  const params = useSearchParams()
  // Initialize paramElements as an array of ReactNode
  const paramElements: ReactNode[] = []
  params.forEach((value, key) => {
    paramElements.push(
      <div key={key} style={{ color: 'red' }}>
        {value} {key}
      </div>
    )
  })

  return <>{paramElements}</>
}

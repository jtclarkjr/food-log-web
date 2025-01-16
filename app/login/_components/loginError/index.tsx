'use client'
import React, { ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginError() {
  const params = useSearchParams()

  // Initialize paramElements as an array of ReactNode
  const paramElements: ReactNode[] = []
  params.forEach((value, key) => {
    paramElements.push(
      <div key={key}>
        {key}: {value}
      </div>
    )
  })

  return <>{paramElements}</>
}

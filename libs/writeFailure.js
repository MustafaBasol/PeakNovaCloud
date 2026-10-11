import { NextResponse } from 'next/server'
import { failureBody } from '@/libs/httpError'

export function writeFailure(error) {
  const { status, body } = failureBody(error)
  return NextResponse.json(body, { status })
}

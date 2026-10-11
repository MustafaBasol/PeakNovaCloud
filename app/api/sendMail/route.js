import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import { processContact } from '@/libs/contactRequest'

async function sendWithSmtp(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
  await transporter.sendMail(message)
}

export async function POST(request) {
  const raw = await request.text()
  const result = await processContact({
    raw,
    headers: request.headers,
    send: sendWithSmtp,
    env: process.env,
  })
  if (result.log) console.error(JSON.stringify(result.log))
  const response = NextResponse.json(result.body, { status: result.status })
  if (result.retryAfter) response.headers.set('Retry-After', String(result.retryAfter))
  return response
}

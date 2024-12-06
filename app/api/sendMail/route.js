import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'
import 'dotenv/config'

export async function POST(request) {
    try {
        const { data } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sadikvurmaz@gmail.com',
                pass: process.env.MAIL_PASS
            }
        })

        const mailOption = {
            from:`${data.email}`,
            to: process.env.EMAIL,
            subject: "Potansiyel Müşteri",
            html: `
                <h3>YENİ MÜSTERİ</h3>
                <li> isim: ${data.name}</li>
                <li> soyisim: ${data.surname}</li>
                <li> email: ${data.email}</li>
                <li> tel: ${data.telefon}</li>
                <p> istek: ${data.servis}</p> 
            `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}


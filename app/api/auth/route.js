import { generateToken } from "@/libs/auth";
import { NextResponse } from "next/server";
import connectDB from "@/libs/dbConnect";
import { serialize } from 'cookie';


export async function POST(request) {
    await connectDB()
    const thePassword = process.env.PASSWORD
    const req = await request.json()
    const password = await req.password
    
    if (!password) {    
        return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
    }
    if (password !== thePassword) {
        return NextResponse.json({ success: false, error: 'Invalid password.' }, { status: 400 });
    }
    const token = generateToken();



    const response =  NextResponse.json({ success: true, message: 'Login successful', token });   
    
    response.cookies.set('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 3600, 
      path: '/', 
    });    

    return response
}
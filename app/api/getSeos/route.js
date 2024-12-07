
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import { authenticate } from '../../../middleware/auth.js'
import SEO from '@/models/Seo.js'

export async function GET(req) {
     await connectDB()   
     
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    
    const data =  await SEO.find({ language:language }).sort({ createdAt:1 })
    return NextResponse.json({ data:data }, { status: 200 })    

}
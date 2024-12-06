
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import ABOUT from '@/models/About'
import { authenticate } from '../../../middleware/auth.js'

export async function GET(req) {
     await connectDB()   
     
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang'); 

     const data = await ABOUT.find({ language }).sort({ createdAt:1 })
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function POST(request) {
     await connectDB()
     
     try {
          await authenticate(request)
          const req = await request.json()
          const about = await ABOUT.create({ title:req.title, description:req.description, language:req.language });
          return NextResponse.json({ success: true, data: about }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();

     try {
          await authenticate(request)
          const req = await request.json()          
          const about = await ABOUT.findByIdAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: about }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const about = await ABOUT.findOneAndUpdate(
               { _id:req._id }, 
               { title:req.title, description:req.description, language:req.language },
               { new:true }
          )
          return NextResponse.json({ success: true, data: about }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
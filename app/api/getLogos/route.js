
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import LOGOS from '@/models/Logos'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
     await connectDB()     

     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data = await LOGOS.find({ language }).sort({ createdAt:1 })
     return NextResponse.json({ data:data }, { status: 200 })      
}

export async function POST(request) {
     await connectDB()
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const logos = await LOGOS.create({ 
               name:req.name, 
               Icon:req.Icon, 
               language:req.language, 
               color:req.color, 
               description:req.description
          });
          return NextResponse.json({ success: true, data: logos }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const logos = await LOGOS.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: logos }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
    
     try {
          await authenticate(request)
          const req = await request.json()          
          const logos = await LOGOS.findOneAndUpdate(
               { _id:req._id }, 
               { name:req.name, Icon:req.Icon, language:req.language, color:req.color, decription:req.description },
               { new:true }
          )
          return NextResponse.json({ success: true, data: logos }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
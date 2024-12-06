
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import PROJECT from '@/models/Project'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
     await connectDB()     

     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data = await PROJECT.find({ language }).sort({ createdAt:-1 })
     return NextResponse.json({ data:data }, { status: 200 })      
}

export async function POST(request) {
     await connectDB()
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const project = await PROJECT.create({ 
               name:req.name, 
               title:req.title, 
               language:req.language, 
               image:req.image, 
               description:req.description
          });
          return NextResponse.json({ success: true, data: project }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
        
     try {
          await authenticate(request)
          const req = await request.json()          
          const project = await PROJECT.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: project }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const project = await PROJECT.findOneAndUpdate(
               { _id:req._id }, 
               { name:req.name, title:req.title, language:req.language, image:req.image, decription:req.description },
               { new:true }
          )
          return NextResponse.json({ success: true, data: project }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
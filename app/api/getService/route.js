
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import SERVICE from '@/models/Service'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
     await connectDB()     
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data =  await SERVICE.find({ language:language }).sort({ createdAt:1 })
     
     return NextResponse.json({ data:data }, { status: 200 })    
}


export async function DELETE(request) {
     await connectDB();
      
     try {
          await authenticate(request)
          const req = await request.json()          
          const service = await SERVICE.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: service }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
    await connectDB(); 

     try {
          await authenticate(request)
          const req = await request.json()          
        const updateData = {};

        if (req.description) updateData.description = req.description;
        if (req.title) updateData.title = req.title;
        if (req.image) updateData.image = req.image;
        if (req.buttonText) updateData.buttonText = req.buttonText;
        if (req.service) updateData.service = req.service;
        if (req.section) updateData.section = req.section;
        if (req.language) updateData.language = req.language;
        if (req.cards) updateData.cards = req.cards;    

          const page = await SERVICE.updateMany(
          { section: req.section, language: req.language }, 
          { 
               $set:updateData               
          }
          )
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
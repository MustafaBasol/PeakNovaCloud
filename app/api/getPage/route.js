
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import PAGE from '@/models/Page'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
     await connectDB()     
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');
     const page = searchParams.get('page')

     const data =  await PAGE.find({ language:language, section: { $regex: page } }).sort({ createdAt:1 })
     
     return NextResponse.json({ data:data }, { status: 200 })    
}

export async function POST(request) {
     await connectDB()
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const page = await PAGE.create({ 
               section:req.section,
               title:req.title, 
               description:req.description, 
               image:req.image,
               buttonText:req.buttonText,
               language:req.language,
               cards:req.cards
          });
          return NextResponse.json({ success: true, data: page }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
      
     try {
          await authenticate(request)
          const req = await request.json()          
          const page = await PAGE.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();

     try {
          await authenticate(request)
          const req = await request.json()          
          const page = await PAGE.findOneAndUpdate(
               { _id:req._id }, 
               {                     
                    section:req.section,
                    title:req.title, 
                    description:req.description, 
                    image:req.image,
                    buttonText:req.buttonText,
                    language:req.language,
                    cards:req.cards
               },
               { new:true }
          )
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import SERVICE from '@/models/Service'
import { authenticate } from '@/middleware/auth'

export async function GET(req, { params }) {
     await connectDB()     
     const name = params.serviceName
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data =  await SERVICE.find({ language:language, service: name }).sort({ createdAt:1 })
     
     return NextResponse.json({ data:data }, { status: 200 })    
}

export async function POST(request) {
     await connectDB()
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const service = await SERVICE.create({ 
              service:req.service,
              section:req.section,
              title:req.title, 
              description:req.description, 
              image:req.image,
              buttonText:req.buttonText,
              language:req.language,
              cards:req.cards
          });          
          return NextResponse.json({ success: true, data: service }, { status: 201 });
     } catch (error) {
          console.log(error)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const page = await SERVICE.findOneAndDelete({ _id:req._id });
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
          const page = await SERVICE.findOneAndUpdate(
               { _id:req._id }, 
               { 
                    service:req.service,
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
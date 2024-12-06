
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import FAQ from '@/models/Faq'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
  await connectDB();

  try {
    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get('lang');

    const data = await FAQ.find({ language }).sort({ createdAt: 1 });

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
     await connectDB()
 
     try {
          await authenticate(request); 
          const req = await request.json()             
          const faq = await FAQ.create({ question:req.question, answer:req.answer, language:req.language });
          return NextResponse.json({ success: true, data: faq }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
    
     try {
          await authenticate(request); 
          const req = await request.json()          
          const faq = await FAQ.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: faq }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
     
     try {
          await authenticate(request);
          const req = await request.json() 
          const faq = await FAQ.findOneAndUpdate(
               { _id:req._id }, 
               { question:req.question, answer:req.answer, language:req.language },
               { new:true }
          )
          return NextResponse.json({ success: true, data: faq }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
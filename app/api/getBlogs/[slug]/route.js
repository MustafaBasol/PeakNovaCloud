import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import BLOG from '@/models/Blog'
import { authenticate } from '@/middleware/auth'

export async function GET(req, { params }) {
    await connectDB()   
     
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    const slug = params.slug


     const data = await BLOG.findOne({ slug, language }).sort({ createdAt:-1 })
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function PATCH(request, { params }) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()         
        console.log(params.slug)
          const blog = await BLOG.findOneAndUpdate(
               { slug:params.slug }, 
                {                     
                    title:req.title, 
                    slug:req.slug, 
                    language:req.language,
                    content:req.content,
                    coverImage:req.coverImage,
                    seo:req.seo,
                    summary:req.summary                                             
                },
               { new:true, runValidators:true }
          )
          return NextResponse.json({ success: true, data: blog }, { status: 200 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
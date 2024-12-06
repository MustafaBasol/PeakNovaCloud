
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import BLOG from '@/models/Blog'
import { authenticate } from '@/middleware/auth'

export async function GET(request) {
     await connectDB()   
     
     const searchParams = (request.nextUrl.searchParams)
     const language = searchParams.get('lang'); 
     
     const data = await BLOG.find({ language }).sort({ createdAt:-1 })
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function POST(request) {
     await connectDB()     
     try {
          await authenticate(request)
          const req = await request.json()                  
          const blog = await BLOG.create({ 
            title:req.title, 
            slug:req.slug, 
            language:req.language,
            content:req.content,
            coverImage:req.coverImage,
            seo:req.seo,
            summary:req.summary
        });
        console.log(blog)
          return NextResponse.json({ success: true, data: blog }, { status: 201 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();
      
     try {
          await authenticate(request)
          const req = await request.json()          
          const blog = await BLOG.findOneAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: blog }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()

          const existingBlog = await BLOG.findOne({ slug: req.slug });

          if (existingBlog && existingBlog._id.toString() !== req._id) {
          // Slug already exists in another document
               return res.status(400).json({ error: 'Slug already exists. Please choose a different slug.' });
          }          

          const blog = await BLOG.findOneAndUpdate(
               { _id:req._id}, 
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
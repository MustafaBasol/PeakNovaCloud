
import { NextResponse } from 'next/server'
import {
     createBlog,
     deleteBlogById,
     findBlogBySlug,
     listBlogsByLanguage,
     updateBlogById,
} from '@/repositories/blogRepository'
import { authenticate } from '@/middleware/auth'

export async function GET(request) {
     const searchParams = (request.nextUrl.searchParams)
     const language = searchParams.get('lang'); 
     
     const data = await listBlogsByLanguage(language)
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()                  
          const blog = await createBlog(req);
          return NextResponse.json({ success: true, data: blog }, { status: 201 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const blog = await deleteBlogById(documentId);
          return NextResponse.json({ success: true, data: blog }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id

          const existingBlog = await findBlogBySlug(req.slug);

          if (existingBlog && existingBlog._id.toString() !== documentId) {
               return NextResponse.json({ success: false, error: 'Slug already exists. Please choose a different slug.' }, { status: 400 });
          }          

          const blog = await updateBlogById(documentId, req)
          return NextResponse.json({ success: true, data: blog }, { status: 200 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
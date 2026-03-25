import { NextResponse } from 'next/server'
import {
     getBlogBySlugAndLanguage,
     updateBlogBySlug,
} from '@/repositories/blogRepository'
import { authenticate } from '@/middleware/auth'

export async function GET(req, { params }) {
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    const slug = params.slug

     const data = await getBlogBySlugAndLanguage(slug, language)
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function PATCH(request, { params }) {
     try {
          await authenticate(request)
          const req = await request.json()         
          const blog = await updateBlogBySlug(params.slug, req)
          return NextResponse.json({ success: true, data: blog }, { status: 200 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

import { NextResponse } from 'next/server'
import { authenticate } from '../../../middleware/auth.js'
import {
           createSeo,
           deleteSeoById,
           listSeosByLanguage,
           listSeosByLanguageAndPage,
           updateSeoById,
} from '@/repositories/seoRepository'

export async function GET(req) {
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    const page = searchParams.get('page')
    if(page) {
               const data = await listSeosByLanguageAndPage(language, page)
      return NextResponse.json({ data:data }, { status: 200 })    
    } else {
                    const data = await listSeosByLanguage(language)
        return NextResponse.json({ data:data }, { status: 200 })        
    }
    
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()         
                         const seo = await createSeo(req);
        
          return NextResponse.json({ success: true, data: seo }, { status: 201 });
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
          const seo = await deleteSeoById(documentId);
          return NextResponse.json({ success: true, data: seo }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const seo = await updateSeoById(documentId, req)
          return NextResponse.json({ success: true, data: seo }, { status: 200 });
     } catch (error) {
          console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
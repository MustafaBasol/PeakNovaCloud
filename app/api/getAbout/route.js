
import { NextResponse } from 'next/server'
import {
     createAbout,
     deleteAboutById,
     listAboutByLanguage,
     updateAboutById,
} from '@/repositories/aboutRepository'
import { authenticate } from '../../../middleware/auth.js'

export async function GET(req) {
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang'); 

     const data = await listAboutByLanguage(language)
     return NextResponse.json({ data:data }, { status: 200 })         
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const about = await createAbout(req);
          return NextResponse.json({ success: true, data: about }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const about = await deleteAboutById(documentId);
          return NextResponse.json({ success: true, data: about }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const about = await updateAboutById(documentId, req)
          return NextResponse.json({ success: true, data: about }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
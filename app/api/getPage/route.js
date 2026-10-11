
import { NextResponse } from 'next/server'
import {
     createPage,
     deletePageById,
     listPagesByLanguageAndSection,
     updatePageById,
} from '@/repositories/pageRepository'
import { authenticate } from '@/middleware/auth'
import { writeFailure } from '@/libs/writeFailure'

export async function GET(req) {
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');
     const page = searchParams.get('page')

     const data = await listPagesByLanguageAndSection(language, page)
     
     return NextResponse.json({ data:data }, { status: 200 })    
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()          
          const page = await createPage(req);
          return NextResponse.json({ success: true, data: page }, { status: 201 });
     } catch (error) {
          return writeFailure(error);
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const page = await deletePageById(documentId);
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return writeFailure(error);
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const page = await updatePageById(documentId, req)
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return writeFailure(error);
     }     
}
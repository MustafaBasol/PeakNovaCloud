
import { NextResponse } from 'next/server'
import {
     createLogos,
     deleteLogosById,
     listLogosByLanguage,
     updateLogosById,
} from '@/repositories/logosRepository'
import { authenticate } from '@/middleware/auth'
import { writeFailure } from '@/libs/writeFailure'

export async function GET(req) {
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data = await listLogosByLanguage(language)
     return NextResponse.json({ data:data }, { status: 200 })      
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()          
          const logos = await createLogos(req);
          return NextResponse.json({ success: true, data: logos }, { status: 201 });
     } catch (error) {
          return writeFailure(error);
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const logos = await deleteLogosById(documentId);
          return NextResponse.json({ success: true, data: logos }, { status: 200 });
     } catch (error) {
          return writeFailure(error);
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const logos = await updateLogosById(documentId, req)
          return NextResponse.json({ success: true, data: logos }, { status: 200 });
     } catch (error) {
          return writeFailure(error);
     }     
}
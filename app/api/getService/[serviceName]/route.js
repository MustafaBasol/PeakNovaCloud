
import { NextResponse } from 'next/server'
import {
     createServicePage,
     deleteServicePageById,
     listServicePagesByNameAndLanguage,
     updateServicePageById,
} from '@/repositories/serviceRepository'
import { authenticate } from '@/middleware/auth'
import { writeFailure } from '@/libs/writeFailure'

export async function GET(req, { params }) {
     const { serviceName: name } = await params
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data = await listServicePagesByNameAndLanguage(name, language)
     
     return NextResponse.json({ data:data }, { status: 200 })    
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()          
          const service = await createServicePage(req);
          return NextResponse.json({ success: true, data: service }, { status: 201 });
     } catch (error) {
          return writeFailure(error);
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const page = await deleteServicePageById(documentId);
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
          const page = await updateServicePageById(documentId, req)
          return NextResponse.json({ success: true, data: page }, { status: 200 });
     } catch (error) {
          return writeFailure(error);
     }     
}
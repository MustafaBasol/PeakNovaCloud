
import { NextResponse } from 'next/server'
import {
     createServicePage,
     deleteServicePageById,
     listServicePagesByNameAndLanguage,
     updateServicePageById,
} from '@/repositories/serviceRepository'
import { authenticate } from '@/middleware/auth'

export async function GET(req, { params }) {
     const name = params.serviceName
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
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
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
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
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
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
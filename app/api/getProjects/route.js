
import { NextResponse } from 'next/server'
import {
     createProject,
     deleteProjectById,
     listProjectsByLanguage,
     updateProjectById,
} from '@/repositories/projectRepository'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
     const searchParams = (req.nextUrl.searchParams)
     const language = searchParams.get('lang');

     const data = await listProjectsByLanguage(language)
     return NextResponse.json({ data:data }, { status: 200 })      
}

export async function POST(request) {
     try {
          await authenticate(request)
          const req = await request.json()          
          const project = await createProject(req);
          return NextResponse.json({ success: true, data: project }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const project = await deleteProjectById(documentId);
          return NextResponse.json({ success: true, data: project }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request)
          const req = await request.json()
          const documentId = req.id || req._id
          const project = await updateProjectById(documentId, req)
          return NextResponse.json({ success: true, data: project }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

import { NextResponse } from 'next/server'
import {
           createFaq,
           deleteFaqById,
           listFaqByLanguage,
           updateFaqById,
} from '@/repositories/faqRepository'
import { authenticate } from '@/middleware/auth'

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get('lang');

          const data = await listFaqByLanguage(language);

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
     try {
          await authenticate(request); 
          const req = await request.json()             
          const faq = await createFaq(req);
          return NextResponse.json({ success: true, data: faq }, { status: 201 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     try {
          await authenticate(request); 
          const req = await request.json()
          const documentId = req.id || req._id
          const faq = await deleteFaqById(documentId);
          return NextResponse.json({ success: true, data: faq }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     try {
          await authenticate(request);
          const req = await request.json()
          const documentId = req.id || req._id
          const faq = await updateFaqById(documentId, req)
          return NextResponse.json({ success: true, data: faq }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
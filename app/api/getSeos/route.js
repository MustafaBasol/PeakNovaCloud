
import { NextResponse } from 'next/server'
import { listSeosByLanguage } from '@/repositories/seoRepository'

export async function GET(req) {
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    
    const data = await listSeosByLanguage(language)
    return NextResponse.json({ data:data }, { status: 200 })    

}
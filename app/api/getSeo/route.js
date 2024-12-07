
import { NextResponse } from 'next/server'
import connectDB from '@/libs/dbConnect'
import { authenticate } from '../../../middleware/auth.js'
import SEO from '@/models/Seo.js'

export async function GET(req) {
     await connectDB()   
     
    const searchParams = (req.nextUrl.searchParams)
    const language = searchParams.get('lang'); 
    const page = searchParams.get('page')
    if(page) {
      const data =  await SEO.find({ language:language, page: { $regex: page } }).sort({ createdAt:1 })
      return NextResponse.json({ data:data }, { status: 200 })    
    } else {
        const data =  await SEO.find({ language:language }).sort({ createdAt:1 }) 
        return NextResponse.json({ data:data }, { status: 200 })        
    }
    
}

export async function POST(request) {
     await connectDB()
     try {
          await authenticate(request)
          const req = await request.json()         
          const seo = await SEO.create({ 
            page:req.page,
            title:req.title, 
            description:req.description, 
            language:req.language, 
            keywords:req.keywords,
            URL:req.URL,
            slug:req.slug,
            ogTitle:req.ogTitle,
            ogDescription:req.ogDescription,
            ogImage:req.ogImage,
            robots:req.robots
        });
        
          return NextResponse.json({ success: true, data: seo }, { status: 201 });
     } catch (error) {
        console.log(error.message)
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function DELETE(request) {
     await connectDB();

     try {
          await authenticate(request)
          const req = await request.json()          
          const seo = await SEO.findByIdAndDelete({ _id:req._id });
          return NextResponse.json({ success: true, data: seo }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}

export async function PATCH(request) {
     await connectDB();
     
     try {
          await authenticate(request)
          const req = await request.json()          
          const about = await ABOUT.findOneAndUpdate(
               { _id:req._id }, 
               {
                    page:req.page,
                    title:req.title, 
                    description:req.description, 
                    language:req.language, 
                    URL:req.URL,
                    slug:req.slug,
                    ogTitle:req.ogTitle,
                    ogDesription:req.ogDesription,
                    ogImage:req.ogImage,
                    robots:req.robots                
               },
               { new:true }
          )
          return NextResponse.json({ success: true, data: about }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ success: false, error: error.message }, { status: 400 });
     }     
}
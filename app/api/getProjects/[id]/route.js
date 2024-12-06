import { NextResponse } from "next/server"
import PROJECT from "@/models/Project"

export async function GET(request, { params }) {
    const id = params.id
    const response = await PROJECT.findById(id)   
    if(!response) {
        return NextResponse.json({ data:'Project cannot found' }, { status:500 })
    }
    return NextResponse.json({ data: response }, { status:200 })
}
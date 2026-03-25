import { NextResponse } from "next/server"
import { getProjectById } from "@/repositories/projectRepository"

export async function GET(request, { params }) {
    const id = params.id
    const response = await getProjectById(id)
    if(!response) {
        return NextResponse.json({ data:'Project cannot found' }, { status:500 })
    }
    return NextResponse.json({ data: response }, { status:200 })
}
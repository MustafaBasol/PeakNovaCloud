import { timingSafeEqual } from "crypto";
import { generateToken } from "@/libs/auth";
import { takeRateLimit, visitorIp } from "@/libs/contactRequest";
import { NextResponse } from "next/server";

function sameSecret(left, right) {
    const a = Buffer.from(String(left ?? ""));
    const b = Buffer.from(String(right ?? ""));
    if (a.length !== b.length || a.length === 0) return false;
    return timingSafeEqual(a, b);
}

export async function POST(request) {
    const thePassword = process.env.PASSWORD
    const req = await request.json()
    const password = await req.password
    if (!password) {    
        return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
    }
    const ip = visitorIp(request.headers, { trustCloudflare: process.env.TRUST_CLOUDFLARE === "true" });
    if (!sameSecret(password, thePassword)) {
        const limit = takeRateLimit(`auth:${ip}`);
        if (!limit.ok) {
            const response = NextResponse.json({ success: false, error: "Too many attempts." }, { status: 429 });
            response.headers.set("Retry-After", String(limit.retryAfter));
            return response;
        }
        return NextResponse.json({ success: false, error: 'Invalid password.' }, { status: 401 });
    }
    const token = generateToken();
    const response =  NextResponse.json({ success: true, message: 'Login successful', token });   
    
    response.cookies.set('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 3600, 
      path: '/', 
    });    

    return response
}
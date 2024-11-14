import { NextResponse } from "next/server";

export default function middleware(request){
    console.log(request)
    return(
        NextResponse.redirect(new URL("/blog",request.url))
    )
}

export const config={
    matcher:["/about","/about/:path*"]
}
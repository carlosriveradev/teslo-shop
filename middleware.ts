export { default } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    TODO: // NO FUNCIONA
    // console.log({req});
    
    // const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // // informacion del usuario
    // console.log(session);
    // if(!session) {
    //     const requestedPage = req.nextUrl.pathname;
    //     // const url = req.nextUrl.clone();
    //     // url.pathname = '/auth/login';
    //     // url.search = `p=${requestedPage}`

    //     // return NextResponse.redirect(new URL('/', url))
    //     // // return NextResponse.redirect(url)

    //     const url = req.nextUrl.clone()
    //     url.pathname = '/auth/login';
    //     url.search = `p=${requestedPage}`;
    //     return NextResponse.redirect(url);
    // }
    
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/checkout/:path*'],
}
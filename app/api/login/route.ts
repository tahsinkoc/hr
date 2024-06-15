// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {



    let data: LoginInfo = await request.json();
    console.log(data);

    return Response.json({ data })
}
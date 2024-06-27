// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import User from '@/models/User';
// @ts-ignore
import jwt from 'jsonwebtoken';
import dbConnect from '@/components/api/DbConnection';
export async function POST(request: NextRequest) {

    await dbConnect()
    const JWT_SECRET = process.env.JWT_SECRET || 'xtraypohjkl*12asjmbnş_78//ıuatğkl0_.sah';


    let data: LoginInfo = await request.json();
    let user = await User.findOne({ username: data.username, role: 'admin' })
    if (user) {
        let passwordCompare = await bcrypt.compare(data.password, user.password);
        if (!passwordCompare) {
            return new Response(JSON.stringify({ token: 'Username or password wrong.', status: 403 }), {
                status: 403,
                headers: { "Content-Type": "application/json" },
            })
        } else {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            return Response.json({ message: token, status: 200 })
        }

    } else {
        return new Response(JSON.stringify({ token: 'Username or password wrong.', status: 403 }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        })
        // return Response.json({ data })
    }



}
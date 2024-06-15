// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import User from '@/models/User';
// @ts-ignore
import jwt from 'jsonwebtoken';
import dbConnect from '@/components/api/DbConnection';
export async function POST(request: NextRequest) {

    await dbConnect()
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


    let data: LoginInfo = await request.json();
    let user = await User.findOne({ username: data.username })
    if (user) {
        let passwordCompare = await bcrypt.compare(data.password, user.password);
        if (!passwordCompare) {
            return new Response('Username or password wrong.', {
                status: 403,
                headers: { "Content-Type": "application/json" }
            })
        } else {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            return Response.json({ token })
        }

    } else {
        return new Response('Username or password wrong.', {
            status: 403,
            headers: { "Content-Type": "application/json" }
        })
        // return Response.json({ data })
    }



}
// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/components/api/DbConnection';
import User from '@/models/User';

export async function POST(request: NextRequest) {

    await dbConnect()

    let data: RegisterInfo = await request.json();

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = new User({
        username: data.username,
        name: data.name,
        surname: data.surname,
        number: data.number,
        mail: data.mail,
        password: hashedPassword,
    })
    user.save();

    return Response.json({ data, hashedPassword })
}
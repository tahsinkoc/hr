// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/components/api/DbConnection';
import User from '@/models/User';



export async function POST(request: NextRequest) {

    await dbConnect()

    let data: registerCompanyInfo = await request.json();

    let isExist = await User.findOne({ username: data.username })

    if (isExist) {
        console.log(isExist);
        return new Response('Username already taken.', {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
        })
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = new User({
            username: data.username,
            number: data.number,
            mail: data.mail,
            password: hashedPassword,
            role: 'company',
            address: data.address,
            companyName: data.companyName,
            field: data.field,
            taskId: data.taskId
        })
        user.save();

        return Response.json({ data, hashedPassword })
    }


}
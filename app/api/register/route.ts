// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/components/api/DbConnection';
import User from '@/models/User';

// role: String,
// adress: String,
// companyName: String,
// field: String,
// taskId: String,

export async function POST(request: NextRequest) {

    await dbConnect()

    let data: RegisterInfo = await request.json();

    let isExist = await User.findOne({ username: data.username })

    if (isExist) {
        console.log(isExist);
        return new Response(JSON.stringify({ token: 'Username already taken!', status: 403 }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        })
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = new User({
            username: data.username,
            name: data.name,
            surname: data.surname,
            number: data.number,
            mail: data.mail,
            password: hashedPassword,
            role: 'user',
            address: '',
            companyName: '',
            field: '',
            taskId: ''
        })
        user.save();

        return new Response(JSON.stringify({ token: 'Succesfully created.', status: 200 }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })
    }


}
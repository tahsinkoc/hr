// export const dynamic = 'force-dynamic';
import { type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/components/api/DbConnection';
import User from '@/models/User';
import Confirmation from '@/models/Confirmation';



export async function POST(request: NextRequest) {

    await dbConnect()

    let data: registerCompanyInfo = await request.json();

    let isExist = await User.findOne({ username: data.username })

    if (isExist) {
        console.log(isExist);
        return new Response(JSON.stringify({ token: 'Username already taken.', status: 403 }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        })
    } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = new User({
            username: data.username,
            number: data.number,
            mail: data.mail,
            status: false,
            password: hashedPassword,
            role: 'company',
            address: data.address,
            companyName: data.companyName,
            field: data.field,
            taskId: data.taskId
        })
        user.save()
        const confirmation = new Confirmation({
            companyName: data.companyName,
            mail: data.mail,
            phone: data.number,
            status: false,
            taxId: data.taskId,
            companyUserId: data.username,
            spam: false
        });
        confirmation.save();



        return new Response(JSON.stringify({ token: 'Succesfully created.', status: 200 }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        })
    }


}
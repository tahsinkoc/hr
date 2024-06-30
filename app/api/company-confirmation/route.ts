import dbConnect from "@/components/api/DbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Auth } from "@/components/api/Auth";
import Confirmation from "@/models/Confirmation";
import User from "@/models/User";

type postReq = {
    username: string,
    mod: boolean
}


export async function POST(request: NextRequest) {

    let reqData: postReq = await request.json();


    await dbConnect();
    let auth = await Auth(request, ['admin']);
    if (!auth) {
        return new NextResponse(JSON.stringify({ data: 'Unauthorized', status: 401 }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const speUser: any = User.findOne({ username: reqData.username, role: 'company' });
    speUser.status = reqData.mod;
    speUser.save();
    const speConfirm: any = Confirmation.findOne({ companyUserId: reqData.username });
    speConfirm.status = reqData.mod;
    speConfirm.spam = !reqData.mod;
    speConfirm.save();

    return new Response(JSON.stringify({ token: 'Succesfully Confirmed.', status: 200 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })

}
import { Auth } from "@/components/api/Auth";
import dbConnect from "@/components/api/DbConnection";
import Confirmation from "@/models/Confirmation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { search?: string } }) {

    const { search } = params;

    await dbConnect();

    let auth = await Auth(request, ['admin']);
    if (!auth) {
        return new NextResponse(JSON.stringify({ data: 'Unauthorized', status: 401 }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }


    if (search === '-**-') {
        const confirmations = await Confirmation.find();
        return new NextResponse(JSON.stringify({ data: confirmations, status: 200 }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        if (search) {
            const regex = new RegExp(search, 'i'); // 'i' flag for case-insensitive search
            const confirmations = await Confirmation.find({ companyUserId: { $regex: regex } });
            return new NextResponse(JSON.stringify({ data: confirmations, status: 200 }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    }



}

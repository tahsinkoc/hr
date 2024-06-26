import { Auth } from "@/components/api/Auth";
import dbConnect from "@/components/api/DbConnection";
import Confirmation from "@/models/Confirmation";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    await dbConnect()

    let auth = await Auth(request, ['admin'])
    if (!auth) {
        return new Response(JSON.stringify({ data: 'Unauthorized', status: 401 }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        })
    }

    const confirmations = await Confirmation.find();

    return new Response(JSON.stringify({ data: confirmations, status: 200 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })

}
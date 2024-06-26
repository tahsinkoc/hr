import dbConnect from "@/components/api/DbConnection";
import Confirmation from "@/models/Confirmation";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    await dbConnect()

    const headers = request.headers;

    console.log(headers);

    const confirmations = await Confirmation.find();

    return new Response(JSON.stringify({ data: confirmations, status: 200 }), {
        headers: { "Content-Type": "application/json" },
    })

}
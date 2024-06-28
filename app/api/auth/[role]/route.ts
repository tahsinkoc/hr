import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { Auth } from "@/components/api/Auth";

export async function GET(request: NextRequest, { params }: { params: { role?: string } }) {

    const { role } = params;

    if (role) {
        const status = await Auth(request, [role]);
        console.log(status);
        return Response.json({ stat: status });
    }


}
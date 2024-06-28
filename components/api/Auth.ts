import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import dbConnect from "./DbConnection";
import User from "@/models/User";

let secret = process.env.JWT_SECRET || 'xtraypohjkl*12asjmbnş_78//ıuatğkl0_.sah';


type userType = {
    userId: string,
    iat: number,
    exp: number
}

export async function Auth(request: NextRequest, allowedRoles: string[]) {

    let token = request.headers.get('Auth')

    if (token) {
        try {
            let user: any = jwt.verify(token, secret);
            if (user) {
                await dbConnect();
                const speUser = await User.findOne({ _id: user.userId });
                let isAllowed = allowedRoles.find(item => item === speUser.role);
                if (!isAllowed) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        }
        catch (err) {
            return false
        }

    } else {
        return false
    }

}
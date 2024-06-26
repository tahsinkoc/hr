import jwt from "jsonwebtoken";

let secret = process.env.JWT_SECRET || 'xtraypohjkl*12asjmbnş_78//ıuatğkl0_.sah';


export async function Auth(token: string, allowedRoles: [string]) {

    let user = jwt.verify(token, secret);
    console.log(user);




}
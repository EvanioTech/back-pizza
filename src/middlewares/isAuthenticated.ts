import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
   
//receber o token
const authToken = req.headers.authorization;

if (!authToken) {
       return res.status(401).json({ message: "Token is missing" });
      


    
}
const [, token] = authToken.split(" ");

try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    return next();  

    





} catch (err) {
    return res.status(401).json({ message: "Token invalid  " });
}


 
}

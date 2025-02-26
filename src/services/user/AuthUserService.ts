import prisma from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
    }
class AuthUserService {
    async execute( {email, password}: AuthRequest) {
        // verificar se um email foi enviado
        if (!email) {
        throw new Error("Email incorrect");
        }
        // verificar si email está cadastrado
        const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
        });
    
        if (!user) {
        throw new Error("User not found");
        }
        // verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)
    
        
        if (!passwordMatch) {
        throw new Error("Password incorrect");
        }

        // gerar um token JWT e devolver os dados do usuario
        const token = sign(
            {
                name: user.name,
                email: user.email

            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: '30d'
            }
            
        )


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
    }

    export { AuthUserService };
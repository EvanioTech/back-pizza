import prisma from "../../prisma";
import { compare } from "bcryptjs";

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
        return {ok :'usuario logado'}
    }
    }

    export { AuthUserService };
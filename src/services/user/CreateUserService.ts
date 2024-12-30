import PrismaClient from '../../prisma'
import { hash } from 'bcryptjs';


interface UserRequest {
    name: string;
    email: string;
    password: string;
    }

class CreateUserService {
  async execute( {name, email, password}: UserRequest) {
    // verificar se um email foi enviado
    if (!email) {
      throw new Error("Email incorrect");
    }
    // verificar si email está cadastrado
    const userAlreadyExists = await PrismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    // hash password
    const passwordHash = await hash(password, 8);

    // criar usuário
    const user = await PrismaClient.user.create({
      data: {
        name : name,
        email : email,
        password : passwordHash,
        
      },
      select: {
        id: true,
        name: true,
        email: true
        }
    });
    return user;
  }
}

export { CreateUserService };
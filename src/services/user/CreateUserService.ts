import PrismaClient from '../../prisma'


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

    // criar usuário
    const user = await PrismaClient.user.create({
      data: {
        name,
        email,
        password,
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
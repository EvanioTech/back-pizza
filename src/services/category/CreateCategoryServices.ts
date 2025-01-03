import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
   
}

class CreateCategoryService {
   async execute({ name }: CategoryRequest) {
    // verificar se um nome foi enviado
    if (name === '') {
      throw new Error("Name incorrect");
    }

    
    // criar categoria
    const category = await prismaClient.category.create({
      data: {
        name : name,
        
        
      },
      select: {
        id: true,
        name: true,
       
        }
    });
    return category;
    

}
}

export { CreateCategoryService };
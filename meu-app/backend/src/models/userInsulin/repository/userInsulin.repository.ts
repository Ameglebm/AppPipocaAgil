import { prisma } from "@/lib/prisma";
import { IUserInsulinRepository } from "../interface/userInsulinRepository.interface";
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export class UserInsulinRepository implements IUserInsulinRepository {
    getUserInsulinByUserId(userId: number): unknown {
        throw new Error("Metodo nao implemntado.");
    }
    async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {
        await prisma.user_insulina.create({
            data: {
                userId: data.userId,
                insulina: data.insulina, 
                dosagemQtd: data.dosagemQtd
            },
        });
    }

    /* Corrigido o código após ajustar o DTO */
    async getUserInsulin(id: number): Promise<any | null> {
        return await prisma.user_insulina.findMany({
            where: {
                userId: id
            }
        })
    }
    

    async getUserGlicemia(userId: number): Promise<any | null> {
        return await prisma.user_Glicemia.findMany({where: { userId } , orderBy: { createdAt:"desc" }});
      }


    /* Update está errado. Ele não está atualizando nenhum dado e o where está faltando passar o id */
    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        const { userId } = data;
        if (!data) {
            throw new Error("Nenhum dado fornecido para atualizar.");
        }

        await prisma.user_insulina.updateMany({
            where: { userId },
            data: {} 
        });
    }

    /* Está faltando passar o id do registro que quer excluir, juntamento com o userId */
    async deleteUserInsulin(query: DeleteUserInsulinDTO): Promise<void> {
        await prisma.user_insulina.deleteMany({ 
            where: { 
                userId: Number(query.userId), 
            } 
        }); 
    }
}

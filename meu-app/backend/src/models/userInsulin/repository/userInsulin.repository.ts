import { prisma } from "@/lib/prisma";
import { IUserInsulinRepository } from "../interface/userInsulinRepository.interface";
import { CreateUserInsulinDTO, DeleteInsulinDTO, PatchUserInsulinDTO } from "../dtos/userInsulinDTO";

// Removido o getUserInsulinByUserId 
// FINALIZADO
export class UserInsulinRepository implements IUserInsulinRepository {
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
    //FINALIZADO
    async getUserInsulin(id: number): Promise<any | null> {
        return await prisma.user_insulina.findMany({
            where: {
                userId: id
            }
        })
    }

    /* Update está errado. Ele não está atualizando nenhum dado e o where está faltando passar o id */ //FINALIZADO
    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        const { id, ...updateData } = data; 
        await prisma.user_insulina.update({
            where: { id: Number(id), userId: Number(updateData.userId) },
            data: {
                dosagemQtd: updateData.dosagemQtd,
                insulina: updateData.insulina,
                userId: Number(updateData.userId)
                
            }, 
        });
    }

    /* Está faltando passar o id do registro que quer excluir, juntamento com o userId */
    //FINALIZADO
    async deleteUserInsulin(params: DeleteInsulinDTO): Promise<void> {
        await prisma.user_insulina.delete({
            where: {
                id: params.id,
                userId: Number(params.userId)
            }
        });
    }
}

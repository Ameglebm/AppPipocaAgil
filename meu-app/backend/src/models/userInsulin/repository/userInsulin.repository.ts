import { prisma } from "@/lib/prisma";
import { IUserInsulinRepository } from "../interface/userInsulinRepository.interface";
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

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

    async getUserInsulin(query: GetUserInsulinDTO): Promise<GetUserInsulinDTO | null> {
        return await prisma.user_insulina.findFirst({ 
            where: { userId: query.userId } 
        });
    }

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

    async deleteUserInsulin(query: DeleteUserInsulinDTO): Promise<void> {
        await prisma.user_insulina.deleteMany({ 
            where: { 
                userId: Number(query.userId), 
            } 
        }); 
    }
}

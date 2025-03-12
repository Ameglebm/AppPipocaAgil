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
        const { userId } = query;
        return await prisma.user_insulina.findFirst({ where: { userId } });
    }

    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        const { userId, insulinaId} = data;
        await prisma.user_insulina.updateMany({
            data: { insulina: data.insulinaId
            },
            where: {
                userId,
            }
        });
    }

    async deleteUserInsulin(query: DeleteUserInsulinDTO): Promise<void> {
        const { userId, } = query;
        await prisma.user_insulina.deleteMany({ where: { userId,  } }); 
    }
}

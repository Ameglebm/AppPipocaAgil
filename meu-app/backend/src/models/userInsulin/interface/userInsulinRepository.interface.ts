import { CreateUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinRepository {
    /* getUserInsulinByUserId não está sendo usado. Removido */ //FINALIZADO
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(id: number): Promise<any | null>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(params: DeleteUserInsulinDTO): Promise<void>;
}

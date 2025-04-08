import { CreateUserInsulinDTO, PatchUserInsulinDTO, DeleteInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinRepository {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(id: number): Promise<any | null>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(params: DeleteInsulinDTO): Promise<void>;
}

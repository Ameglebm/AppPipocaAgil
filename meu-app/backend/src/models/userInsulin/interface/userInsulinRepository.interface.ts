import { CreateUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinRepository {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(id: number): Promise<any | null>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(string: DeleteUserInsulinDTO): Promise<void>;
}

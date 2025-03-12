import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinService {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(query: GetUserInsulinDTO): Promise<any>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(data: DeleteUserInsulinDTO): Promise<void>;
}

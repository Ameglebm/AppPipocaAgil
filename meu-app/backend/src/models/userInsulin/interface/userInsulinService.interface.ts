import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinService {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(data: GetUserInsulinDTO): Promise<any>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(params: DeleteUserInsulinDTO): Promise<void>;
}

import { CreateUserInsulinDTO, GetUserInsulinDTO, DeleteInsulinDTO, PatchUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinService {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(data: GetUserInsulinDTO): Promise<any>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(params: DeleteInsulinDTO): Promise<void>;
}

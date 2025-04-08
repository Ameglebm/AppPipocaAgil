import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchInsulinDTO, DeleteInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinService {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(data: GetUserInsulinDTO): Promise<any>;
    patchUserInsulin(data: PatchInsulinDTO): Promise<void>;
    deleteUserInsulin(params: DeleteInsulinDTO): Promise<void>;
}

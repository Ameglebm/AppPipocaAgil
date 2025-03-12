import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinRepository {
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(query: GetUserInsulinDTO): Promise<GetUserInsulinDTO | null>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(query: DeleteUserInsulinDTO): Promise<void>;
}

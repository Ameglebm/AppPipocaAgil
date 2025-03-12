import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";

export interface IUserInsulinRepository {
    getUserInsulinByUserId(userId: number): unknown;
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
    getUserInsulin(query: GetUserInsulinDTO): Promise<GetUserInsulinDTO | null>;
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
    deleteUserInsulin(query: DeleteUserInsulinDTO): Promise<void>;
}

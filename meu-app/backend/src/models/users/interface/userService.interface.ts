import { DeleteUserParamsDTO, GetUserParamsDTO } from "../dtos/user.dto";

export interface IUserService {
  getUser(params: GetUserParamsDTO): Promise<any>;
  deleteUser(params: DeleteUserParamsDTO): Promise<void>;
}

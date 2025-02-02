import { LoginDTO, RegisterUserDTO, RequestPasswordResetDTO, ResetPasswordDTO, VerifyResetCodeDTO } from "../dtos/authDTO";

export interface IAuthService {
  registerUser(data: RegisterUserDTO): Promise<void>;
  loginUser(data: LoginDTO): Promise<{ token: string; user: any }>;
  requestPasswordReset(data: RequestPasswordResetDTO): Promise<void>;
  verifyResetCode(data: VerifyResetCodeDTO): Promise<void>;
  resetPassword(data: ResetPasswordDTO): Promise<void>;
}
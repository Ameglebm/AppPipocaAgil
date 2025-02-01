export interface IAuthService {
  registerUser(newUserData: any): Promise<void>;
  loginUser(loginData: any): Promise<{ token: string; user: any }>;
  requestPasswordReset(requestPasswordResetDto: any): Promise<void>;
  verifyResetCode(verifyResetCodeDto: any): Promise<void>;
  resetPassword(resetPasswordDto: any): Promise<void>;
}
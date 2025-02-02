export interface IAuthRepository {
  createUser(data: {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    senha: string;
  }): Promise<any>;

  updateUserPassword(userId: number, hashedPassword: string): Promise<any>;

  createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<any>;

  findPasswordResetTokenByEmailAndCode(email: string, code: string): Promise<any | null>;

  deletePasswordResetTokens(userId: number, token: string): Promise<any>;

  deletePasswordResetTokensByUserId(userId: number): Promise<any>;
}
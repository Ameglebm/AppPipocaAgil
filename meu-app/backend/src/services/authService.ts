import { UserRepository } from '../repositories/userRepository';
import { AuthRepository } from '../repositories/authRepository';

import bcrypt from 'bcrypt';

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authRepository = new AuthRepository();
  }

  // Exemplo de método para redefinir senha
  async resetPassword(userId: number, newPassword: string, token: string) {
    const validToken = await this.authRepository.findPasswordResetToken(userId, token);

    if (!validToken) {
      throw new Error('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUserPassword(userId, hashedPassword);

    // Deleta o token após o uso
    await this.authRepository.deletePasswordResetTokens(userId, token);
  }
}

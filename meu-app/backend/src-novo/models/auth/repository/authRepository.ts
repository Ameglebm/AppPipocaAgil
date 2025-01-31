import { Injectable } from '@nestjs/common'
import { PrismaService } from "@/lib/prisma.service";
import { RegisterUserDTO } from '../dto/authDTO';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // se eu mudar esse nome pra registerUser quebra o código em outro lugar? não sei se fiz certo aqui usando RegisterUserDTO no lugar de data.
  async createUser(data: RegisterUserDTO) {
    return this.prisma.users.create({ data });
  }

  async updateUserPassword(userId: number, hashedPassword: string) {
    return this.prisma.users.update({
      where: { id: userId },
      data: { senha: hashedPassword },
    });
  }

  // Criar um token de redefinição de senha
  async createPasswordResetToken(userId: number, token: string, expiresAt: Date) {
    return await this.prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  // Encontrar um token de redefinição de senha válido por email e código
  async findPasswordResetTokenByEmailAndCode(email: string, code: string) {
    return await this.prisma.passwordResetToken.findFirst({
      where: {
        token: code,
        expiresAt: {
          gte: new Date(),
        },
        user: {
          email: email,
        },
      },
    });
  }

  // Deletar tokens de redefinição de senha por userId e token
  async deletePasswordResetTokens(userId: number, token: string) {
    return await this.prisma.passwordResetToken.deleteMany({
      where: { userId, token },
    });
  }

  // Deletar todos os tokens de redefinição de senha por userId
  async deletePasswordResetTokensByUserId(userId: number) {
    return await this.prisma.passwordResetToken.deleteMany({
      where: { userId },
    });
  }
}

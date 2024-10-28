import { prisma } from '../lib/prisma';

export class AuthRepository {
  // criar um token de redefinição de senha
  async createPasswordResetToken(userId: number, token: string, expiresAt: Date) {
    return await prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  //encontrar um token de redefinição de senha valido
  async findPasswordResetToken(userId: number, token: string) {
    return await prisma.passwordResetToken.findFirst({
      where: {
        userId,
        token,
        expiresAt: {
          gte: new Date(), // vê se o token é valido
        },
      },
    });
  }

  // deletar tokens de redefinição de senha apos o uso
  async deletePasswordResetTokens(userId: number, token: string) {
    return await prisma.passwordResetToken.deleteMany({
      where: { userId, token },
    });
  }
}

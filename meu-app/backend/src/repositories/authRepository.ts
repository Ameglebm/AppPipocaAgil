import { prisma } from '../lib/prisma';

export class AuthRepository {

  async createUser(data: {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    senha: string;
  }) {
    return prisma.users.create({ data });
  }

  async updateUserPassword(userId: number, hashedPassword: string) {
    return prisma.users.update({
      where: { id: userId },
      data: { senha: hashedPassword },
    });
  }

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

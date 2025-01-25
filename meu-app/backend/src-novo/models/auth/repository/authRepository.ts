import { prisma } from "@/lib/prisma";

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

  // Criar um token de redefinição de senha
  async createPasswordResetToken(userId: number, token: string, expiresAt: Date) {
    return await prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  // Encontrar um token de redefinição de senha válido por email e código
  async findPasswordResetTokenByEmailAndCode(email: string, code: string) {
    return await prisma.passwordResetToken.findFirst({
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
    return await prisma.passwordResetToken.deleteMany({
      where: { userId, token },
    });
  }

  // Deletar todos os tokens de redefinição de senha por userId
  async deletePasswordResetTokensByUserId(userId: number) {
    return await prisma.passwordResetToken.deleteMany({
      where: { userId },
    });
  }
}
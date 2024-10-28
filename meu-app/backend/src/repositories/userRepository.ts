import { prisma } from '../lib/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }

  async findByCpf(cpf: string) {
    return prisma.users.findUnique({ where: { cpf } });
  }

  async findById(id: number) {
    return prisma.users.findUnique({ where: { id } });
  }

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

  async deleteUser(id: number) {
    return prisma.users.delete({ where: { id } });
  }
}
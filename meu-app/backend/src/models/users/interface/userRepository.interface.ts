export interface IUserRepository {
  findByEmail(email: string): Promise<any | null>;
  findByCpf(cpf: string): Promise<any | null>;
  findById(id: number): Promise<any | null>;

  createUser(data: {
    nome: string;
    sobrenome: string;
    email: string;
    cpf: string;
    senha: string;
  }): Promise<any>;

  updateUserPassword(userId: number, hashedPassword: string): Promise<any>;

  deleteUser(id: number): Promise<any>;
}

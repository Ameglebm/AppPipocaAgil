import { UserRepository } from '../repositories/userRepository';
import { deleteUserParamsSchema, getUserParamsSchema } from '../validators/userValidator';
import { ZodError } from 'zod';
import { GetUserParamsDTO, DeleteUserParamsDTO } from '../dtos/userDTO';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(params: GetUserParamsDTO): Promise<any> {
    try {
      const validatedParams = getUserParamsSchema.parse(params);
      const idNumber = parseInt(validatedParams.id, 10);

      const user = await this.userRepository.findById(idNumber);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return {
        id: user.id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        cpf: user.cpf,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async deleteUser(params: DeleteUserParamsDTO): Promise<void> {
    try {
      const validatedParams = deleteUserParamsSchema.parse(params);
      const idNumber = parseInt(validatedParams.id, 10);

      const user = await this.userRepository.findById(idNumber);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      await this.userRepository.deleteUser(idNumber);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }
}

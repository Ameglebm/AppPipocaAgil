import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../interface/userRepository.interface';
import { DeleteUserParamsDTO, GetUserParamsDTO } from '../dtos/user.dto';
import { IUserService } from '../interface/userService.interface';

@Injectable()
export class UserService implements IUserService{
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async getUser(params: GetUserParamsDTO): Promise<any> {
    const idNumber = parseInt(params.id, 10);

    const user = await this.userRepository.findById(idNumber);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      id: user.id,
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      cpf: user.cpf,
    };
  }

  async deleteUser(params: DeleteUserParamsDTO): Promise<void> {
    const idNumber = parseInt(params.id, 10);

    const user = await this.userRepository.findById(idNumber);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.deleteUser(idNumber);
  }
}

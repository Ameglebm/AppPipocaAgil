import {
  Controller,
  Get,
  Delete,
  Param,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteUserParamsDTO, GetUserParamsDTO } from '../dtos/user.dto';
import { IUserService } from '../interface/userService.interface';
import { AuthGuard } from '@/middlewares/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @ApiOperation({ summary: 'Obter informações do usuário por ID.' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Get(':id')
  async getUser(@Param() params: GetUserParamsDTO) {
    try {
      const userData = await this.userService.getUser(params);
      return { user: userData };
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Deletar usuário por ID.' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Delete(':id')
  async deleteUser(@Param() params: DeleteUserParamsDTO) {
    try {
      await this.userService.deleteUser(params);
      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao deletar usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
}

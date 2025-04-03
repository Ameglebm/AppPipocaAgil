import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';

// Importe seus DTOs conforme definidos em seus arquivos
import {
  RegisterUserDTO,
  LoginDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  VerifyResetCodeDTO,
} from '../dtos/authDTO';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthService } from '../interface/authService.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly authService: IAuthService) {}

  @ApiOperation({ summary: 'Registrar um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 409, description: 'Email ou CPF já está em uso.' })
  @Post('register')
  async registerUser(@Body() newUserData: RegisterUserDTO) {
    try {
      await this.authService.registerUser(newUserData);
      return { message: 'Usuário criado com sucesso.' };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Email já está em uso.' || error.message === 'CPF já está em uso.') {
          throw new ConflictException(error.message);
        }

        if (error.message === 'Código inválido ou expirado.') {
          throw new BadRequestException(error.message);
        }

        if (error.message === 'Usuário inválido.' || error.message === 'Credenciais inválidas.') {
          throw new UnauthorizedException(error.message);
        }
      }

      console.error('Erro no registro de usuário:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Realizar login do usuário.' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @Post('login')
  async loginUser(@Body() loginData: LoginDTO) {
    try {
      const result = await this.authService.loginUser(loginData);
      return {
        message: 'Login realizado com sucesso.',
        token: result.token,
        user: result.user,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Usuário inválido.' || error.message === 'Credenciais inválidas.') {
          throw new UnauthorizedException(error.message);
        }
      }

      console.error('Erro no login:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Solicitar redefinição de senha' })
  @ApiResponse({ status: 200, description: 'Se o e-mail estiver registrado, um código será enviado.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDTO) {
    try {
      await this.authService.requestPasswordReset(requestPasswordResetDto);
      return {
        message: 'Se o e-mail estiver registrado, você receberá um código para redefinir a senha.',
      };
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Verificar código de redefinição de senha.' })
  @ApiResponse({ status: 200, description: 'Código verificado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Código inválido ou expirado.' })
  @Post('verify-reset-code')
  async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDTO) {
    try {
      await this.authService.verifyResetCode(verifyResetCodeDto);
      return { message: 'Código verificado com sucesso.' };
    } catch (error) {
      if (error instanceof Error && error.message === 'Código inválido ou expirado.') {
        throw new BadRequestException(error.message);
      }

      console.error('Erro na verificação do código:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @ApiOperation({ summary: 'Redefinir senha do usuário.' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso.' })
  @ApiResponse({ status: 400, description: 'Código inválido ou expirado.' })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    try {
      await this.authService.resetPassword(resetPasswordDto);
      return { message: 'Senha redefinida com sucesso.' };
    } catch (error) {
      if (error instanceof Error && error.message === 'Código inválido ou expirado.') {
        throw new BadRequestException(error.message);
      }

      console.error('Erro ao redefinir a senha:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
}

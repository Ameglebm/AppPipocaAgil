import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ZodError } from 'zod';

// Importe seus DTOs conforme definidos em seus arquivos
import {
  RegisterUserDTO,
  LoginDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  VerifyResetCodeDTO,
} from '../dtos/authDTO';

// Importe seu AuthService. No NestJS, você geralmente o fornece
// através do seu módulo com `providers: [AuthService]` e o exporta
// para poder injetá-lo aqui.
import { AuthService } from '../service/authService';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({
      status: 400,
      description: 'Erro de validação',
  })
  @ApiResponse({
    status: 409,
    description: 'Email ou CPF já está em uso',
  })
  @Post('register')   
  async registerUser(@Body() newUserData: RegisterUserDTO) {
    try {
      await this.authService.registerUser(newUserData);
      // Em NestJS, basta retornar o objeto
      // que será convertido em JSON na resposta
      return { message: 'Usuário criado com sucesso' };
    } catch (error) {
      if (error instanceof ZodError) {
        // Lança uma exceção de BadRequest com os erros do Zod
        throw new BadRequestException({ errors: error.errors });
      }

      if (error instanceof Error) {
        if (
          error.message === 'Email já está em uso' ||
          error.message === 'CPF já está em uso'
        ) {
          // 409 Conflict
          throw new ConflictException(error.message);
        }

        if (error.message === 'Código inválido ou expirado.') {
          // 400 Bad Request
          throw new BadRequestException(error.message);
        }

        if (
          error.message === 'Usuário inválido.' ||
          error.message === 'Credenciais inválidas.'
        ) {
          // 401 Unauthorized
          throw new UnauthorizedException(error.message);
        }
      }

      console.error('Erro no registro de usuário:', error);
      // Se o erro não for capturado acima, lança 500
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

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
      if (error instanceof ZodError) {
        throw new BadRequestException({ errors: error.errors });
      }

      if (error instanceof Error) {
        if (
          error.message === 'Usuário inválido.' ||
          error.message === 'Credenciais inválidas.'
        ) {
          throw new UnauthorizedException(error.message);
        }
      }

      console.error('Erro no login:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDTO) {
    try {
      await this.authService.requestPasswordReset(requestPasswordResetDto);
      return {
        message: 'Se o e-mail estiver registrado, você receberá um código para redefinir a senha.',
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({ errors: error.errors });
      }

      console.error('Erro ao solicitar redefinição de senha:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @Post('verify-reset-code')
  async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDTO) {
    try {
      await this.authService.verifyResetCode(verifyResetCodeDto);
      return { message: 'Código verificado com sucesso.' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({ errors: error.errors });
      }

      if (error instanceof Error) {
        if (error.message === 'Código inválido ou expirado') {
          throw new BadRequestException(error.message);
        }
      }

      console.error('Erro na verificação do código:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    try {
      const { email, code, novaSenha, confirmarNovaSenha } = resetPasswordDto;
      await this.authService.resetPassword({ email, code, novaSenha, confirmarNovaSenha });
      return { message: 'Senha redefinida com sucesso.' };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({ errors: error.errors });
      }

      if (error instanceof Error) {
        if (error.message === 'Código inválido ou expirado') {
          throw new BadRequestException(error.message);
        }
      }

      console.error('Erro ao redefinir a senha:', error);
      throw new InternalServerErrorException('Erro interno do servidor.');
    }
  }
}

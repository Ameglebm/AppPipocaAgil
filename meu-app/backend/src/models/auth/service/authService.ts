import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addMinutes } from 'date-fns';

import {
  LoginDTO,
  RegisterUserDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  VerifyResetCodeDTO,
} from '../dtos/authDTO';

import { Injectable, Inject } from '@nestjs/common';
import { IAuthService } from '../interface/authService.interface';
import { IAuthRepository } from '../interface/authRepository.interface';
import { IUserRepository } from '@/models/users/interface/userRepository.interface';
import transporter from '@/lib/nodemailer';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async registerUser(data: RegisterUserDTO): Promise<void> {
    try {
      const { nome, sobrenome, email, cpf_number, senha } = data;

      // Verificar se o e-mail já está em uso
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('Email já está em uso.');
      }

      // Verificar se o CPF já está em uso
      const existingUserByCpf = await this.userRepository.findByCpf(cpf_number);
      if (existingUserByCpf) {
        throw new Error('CPF já está em uso.');
      }

      // Hashear a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar o usuário
      await this.authRepository.createUser({
        nome,
        sobrenome,
        email,
        cpf: cpf_number,
        senha: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async loginUser(data: LoginDTO): Promise<{ token: string; user: any }> {
    try {
      const { email, senha } = data;

      // Encontrar usuário pelo e-mail
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Usuário inválido.');
      }

      // Comparar as senhas
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        throw new Error('Credenciais inválidas.');
      }

      // Gerar JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '8h' }
      );

      return {
        token,
        user: {
          id: user.id,
          nome: user.nome,
          sobrenome: user.sobrenome,
          email: user.email,
          cpf: user.cpf,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async requestPasswordReset(data: RequestPasswordResetDTO): Promise<void> {
    try {
      const { email } = data;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return;
      }

      await this.authRepository.deletePasswordResetTokensByUserId(user.id);

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = addMinutes(new Date(), 15);

      await this.authRepository.createPasswordResetToken(user.id, code, expiresAt);

      await transporter.sendMail({
        from: `"Insucheck" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Redefinição de Senha',
        html: `
          <p>Olá, ${user.nome}!</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Use o código abaixo para redefinir sua senha:</p>
          <h2>${code}</h2>
          <p>Este código expira em 15 minutos.</p>
          <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
        `,
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyResetCode(data: VerifyResetCodeDTO): Promise<void> {
    try {
      const { email, code } = data;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Código inválido ou expirado.');
      }

      const validToken = await this.authRepository.findPasswordResetTokenByEmailAndCode(email, code);
      if (!validToken) {
        throw new Error('Código inválido ou expirado.');
      }
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    try {
      const { email, code, novaSenha } = data;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Código inválido ou expirado.');
      }

      const validToken = await this.authRepository.findPasswordResetTokenByEmailAndCode(email, code);
      if (!validToken) {
        throw new Error('Código inválido ou expirado.');
      }

      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      await this.authRepository.updateUserPassword(user.id, hashedPassword);
      await this.authRepository.deletePasswordResetTokens(user.id, code);
    } catch (error) {
      throw error;
    }
  }
}

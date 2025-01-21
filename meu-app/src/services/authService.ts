import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import transporter from '../lib/nodemailer';
import { addMinutes } from 'date-fns';
import {
  loginSchema,
  registerUserSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
  verifyResetCodeSchema,
} from '../validators/authValidator';
import {
  LoginDTO,
  RegisterUserDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  VerifyResetCodeDTO,
} from '../dtos/authDTO';
import { UserRepository } from '../repositories/userRepository';
import { AuthRepository } from '../repositories/authRepository';

export class AuthService {
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor(
    userRepository: UserRepository,
    authRepository: AuthRepository
  ) {
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async registerUser(data: RegisterUserDTO): Promise<void> {
    try {
      const validatedData = registerUserSchema.parse(data);
      const { nome, sobrenome, email, cpf_number, senha } = validatedData;

      // Verificar se o e-mail já está em uso
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      // Verificar se o CPF já está em uso
      const existingUserByCpf = await this.userRepository.findByCpf(cpf_number);
      if (existingUserByCpf) {
        throw new Error('CPF já está em uso');
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
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async loginUser(data: LoginDTO): Promise<{ token: string; user: any }> {
    try {
      const validatedData = loginSchema.parse(data);
      const { email, senha } = validatedData;

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
        { expiresIn: '8h' },
      );

      // Retornar token e dados do usuário
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
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async requestPasswordReset(data: RequestPasswordResetDTO): Promise<void> {
    try {
      const validatedData = requestPasswordResetSchema.parse(data);
      const { email } = validatedData;

      // Encontrar usuário pelo e-mail
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        // Por segurança, não indicar se o e-mail existe ou não
        return;
      }

      // Deletar tokens de redefinição de senha existentes para o usuário
      await this.authRepository.deletePasswordResetTokensByUserId(user.id);

      // Gerar um código de 6 dígitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Definir a validade do código (15 minutos)
      const expiresAt = addMinutes(new Date(), 15);

      // Salvar o código no banco de dados
      await this.authRepository.createPasswordResetToken(
        user.id,
        code,
        expiresAt, 
      );

      // Enviar o e-mail com o código
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
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async verifyResetCode(data: VerifyResetCodeDTO): Promise<void> {
    try {
      const validatedData = verifyResetCodeSchema.parse(data);
      const { email, code } = validatedData;

      // Encontrar usuário pelo e-mail
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Código inválido ou expirado');
      }

      // Encontrar o token válido pelo e-mail e código
      const validToken = await this.authRepository.findPasswordResetTokenByEmailAndCode(email, code);
      if (!validToken) {
        throw new Error('Código inválido ou expirado');
      }

      // Opcional: Você pode deletar o token após a verificação para evitar reutilização
      // await this.authRepository.deletePasswordResetTokens(user.id, code);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    try {
      const { email, code, novaSenha, confirmarNovaSenha } = data;

      // Validar os dados
      resetPasswordSchema.parse({
        email,
        code,
        novaSenha,
        confirmarNovaSenha,
      });

      // Encontrar usuário pelo e-mail
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Código inválido ou expirado');
      }

      // Verificar se o código é válido
      const validToken = await this.authRepository.findPasswordResetTokenByEmailAndCode(email, code);
      if (!validToken) {
        throw new Error('Código inválido ou expirado');
      }

      // Hashear a nova senha
      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      await this.authRepository.updateUserPassword(user.id, hashedPassword);

      // Deletar o token após o uso
      await this.authRepository.deletePasswordResetTokens(user.id, code);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }
}
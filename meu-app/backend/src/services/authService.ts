import { UserRepository } from '../repositories/userRepository';
import { registerUserSchema, loginSchema, requestPasswordResetSchema, resetPasswordSchema } from '../validators/authValidator';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import transporter from '../lib/nodemailer';
import { addHours } from 'date-fns';
import { prisma } from '../lib/prisma';

interface RegisterUserDTO {
  nome: string;
  sobrenome: string;
  email: string;
  cpf_number: string;
  senha: string;
  confirmar_senha: string;
}

interface LoginDTO {
  email: string;
  senha: string;
}

interface RequestPasswordResetDTO {
  email: string;
}

interface ResetPasswordDTO {
  userId: string;
  token: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
      await this.userRepository.createUser({
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

      // Gerar um token seguro
      const token = crypto.randomBytes(32).toString('hex');

      // Definir a validade do token (1 hora)
      const expiresAt = addHours(new Date(), 1);

      // Salvar o token no banco de dados
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });

      // Montar o link de redefinição
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user.id}`;

      // Enviar o e-mail
      await transporter.sendMail({
        from: `"Insucheck" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: 'Redefinição de Senha',
        html: `
          <p>Olá, ${user.nome}!</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para definir uma nova senha:</p>
          <a href="${resetLink}">Redefinir Senha</a>
          <p>Este link expira em 1 hora.</p>
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

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    try {
      const validatedData = resetPasswordSchema.parse(data);
      const { userId, token, novaSenha } = validatedData;

      // Encontrar o token de redefinição
      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          userId: parseInt(userId, 10),
          token,
          expiresAt: {
            gte: new Date(),
          },
        },
      });

      if (!resetToken) {
        throw new Error('Token inválido ou expirado.');
      }

      // Hashear a nova senha
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      // Atualizar a senha do usuário
      await this.userRepository.updateUserPassword(parseInt(userId, 10), hashedPassword);

      // Invalidar o token após o uso
      await prisma.passwordResetToken.deleteMany({
        where: { userId: parseInt(userId, 10), token },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
  }
}
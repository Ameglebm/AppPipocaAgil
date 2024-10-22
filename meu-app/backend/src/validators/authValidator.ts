import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

export const registerUserSchema = z
  .object({
    nome: z
      .string()
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
    sobrenome: z
      .string()
      .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Sobrenome deve conter apenas letras e espaços'),
    email: z.string().email('Formato de e-mail inválido'),
    cpf_number: z.string().min(11, 'CPF deve conter pelo menos 11 caracteres'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmar_senha: z.string().min(8, 'Confirmação de senha deve ter pelo menos 8 caracteres'),
  })
  .superRefine((data, ctx) => {
    // Validar CPF
    if (!cpf.isValid(data.cpf_number)) {
      ctx.addIssue({
        path: ['cpf_number'],
        message: 'CPF inválido',
        code: z.ZodIssueCode.custom,
      });
    }

    // Verificar se senha e confirmar_senha são iguais
    if (data.senha !== data.confirmar_senha) {
      ctx.addIssue({
        path: ['confirmar_senha'],
        message: 'As senhas não correspondem',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
});

export const resetPasswordSchema = z
  .object({
    userId: z.string(),
    token: z.string(),
    novaSenha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmarNovaSenha: z.string().min(8, 'A confirmação da senha deve ter pelo menos 8 caracteres'),
  })
  .superRefine((data, ctx) => {
    if (data.novaSenha !== data.confirmarNovaSenha) {
      ctx.addIssue({
        path: ['confirmarNovaSenha'],
        message: 'As senhas não correspondem',
        code: z.ZodIssueCode.custom,
      });
    }
  });
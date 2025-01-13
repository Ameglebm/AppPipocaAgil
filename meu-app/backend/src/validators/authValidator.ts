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
    cpf_number: z
      .string()
      .regex(/^[\d.-]+$/, 'CPF deve conter apenas números, pontos e hífens')
      .transform((val) => val.replace(/[.-]/g, '')) // Remove apenas pontos e hífens
      .refine((val) => /^\d{11}$/.test(val), 'CPF deve conter exatamente 11 dígitos numéricos'),
    senha: z
      .string()
      .min(8, 'Senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[!@#$%^&*(),.?":;{}|<>]/, 'Senha deve conter pelo menos um caractere especial'),
    confirmar_senha: z.string().min(8, 'Confirmação de senha deve ter pelo menos 8 caracteres'),
  })
  .superRefine((data, ctx) => {
    // Validar CPF usando o valor já transformado
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

export const verifyResetCodeSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  code: z.string().length(6, 'Código deve ter 6 dígitos'),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email('Formato de e-mail inválido'),
    code: z.string().length(6, 'Código deve ter 6 dígitos'),
    novaSenha: z.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial'),
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
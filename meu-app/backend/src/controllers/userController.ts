// Controladores que processam requisições HTTP e delegam a lógica de negócio

import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller para obter um usuário pelo ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const getUserParams = z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  });

  try {
    const { id } = getUserParams.parse(req.params);

    const userData = await prisma.users.findUnique({ 
      where: { id },
    });

    if (!userData) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; 
    }

    res.json({ userData });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Controller para criar um novo usuário
export const createUser = async (req: Request, res: Response): Promise<void> => {
  // Definir o esquema de validação usando Zod
  const createUserBody = z
    .object({
      nome: z
        .string()
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
      sobrenome: z
        .string()
        .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Sobrenome deve conter apenas letras e espaços"),
      email: z.string().email("Formato de e-mail inválido"),
      cpf_number: z.string().min(11, "CPF deve conter pelo menos 11 caracteres"),
      senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
      confirmar_senha: z.string().min(8, "Confirmação de senha deve ter pelo menos 8 caracteres"),
    })
    .superRefine((data, ctx) => {
      // Validar CPF
      if (!cpf.isValid(data.cpf_number)) {
        ctx.addIssue({
          path: ["cpf_number"],
          message: "CPF inválido",
          code: z.ZodIssueCode.custom,
        });
      }

      // Verificar se senha e confirmar_senha são iguais
      if (data.senha !== data.confirmar_senha) {
        ctx.addIssue({
          path: ["confirmar_senha"],
          message: "As senhas não correspondem",
          code: z.ZodIssueCode.custom,
        });
      }
    });

  try {
    // Validar os dados de entrada
    const { nome, sobrenome, email, cpf_number, senha } = createUserBody.parse(req.body);

    // Verificar se o email já está em uso
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ message: "Email já está em uso" });
      return; 
    }

    // Hashear a senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar o novo usuário no banco de dados
    await prisma.users.create({
      data: {
        nome,
        sobrenome,
        email,
        cpf: cpf_number,
        senha: hashedPassword,
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Controller para deletar um usuário pelo ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const getUserParams = z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  });

  try {
    const { id } = getUserParams.parse(req.params);

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; 
    }

    await prisma.users.delete({ 
      where: { id },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Controller para login de usuário
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  // Definir o esquema de validação usando Zod
  const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8),
  });

  try {
    // Validar os dados de entrada
    const { email, senha } = loginSchema.parse(req.body);

    // Procurar o usuário pelo e-mail
    const user = await prisma.users.findUnique({ 
      where: { email },
    });

    // Se o usuário não existir
    if (!user) {
      res.status(401).json({ message: "Usuário inválido." });
      return; 
    }

    // Comparar a senha fornecida com a senha criptografada
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return; 
    }

    // Gerar um token JWT 
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' },
    );

    // Retornar a resposta de sucesso
    res.status(200).json({
      message: "Login realizado com sucesso.",
      token, 
      user: {
        id: user.id,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        cpf: user.cpf,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return; 
    }

    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// src/routes/user.ts

import { Router } from "express";
import { getUser, createUser, loginUser, deleteUser, requestPasswordReset, resetPassword } from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - sobrenome
 *               - email
 *               - cpf_number
 *               - senha
 *               - confirmar_senha
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf_number:
 *                 type: string
 *               senha:
 *                 type: string
 *               confirmar_senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 *       409:
 *         description: Email já está em uso
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /users/request-password-reset:
 *   post:
 *     summary: Solicitar redefinição de senha
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Instruções para redefinição de senha enviadas por e-mail
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/request-password-reset", requestPasswordReset);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Redefinir a senha do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - token
 *               - novaSenha
 *               - confirmarNovaSenha
 *             properties:
 *               userId:
 *                 type: integer
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *               confirmarNovaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado / Erros de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/reset-password", resetPassword);

export default router;

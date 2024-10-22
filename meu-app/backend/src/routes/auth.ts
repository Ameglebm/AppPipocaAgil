// src/routes/auth.ts

import { Router } from 'express';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações relacionadas à autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
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
 *         description: Email ou CPF já está em uso
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Auth]
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
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Solicitar redefinição de senha
 *     tags: [Auth]
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
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/request-password-reset', requestPasswordReset);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Redefinir a senha do usuário
 *     tags: [Auth]
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
 *                 type: string
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
router.post('/reset-password', resetPassword);

export default router;

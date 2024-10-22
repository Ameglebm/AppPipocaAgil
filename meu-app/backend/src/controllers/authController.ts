import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { ZodError } from 'zod';

const authService = new AuthService();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      if (error.message === 'Email já está em uso' || error.message === 'CPF já está em uso') {
        res.status(409).json({ message: error.message });
        return;
      }

      if (error.message === 'Token inválido ou expirado.') {
        res.status(400).json({ message: error.message });
        return;
      }

      if (error.message === 'Usuário inválido.' || error.message === 'Credenciais inválidas.') {
        res.status(401).json({ message: error.message });
        return;
      }
    }

    console.error('Erro no registro de usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      if (error.message === 'Usuário inválido.' || error.message === 'Credenciais inválidas.') {
        res.status(401).json({ message: error.message });
        return;
      }
    }

    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.requestPasswordReset(req.body);
    res.status(200).json({ message: 'Se o e-mail estiver registrado, você receberá um link para redefinir a senha.' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    console.error('Erro ao solicitar redefinição de senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.resetPassword(req.body);
    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      if (error.message === 'Token inválido ou expirado.') {
        res.status(400).json({ message: error.message });
        return;
      }
    }

    console.error('Erro ao redefinir a senha:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
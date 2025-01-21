import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { GetUserParamsDTO, DeleteUserParamsDTO } from '../dtos/userDTO';
import { userService } from '../container';

export const getUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const userData = await userService.getUser(req.params as GetUserParamsDTO);
    res.status(200).json({ user: userData });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      if (error.message === 'Usuário não encontrado') {
        res.status(404).json({ message: error.message });
        return;
      }
    }

    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    await userService.deleteUser(req.params as DeleteUserParamsDTO);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.errors });
      return;
    }

    if (error instanceof Error) {
      if (error.message === 'Usuário não encontrado') {
        res.status(404).json({ message: error.message });
        return;
      }
    }

    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
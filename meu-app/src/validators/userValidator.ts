import { z } from 'zod';

export const getUserParamsSchema = z.object({
  id: z.string(),
});

export const deleteUserParamsSchema = z.object({
  id: z.string(),
});
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   userId: number;
//   iat: number;
//   exp: number;
// }

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     res.status(401).json({ message: 'Token de autenticação não fornecido.' });
//     return;
//   }

//   const token = authHeader.split(' ')[1]; // Supondo formato "Bearer <token>"

//   if (!token) {
//     res.status(401).json({ message: 'Token de autenticação inválido.' });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
//     req.user = { id: decoded.userId }; // Adicione o ID do usuário ao objeto de requisição
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token de autenticação inválido ou expirado.' });
//   }
// };

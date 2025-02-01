import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    const token = authHeader.split(' ')[1]; // Supondo formato "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('Token de autenticação inválido.');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      request.user = { id: decoded.userId }; // Adiciona o ID do usuário ao objeto de requisição
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de autenticação inválido ou expirado.');
    }
  }
}

// OnModuleInit e OnModuleDestroy conectam e desconectam com a database quando o serviço é inicializado e terminado.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

// tirei essa linha: export const prisma = new PrismaClient();

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
      }
    
      async onModuleDestroy() {
        await this.$disconnect();
      }
}

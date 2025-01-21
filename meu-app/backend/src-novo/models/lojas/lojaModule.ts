import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LojaController } from './controller/lojaController';
import { LojaService } from './service/lojaService';
import { LojaRepository } from './repo/lojaRepo';
import { LojaSchema } from './schema/lojaSchema';
import { ModuloAplicacao } from '../utils/logger/logger';
import { IsValidCep } from '../validators/cepValidator';
import { HttpModule } from '@nestjs/axios';
import { IsValidCountry } from '../validators/paisValidator';
import { IsValidState } from '../validators/estadoValidator';
import { HereMapsModule } from '../hereMaps/hereMapsModule';
import { CreateLojaService } from './service/createLojaService';
import { FindAllLojaService } from './service/findAllLojaService';
import { FindByIdService } from './service/findByIdLojaService';
import { FindByUfService } from './service/findByUfService';
import { findByCepServiceService } from './service/findByCep/findByCepService';
import { CorreiosModule } from '../correios/correiosModule';
import { ServicoDeLogger } from '../utils/logger/logger';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Loja', schema: LojaSchema }]),
        ModuloAplicacao,
        HttpModule,
        HereMapsModule,
        CorreiosModule,
    ],
    controllers: [LojaController],
    providers: [
        LojaService,
        LojaRepository,
        IsValidCep,
        IsValidCountry,
        IsValidState,
        CreateLojaService,
        FindAllLojaService,
        FindByIdService,
        FindByUfService,
        findByCepServiceService,
        ServicoDeLogger,
    ],
    exports: [LojaService, LojaRepository],
})
export class LojaModule {}

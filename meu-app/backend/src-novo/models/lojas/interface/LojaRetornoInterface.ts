import { Document } from 'mongoose';

export interface LojaDocument extends Document, LojaRetorno {}

export interface LojaRetorno {
    stores: any[];
    limit: number;
    offset: number;
    total: number;
    mensagem?: string;
}

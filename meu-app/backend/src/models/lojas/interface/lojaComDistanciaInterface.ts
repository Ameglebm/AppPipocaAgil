import { LojaDocument } from './lojaInterface';

export interface LojaComDistancia extends LojaDocument {
    distanciaKm: number | null;
    frete?: any;
}

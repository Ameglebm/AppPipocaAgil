import { Document } from 'mongoose';

export interface LojaDocument extends Document, Loja {}

export interface Loja {
    storeName: string;
    type: string;
    takeOutInStore: boolean;
    shippingTimeInDays: number;
    latitude: string;
    longitude: string;
    postalCode: string;
    state: string;
    city: string;
    country: string;
}

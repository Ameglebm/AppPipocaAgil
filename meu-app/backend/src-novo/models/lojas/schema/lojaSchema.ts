import mongoose, { Schema, Document, model } from 'mongoose';
import { LojaDocument } from '../interface/lojaInterface';

export const LojaSchema = new Schema({
    storeName: { type: String, required: true },
    type: { type: String, required: true },
    takeOutInStore: { type: Boolean, required: true },
    shippingTimeInDays: { type: Number, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

export const LojaModel = model<LojaDocument>('Loja', LojaSchema);
export type { LojaDocument };

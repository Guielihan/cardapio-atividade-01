
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from "@google/genai";

export type Category = 'all' | 'pizza' | 'sanduiche' | 'milkshake';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Added for discounts
  image: string;
  category: Category;
  rating: number;
  time: string;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  addons: string[];
  condiments: { [key: string]: number }; // Added for free condiments
  totalPrice: number;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
}

export interface OrderForm {
  whatsapp: string;
  observation: string;
  paymentMethod: 'credit' | 'debit' | 'pix' | 'cash';
  address: Address;
  coupon: string;
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

export enum VeoModel {
  VEO = 'veo-3.1-generate-preview',
  VEO_FAST = 'veo-3.1-fast-generate-preview',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text to Video',
  FRAMES_TO_VIDEO = 'Frames to Video',
  REFERENCES_TO_VIDEO = 'References to Video',
  EXTEND_VIDEO = 'Extend Video',
}

export interface ImageFile {
  file: File;
  base64: string;
}

export interface VideoFile {
  file: File;
  base64: string;
}

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame?: ImageFile | null;
  endFrame?: ImageFile | null;
  referenceImages?: ImageFile[];
  styleImage?: ImageFile | null;
  inputVideo?: VideoFile | null;
  inputVideoObject?: Video | null;
  isLooping?: boolean;
}

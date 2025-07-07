// types/strapi.ts

export interface ImageFormats {
  thumbnail?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
}

export interface ImageData {
  url: string;
  formats?: ImageFormats;
}

export interface TextChild {
  text: string;
}

export interface TextBlock {
  type: string;
  children: TextChild[];
}

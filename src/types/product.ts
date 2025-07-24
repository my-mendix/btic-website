// src/types/product.ts

export interface Product {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  shortDescription: RichTextNode[];
  content: ProductComponent[];
  faqs: Faq[];
  seo: Seo[];
  localizations: Localization[];
}

export interface RichTextNode {
  type: 'paragraph' | string;
  children: TextNode[];
}

export interface TextNode {
  type: 'text' | string;
  text: string;
}

export interface ProductComponent {
  __component:
    | 'product.hero-section'
    | 'product.coverage-list'
    | 'product.downloads-block'
    | 'product.benefits-section'
    | 'product.claims-section';
  id: number;
  title?: string;
  description?: RichTextNode[];
  fileLabel?: string;
  shortDescription?: RichTextNode[];
}

export interface Faq {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  faq_question: string;
  faq_answers: string;
}

export interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
}

export interface Localization {
  id: number;
  locale: string;
  Slug: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


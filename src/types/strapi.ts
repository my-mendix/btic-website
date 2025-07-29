// src/types/strapi.ts

// =================================================================
// Reusable Basic Interfaces
// =================================================================

export interface Button {
  id: number;
  label: string;
  url: string;
}

export interface RichTextNode {
  type: 'paragraph';
  children: { type: 'text'; text: string }[];
}

export interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: RichTextNode[];
}

// =================================================================
// Strapi Media and Image Format Types
// =================================================================

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

// Wrapper for media responses where the media object is nested under a `data` property.
export interface StrapiMediaResponse {
  data: StrapiMedia;
}

// =================================================================
// Dynamic Zone Component Types
// =================================================================

export interface HeroSectionComponent {
  __component: 'product.hero-section';
  id: number;
  title: string;
  description: RichTextNode[];
  image: StrapiMediaResponse;
  buttons: Button[];
}

export interface CoverageListComponent {
  __component: "product.coverage-list";
  id: number;
  title?: string;
  items: {
    id: number;
    text: string;
  }[];
}

export interface ClaimsSectionComponent {
  __component: "product.claims-section";
  id: number;
  title: string;
  shortDescription: RichTextNode[];
  image: StrapiMediaResponse;
  buttons: Button[];
}

export interface DownloadsBlockComponent {
  __component: 'product.downloads-block';
  id: number;
  fileLabel: string;
  file: StrapiMediaResponse;
}

export interface AddonFeature {
  id: number;
  title: string;
  description: RichTextNode[];
  icon: StrapiMediaResponse;
}

export interface AddonsSectionComponent {
  __component: 'product.addons-section';
  id: number;
  title: string;
  features: AddonFeature[];
}

// Union type for all possible components in the dynamic zone.
export type ProductComponent =
  | HeroSectionComponent
  | ClaimsSectionComponent
  | CoverageListComponent
  | DownloadsBlockComponent
  | AddonsSectionComponent;

// =================================================================
// Main Product and API Response Types
// =================================================================

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: string;
  price?: number;
  locale: string;
  shortDescription: RichTextNode[];
  content: ProductComponent[];
  faqs: { data: Faq[] };
  seo: Seo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StaticProduct {
    id: number;
    documentId: string;
    Title: string;
    shortDescription: string;
    Price: string;
    Category: string;
    image: {
      id: number;
      documentId: string;
      url: string;
      name: string;
    };
    Buttons: Button[];
}


// The top-level structure of a Strapi API response for a single product.
export interface StrapiProductResponse {
  data: Product | null;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  meta: {};
}

// The top-level structure of a Strapi API response for multiple products.
export interface StrapiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


// src/types/strapi.ts

// ... (keep any other types you need for other pages) ...

// A single button from the Buttons array
export interface ProductButton {
  id: number;
  label: string;
  url: string;
}

// The image object
export interface ProductImage {
  id: number;
  url: string;
  name: string;
}

// The main object for a single product tile
export interface ProductTile {
  id: number;
  Title: string;
  shortDescription: string; // This is a simple string now
  Price: string;
  Category: string;
  image: ProductImage;
  Buttons: ProductButton[];
}

// The top-level response from the /api/product-tiles endpoint
export interface StrapiProductTileResponse {
  data: ProductTile[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Types for Product Mega Menu Data
interface MegaMenuLink {
  name: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  category: string;
  links: MegaMenuLink[];
}

export interface ProductLink {
  id: number;
  name: string;
  href: string;
}

export interface ProductCategory {
  id: number;
  title: string;
  category: string;
  links: ProductLink[];
}

export interface ProductMenuDataApiResponse {
  data: ProductCategory[];
}


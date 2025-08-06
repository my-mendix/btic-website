// src/types/strapi.ts

// =================================================================
// Reusable Basic Interfaces
// =================================================================

export interface Button {
  id: number;
  label: string;
  url: string;
  label_ar: string;
  url_ar: string;
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
  size: number;
  url: string;
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
  id: number;
  title: string;
  title_ar: string;
  file: {
    id: number;
    label: string;
    label_ar: string;
    file: StrapiMediaResponse;
    file_ar: StrapiMediaResponse;
  }[];
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
  hero: HeroComponent;
  claim: HeroComponent;
  download: DownloadsBlockComponent;
  seo: Seo;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroComponent {
  id: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  image: StrapiMedia;
  buttons: Button[];
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
  title: string;
  shortDescription: string; // This is a simple string now
  minimumPrice: string;
  group: string;
  category: string;
  cardImage: ProductImage;
  cardButtons: ProductButton[];
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
interface MainMenuLink {
  name: string;
  href: string;
  nameAr: string;
  hrefAr: string;
}

export interface MainMenuColumn {
  title: string;
  titleAr: string;
  category: string;
  links: MainMenuLink[];
}

export interface ProductLink {
  id: number;
  name: string;
  nameAr: string;
  href: string;
  hrefAr: string;
}

export interface ProductCategory {
  id: number;
  title: string;
  titleAr: string;
  category: string;
  links: ProductLink[];
}

export interface ProductMenuDataApiResponse {
  data: ProductCategory[];
}

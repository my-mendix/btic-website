import { 
  StrapiText,
  ProductData, 
  ProductHeroSection,
  ProductClaimsSection,
  ProductDownloadsBlock
} from "@/types/product";

// Define a union type for all possible components
export type ContentComponent = 
  | ProductHeroSection
  | ProductClaimsSection
  | ProductDownloadsBlock;

export function parseStrapiText(textData: StrapiText[]): string {
  return textData.map(block => {
    if (block.text) return block.text;
    if (block.children) {
      return block.children.map(child => child.text || "").join("");
    }
    return "";
  }).join("\n");
}

// Updated extractComponent with type safety
export function extractComponent<T extends ContentComponent>(
  content: ContentComponent[],
  componentType: T['__component']
): T | null {
  const component = content.find(item => item.__component === componentType);
  return component ? component as T : null;
}

// Helper to parse component text content
export function parseComponentText(content: StrapiText[]): string {
  return content.flatMap(block => 
    block.children?.map(child => child.text || "") || [block.text || ""]
  ).join(" ");
}
// Update in parseProductData function
export function parseProductData(data: ProductData): ParsedProduct {
  const attributes = data.attributes || {};
  const content = attributes.content || [];
  const faqs = attributes.faqs || [];
  const seo = attributes.seo?.[0] || { 
    metaTitle: attributes.Title || "",
    metaDescription: attributes.shortDescription?.[0]?.text || ""
  };

  // Extract all component types
  const hero = extractComponent<ProductHeroSection>(
    content,
    "product.hero-section"
  );
  
  const claims = extractComponent<ProductClaimsSection>(
    content,
    "product.claims-section"
  );

  const downloads = extractComponent<ProductDownloadsBlock>(
    content,
    "product.downloads-block"
  );

  return {
    id: data.id,
    title: attributes.Title || "",
    slug: attributes.Slug || "",
    category: attributes.Category || "",
    locale: attributes.locale || "en",
    shortDescription: parseStrapiText(attributes.shortDescription || []),
    heroSection: hero ? {
      ...hero,
      parsedDescription: parseComponentText(hero.description || [])
    } : null,
    claimsSection: claims ? {
      ...claims,
      parsedDescription: parseComponentText(claims.shortDescription || [])
    } : null,
    downloadsSection: downloads ? {
      ...downloads,
      fileLabel: downloads.fileLabel || "Download"
    } : null,
    faqs: faqs.map(faq => ({
      question: faq.faq_question || "",
      answer: faq.faq_answers || ""
    })),
    seo: {
      metaTitle: seo.metaTitle || attributes.Title || "",
      metaDescription: seo.metaDescription || 
        attributes.shortDescription?.[0]?.text || ""
    }
  };
}

// Update ParsedProduct type
export type ParsedProduct = {
  id: number;
  title: string;
  slug: string;
  category: string;
  locale: string;
  shortDescription: string;
  heroSection: (ProductHeroSection & { parsedDescription: string }) | null;
  claimsSection: (ProductClaimsSection & { parsedDescription: string }) | null;
  downloadsSection: (ProductDownloadsBlock & { fileLabel: string }) | null;
  faqs: {
    question: string;
    answer: string;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};
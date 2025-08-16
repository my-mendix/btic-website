// src/data/menuData.ts

export interface MegaMenuLink {
  name: string;
  name_ar: string;
  href: string;
  href_ar: string;
}

export interface MegaMenuColumn {
  title: string;
  title_ar: string;
  category: string;
  category_ar: string;
  links: MegaMenuLink[];
}

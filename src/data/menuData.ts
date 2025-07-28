// src/data/menuData.ts

export interface MegaMenuLink {
  name: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  category: string;
  links: MegaMenuLink[];
}

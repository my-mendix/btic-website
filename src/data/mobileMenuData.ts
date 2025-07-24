// src/data/mobileMenuData.ts
import { 
  FaHome, 
  FaUser, 
  FaBuilding, 
  FaCompass, 
  FaLink 
} from 'react-icons/fa';
import { IconType } from 'react-icons';

// Define the types for our menu items
export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  href?: string; // Optional if it's just an accordion trigger
  icon: IconType;
  subItems?: SubMenuItem[];
}

// Populate the data based on your screenshot
export const mobileMenuData: MenuItem[] = [
  { label: 'Home', href: '/', icon: FaHome },
  { 
    label: 'Individual', 
    icon: FaUser,
    subItems: [
      { label: 'Individual Products', href: '/individual/products' },
      { label: 'Claims', href: '/individual/claims' },
    ]
  },
  { 
    label: 'Corporate', 
    icon: FaBuilding,
    subItems: [
      { label: 'Corporate Solutions', href: '/corporate/solutions' },
      { label: 'Group Policies', href: '/corporate/policies' },
    ]
  },
  { 
    label: 'Explore Boubyan', 
    icon: FaCompass,
    subItems: [
      { label: 'About Us', href: '/about' },
      { label: 'Boubyan Group', href: '/group' },
      { label: 'Sustainability Report', href: '/sustainability' },
    ]
  },
  { 
    label: 'Quick Links', 
    icon: FaLink,
    subItems: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ]
  },
];
import { ProductComponent } from "@/types/strapiResponseDataTypes";
import React from "react";

import HeroSection from "./HeroSection";
import CoverageList from "./CoverageList";
import ClaimsSection from "./ClaimsSection";
import DownloadsBlock from "./DownloadsBlock";
import AddonsSection from "./AddonsSection";

interface Props {
  component: ProductComponent;
  lang: string;
}

// A map of component types to their respective React components.
// This approach is more scalable and type-safe than a switch statement.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: { [key: string]: React.FC<any> } = {
  "product.hero-section": HeroSection,
  "product.coverage-list": CoverageList,
  "product.claims-section": ClaimsSection,
  "product.downloads-block": DownloadsBlock,
  "product.addons-section": AddonsSection,
};

const ComponentRenderer: React.FC<Props> = ({ component, lang }) => {
  // Look up the component in the map.
  const Component = componentMap[component.__component];
  // console.log('Component:', Component.toString());

  if (!Component) {
    console.warn(`Component not implemented: ${component.__component}`);
    return null;
  }

  // The `data` prop is passed down to the specific component.
  return <Component data={component} lang={lang} />;
};

export default ComponentRenderer;

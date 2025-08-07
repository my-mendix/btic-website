import { ProductComponent } from "@/types/strapiResponseDataTypes";
import React from "react";
import CoverageList from "./CoverageList";
import AddonsSection from "./AddonsSection";

interface Props {
  component: ProductComponent;
  lang: string;
}

// A map of component types to their respective React components.
// This approach is more scalable and type-safe than a switch statement.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: { [key: string]: React.FC<any> } = {
  "product.coverage-list": CoverageList,
  "product.addon": AddonsSection,
};

const ComponentRenderer: React.FC<Props> = ({ component, lang }) => {
  // Look up the component in the map.
  const Component = componentMap[component.__component];

  if (!Component) {
    console.warn(`Component not implemented: ${component.__component}`);
    return null;
  }

  // The `data` prop is passed down to the specific component.
  return <Component data={component} lang={lang} />;
};

export default ComponentRenderer;

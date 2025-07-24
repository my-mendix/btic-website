"use client";

import { useEffect, useState } from "react";
import { fetchProductsClient } from "@/lib/fetchClient";
import { Product, ProductComponent, RichTextNode } from "@/types/product";
import { useParams } from "next/navigation";

function RichTextBlock({ nodes }: { nodes: RichTextNode[] }) {
  return (
    <>
      {nodes?.map((node, i) => (
        <p key={i} className="mb-4">
          {node.children?.map((child, j) => (
            <span key={j}>{child.text}</span>
          ))}
        </p>
      ))}
    </>
  );
}

function renderComponent(component: ProductComponent) {
  switch (component.__component) {
    case "product.hero-section":
      return (
        <section key={component.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{component.title}</h2>
          {component.description && (
            <RichTextBlock nodes={component.description} />
          )}
        </section>
      );

    case "product.coverage-list":
      return (
        <section key={component.id} className="mb-8">
          <h2 className="text-xl font-bold">Coverage List</h2>
          <p>Coverage details are coming soon…</p>
        </section>
      );

    case "product.downloads-block":
      return (
        <section key={component.id} className="mb-8">
          <h2 className="text-xl font-bold">Downloads</h2>
          {component.fileLabel && <p>{component.fileLabel}</p>}
        </section>
      );

    case "product.benefits-section":
      return (
        <section key={component.id} className="mb-8">
          <h2 className="text-xl font-bold">Benefits</h2>
          <p>Benefits section content coming soon…</p>
        </section>
      );

    case "product.claims-section":
      return (
        <section key={component.id} className="mb-8">
          <h2 className="text-xl font-bold">
            {component.title || "Claims Section"}
          </h2>
          {component.shortDescription && (
            <RichTextBlock nodes={component.shortDescription} />
          )}
        </section>
      );

    default:
      return null;
  }
}

export default function ProductPageClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductsClient()
      .then((products) => {
        const found = products.find((p) => p.Slug === slug);
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{product.Title}</h1>

      {product.shortDescription?.length > 0 && (
        <section className="mb-10">
          <RichTextBlock nodes={product.shortDescription} />
        </section>
      )}

      {product.content?.map((component) => renderComponent(component))}

      {product.faqs?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          {product.faqs.map((faq) => (
            <div key={faq.id} className="mb-4">
              <h4 className="font-semibold">{faq.faq_question}</h4>
              <p>{faq.faq_answers}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

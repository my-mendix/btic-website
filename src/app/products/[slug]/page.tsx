// src/app/products/[slug]/page.tsx
import { fetchProductBySlug } from '@/lib/strapi';
import ComponentRenderer from '@/components/product-page/ComponentRenderer';
import RichTextBlock from '@/components/product-page/RichTextBlock';
import styles from '@/app/ProductPage.module.css';
import FaqSection from '@/components/product-page/FaqSection';

interface ProductPageProps {
  params: { slug: string };
}


export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProductBySlug(params.slug);

  return (
    <main className={styles.pageContainer}>
      {/* Short Description */}
      {product?.shortDescription?.length > 0 && (
        <section className={styles.introSection}>
          <RichTextBlock nodes={product.shortDescription} />
        </section>
      )}

      {/* Content Blocks */}
      {Array.isArray(product?.content) &&
        product.content.map(component => (
          <ComponentRenderer
            key={`${component.__component}-${component.id}`}
            component={component}
          />
        ))}


      {/* FAQ Section */}
      <FaqSection faqs={product.faqs.data} />
      
    </main>
  );
}

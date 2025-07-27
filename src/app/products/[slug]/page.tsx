// src/app/products/[slug]/page.tsx
import { fetchProductBySlug } from '@/lib/strapi';
import ComponentRenderer from '@/components/product-page/ComponentRenderer';
import RichTextBlock from '@/components/product-page/RichTextBlock';
import styles from '@/app/ProductPage.module.css';
import FaqSection from '@/components/product-page/FaqSection';

interface ProductPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);

  const faqs = (product.faqs as unknown as { id: number; faq_question: string; faq_answers: string }[]).map((faq) => ({
    id: faq.id,
    question: faq.faq_question,
    answer: faq.faq_answers.split('\n').map(line => ({
      type: 'paragraph' as const,
      children: [{ type: 'text' as const, text: line }],
    })),
  }));

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
      <FaqSection faqs={faqs} />
      
    </main>
  );
}

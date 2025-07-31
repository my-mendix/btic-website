// src/app/products/[slug]/page.tsx
import { fetchProductBySlug } from '@/lib/strapi';
import ComponentRenderer from '@/components/product-page/ComponentRenderer';
import styles from '@/app/ProductPage.module.css';
import FaqSection from '@/components/product-page/FaqSection';

// It's crucial to correctly type the `params` prop as a Promise
// and ensure the component is an 'async' function, as it is a server component.
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>; // Type 'params' as a Promise
}) {
  // Await 'params' to resolve the Promise and get the actual object
  const { slug } = await params; 
  
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
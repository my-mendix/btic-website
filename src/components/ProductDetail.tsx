import React from "react";
import { ParsedProduct } from "@/utils/strapiParser";

interface ProductDetailProps {
  product: ParsedProduct;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        {product.category && (
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {product.category}
          </span>
        )}
        {product.shortDescription && (
          <p className="text-gray-600 mt-4">{product.shortDescription}</p>
        )}
      </header>
      
      {/* Hero Section */}
      {product.heroSection && (
        <section className="mb-10 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {product.heroSection.title}
          </h2>
          {product.heroSection.parsedDescription && (
            <p className="text-gray-700">
              {product.heroSection.parsedDescription}
            </p>
          )}
        </section>
      )}
      
      {/* Claims Section */}
      {product.claimsSection && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            {product.claimsSection.title}
          </h2>
          {product.claimsSection.parsedDescription && (
            <p className="text-gray-700">
              {product.claimsSection.parsedDescription}
            </p>
          )}
        </section>
      )}
      
      {/* Downloads Section */}
      {product.downloadsSection && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
          <div className="bg-gray-100 p-4 rounded-lg inline-block">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="text-gray-700 font-medium">
                {product.downloadsSection.fileLabel}
              </span>
            </div>
          </div>
        </section>
      )}
      
      {/* FAQs */}
      {product.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {product.faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
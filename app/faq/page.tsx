import React from 'react';

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What products do you offer?</h2>
          <p className="mb-4">
            We offer a wide range of home decor products, including sofas, chairs, tables, and accessories. Our products are designed to enhance the comfort and style of your home.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">How can I contact customer support?</h2>
          <p className="mb-4">
            You can reach our customer support team by filling out the contact form on our Contact Us page or by emailing us at support@thecozysofa.com.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Do you ship internationally?</h2>
          <p className="mb-4">
            Yes, we offer international shipping to select countries. Please check our shipping policy for more details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 
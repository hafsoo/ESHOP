import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order in your account's order history section. Tracking details are updated once the item is shipped. We also send tracking emails. Orders are typically processed within 1-2 business days.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, PayPal, and select mobile wallets. All payments are processed securely using encrypted connections. Some regions may support cash on delivery.",
    },
    {
      question: "How can I return a product?",
      answer:
        "To return a product, visit your orders page and select 'Return'. Follow the steps to generate a return label. Returns are accepted within 7 days of delivery with original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping rates and delivery times vary by destination. International orders may be subject to customs fees.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via live chat, email (support@example.com), or call our hotline. Our team is available 24/7 to assist you with any concerns or inquiries.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "Orders can only be changed or canceled within 1 hour of placement. Go to your order details and select the relevant option. After that, you may need to initiate a return.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Yes, all electronic items come with a 6-12 month manufacturer warranty. You can check warranty eligibility in the product description or contact support for verification.",
    },
  ];

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(index + 1)}
            >
              <span className="text-lg font-medium text-gray-900">
                {faq.question}
              </span>
              <span
                className={`transform transition-transform duration-300 ${
                  activeTab === index + 1 ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
            {activeTab === index + 1 && (
              <div className="mt-4">
                <p className="text-base text-gray-500">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;

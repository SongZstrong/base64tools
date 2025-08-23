import React from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  showHelpSection?: boolean;
  showTipsSection?: boolean;
}

export default function FAQ({ 
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about this tool",
  faqs,
  showHelpSection = true,
  showTipsSection = true
}: FAQProps) {
  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
              {faq.question}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {showHelpSection && (
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
            Still Need Help?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you couldn&apos;t find the answer to your question here, we&apos;re here to help! 
            Our team is always ready to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/contact" 
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
              Contact Support
            </Link>
            <Link 
              href="/" 
              className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-center"
            >
              Try Our Tools
            </Link>
          </div>
        </div>
      )}

      {showTipsSection && (
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            Quick Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Always validate your input before processing</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Use UTF-8 encoding for international characters</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Check the output format matches your needs</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Consider file size when working with large data</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Use our tools for quick processing</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Save your work regularly</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

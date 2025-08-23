'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

export default function FAQ() {
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "FAQ - Frequently Asked Questions | Base64 Tools Online";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Find answers to frequently asked questions about Base64 encoding, decoding, and our online tools. Get help with common issues and learn how to use our encoding utilities effectively.');
    }
  }, []);

  const faqs = [
    {
      question: "What is Base64 encoding?",
      answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to transmit data that might contain special characters through text-based protocols like HTTP, email, or JSON. Base64 encoding converts binary data into a 64-character subset of ASCII, making it safe for transmission."
    },
    {
      question: "When should I use Base64 encoding?",
      answer: "Base64 encoding is useful when you need to: embed images in CSS or HTML, store binary data in JSON, send files via email, include binary data in URLs, or store data in localStorage. It's particularly helpful when working with APIs that only accept text data."
    },
    {
      question: "How does Base64 encoding work?",
      answer: "Base64 encoding works by taking 3 bytes of binary data and converting them into 4 ASCII characters. The process involves: 1) Taking 3 bytes (24 bits), 2) Splitting them into 6-bit chunks, 3) Converting each 6-bit chunk to a corresponding character from the Base64 alphabet (A-Z, a-z, 0-9, +, /), 4) Adding padding (=) if needed to make the total length divisible by 4."
    },
    {
      question: "What are the advantages of Base64 encoding?",
      answer: "Base64 encoding provides several advantages: it's universally supported across all platforms and programming languages, it's safe for transmission through text-based protocols, it can represent any binary data as text, it's human-readable (though not human-friendly), and it's reversible - you can always decode it back to the original data."
    },
    {
      question: "What are the disadvantages of Base64 encoding?",
      answer: "Base64 encoding has some drawbacks: it increases the data size by approximately 33% (3 bytes become 4 characters), it's not suitable for large files due to size increase, it's not secure (it's encoding, not encryption), and the encoded data is not human-friendly to read or edit."
    },
    {
      question: "How do I know if a string is valid Base64?",
      answer: "A valid Base64 string should: contain only characters from the Base64 alphabet (A-Z, a-z, 0-9, +, /), have a length that's divisible by 4, and use padding characters (=) only at the end. Our tools automatically validate input and will show an error if the format is invalid."
    },
    {
      question: "Can Base64 handle Unicode characters?",
      answer: "Yes, our Base64 tools can handle Unicode characters. When encoding text with Unicode characters, the text is first converted to UTF-8 bytes, then encoded to Base64. When decoding, the Base64 is converted back to UTF-8 bytes and then to the original Unicode text. This ensures proper handling of international characters, emojis, and special symbols."
    },
    {
      question: "Is Base64 encoding secure?",
      answer: "No, Base64 encoding is not secure. It's a form of encoding, not encryption. Base64-encoded data can be easily decoded by anyone who has access to it. If you need to secure data, you should use proper encryption methods like AES, RSA, or other cryptographic algorithms. Base64 is only meant for data representation, not data protection."
    },
    {
      question: "How do I convert images to Base64?",
      answer: "To convert an image to Base64, you can use our Image to Base64 tool. Simply upload your image file, and the tool will convert it to a Base64 string. This is useful for embedding images directly in HTML, CSS, or JSON without needing to host the image file separately."
    },
    {
      question: "What's the difference between encoding and decoding?",
      answer: "Encoding converts original data (like text or binary) into Base64 format, while decoding converts Base64 data back to its original format. Think of encoding as 'packing' data into Base64 format and decoding as 'unpacking' it back to the original form. You always encode first to create Base64 data, then decode later to retrieve the original data."
    },
    {
      question: "Why does my Base64 string have padding characters (=)?",
      answer: "Padding characters (=) are added to Base64 strings to ensure the total length is divisible by 4. Since Base64 encoding works in groups of 3 bytes (24 bits) that become 4 characters, padding is needed when the original data length isn't a multiple of 3. The padding doesn't contain any actual data - it's just to maintain the proper format."
    },
    {
      question: "Can I use Base64 for large files?",
      answer: "While technically possible, Base64 encoding is not recommended for large files because: 1) It increases file size by about 33%, 2) It consumes more memory during processing, 3) It's slower to encode/decode large amounts of data, 4) It's not efficient for storage or transmission. For large files, consider using binary file transfer methods or compression instead."
    }
  ];

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about Base64 encoding, decoding, and our tools
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

      {/* Additional Help Section */}
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
          Still Need Help?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you couldn&apos;t find the answer to your question here, we&apos;re here to help! 
          Our team is always ready to assist you with any Base64-related questions or issues.
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

      {/* Quick Tips Section */}
      <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
          Quick Tips for Using Base64
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Always validate Base64 input before decoding</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Use UTF-8 encoding for international characters</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Consider file size when encoding large files</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Remember that Base64 is not encryption</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Use our tools for quick encoding/decoding</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">Check the output format matches your needs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
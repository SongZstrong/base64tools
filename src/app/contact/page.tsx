'use client';
import { useEffect, useState } from "react";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "Contact Us - Base64 Tools Online | Get in Touch";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact Base64 Tools Online for support, feedback, or questions about our free online encoding and decoding tools. We\'re here to help you with all your encoding needs.');
    }
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We&apos;d love to hear from you! Get in touch for support, feedback, or questions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Send us a Message
          </h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white"
              >
                <option value="">Select a subject</option>
                <option value="general">General Question</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback & Suggestions</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white resize-vertical"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            * Required fields. We&apos;ll get back to you within 24 hours.
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Direct Contact */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Email</h3>
                  <p className="text-blue-700 dark:text-blue-300">contact@base64toolsonline.com</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Usually responds within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.788.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033zm-.744 1.07a3.002 3.002 0 00-.248 2.806l1.52 1.52a4.001 4.001 0 012.49.012l1.599-1.6a5.974 5.974 0 00-3.771-1.738z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Support Hours</h3>
                  <p className="text-green-700 dark:text-green-300">Monday - Friday: 9:00 AM - 6:00 PM UTC</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Weekend support available for urgent issues</p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Common Questions
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>How do I use the Base64 tools?</strong> Check our <a href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">FAQ page</a> for detailed instructions.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Are your tools free?</strong> Yes, all our tools are completely free to use.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Is my data safe?</strong> We process data locally and never store sensitive information.
                </span>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
              What to Expect
            </h2>
            <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <p>• <strong>Response Time:</strong> Within 24 hours (usually much faster)</p>
              <p>• <strong>Support Quality:</strong> Detailed, helpful responses from our team</p>
              <p>• <strong>Follow-up:</strong> We&apos;ll ensure your issue is resolved</p>
              <p>• <strong>Feedback:</strong> We welcome suggestions for improvements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contact Methods */}
      <div className="mt-12 bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
          Other Ways to Connect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send us a detailed message and we&apos;ll get back to you quickly
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-3xl mb-3">❓</div>
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">FAQ Section</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check our FAQ page for answers to common questions
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Try Our Tools</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Test our tools first - they might solve your issue immediately
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              How quickly do you respond to messages?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We typically respond to all messages within 24 hours, and often much faster. For urgent technical issues, we prioritize quick responses to ensure you can continue your work without delays.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What information should I include in my message?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Please include your name, email, the specific tool you&apos;re using, a description of the issue or question, and any error messages you&apos;re seeing. The more details you provide, the better we can help you.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Can you help with specific coding problems?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Yes! We can help with issues related to our tools, Base64 encoding/decoding problems, and general questions about the technologies we use. For complex coding problems, we&apos;ll provide guidance and examples.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Do you offer technical support for businesses?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Yes, we provide technical support for both individual users and businesses. Whether you&apos;re using our tools for personal projects or enterprise applications, we&apos;re here to help ensure your success.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              How can I report a bug or suggest a feature?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Use our contact form and select &quot;Report a Bug&quot; or &quot;Feature Request&quot; as the subject. Include detailed information about the issue or your suggestion. We review all feedback and implement improvements regularly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Is there a limit to how many times I can contact you?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              No, there&apos;s no limit! We encourage you to reach out whenever you need help. Whether it&apos;s your first question or your hundredth, we&apos;re committed to providing the same level of support and assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
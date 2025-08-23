'use client';
import { useEffect, useState } from "react";

export default function About() {
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "About Us - Base64 Tools Online | Free Online Encoding Tools";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Base64 Tools Online - your trusted source for free online encoding and decoding tools. Discover our mission to provide reliable, secure, and user-friendly utilities for developers and users worldwide.');
    }
  }, []);

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          About Base64 Tools Online
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Providing free, reliable, and user-friendly online tools since 2024
        </p>
      </div>

      <div className="space-y-8">
        {/* Our Mission */}
        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            At Base64 Tools Online, we believe that powerful development tools should be accessible to everyone. 
            Our mission is to provide a comprehensive collection of free, reliable, and user-friendly online tools 
            that help developers, system administrators, and everyday users accomplish their tasks efficiently.
          </p>
        </section>

        {/* What We Do */}
        <section className="bg-white/90 dark:bg-black/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
                Free Online Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We develop and maintain a suite of free online tools that cover common development tasks 
                like Base64 encoding/decoding, JSON formatting, encryption, and more.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">
                User Experience Focus
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Every tool is designed with user experience in mind - clean interfaces, fast performance, 
                and comprehensive error handling to make your work easier.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">
                Reliability & Security
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We prioritize the security and reliability of our tools, ensuring that your data is processed 
                safely and results are accurate every time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-600 dark:text-orange-400">
                Continuous Improvement
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We regularly update and improve our tools based on user feedback and emerging technologies 
                to provide the best possible experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Base64 Tools Online was born from a simple observation: developers and users often need quick access 
              to essential tools, but many existing solutions are either behind paywalls, cluttered with ads, 
              or simply not user-friendly.
            </p>
            <p>
              We started with a simple Base64 encoder/decoder tool and quickly realized the demand for more 
              comprehensive tool sets. Today, we offer a growing collection of tools that cover various aspects 
              of development work, all completely free and accessible from any device with a web browser.
            </p>
            <p>
              Our team consists of developers who understand the challenges of modern development work. 
              We use our own tools daily, which helps us identify areas for improvement and new features to add.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white/90 dark:bg-black/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-3xl mb-3">🆓</div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Free Access</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We believe knowledge and tools should be accessible to everyone, regardless of budget.
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data privacy is our priority. We process data locally when possible and never store sensitive information.
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Performance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We optimize for speed and reliability, ensuring our tools work quickly and consistently.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Get in Touch
          </h2>
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We value your feedback and suggestions. If you have ideas for new tools, 
              found a bug, or just want to say hello, we&apos;d love to hear from you.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> contact@base64toolsonline.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Response Time:</strong> Usually within 24 hours
              </p>
            </div>
            <div className="mt-6">
              <a 
                href="/contact" 
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="bg-white/90 dark:bg-black/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Our Commitment to You
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We&apos;re committed to maintaining the quality and reliability of our tools. 
            As we grow, we promise to keep our tools free, improve their functionality, 
            and add new features based on your needs. Your success is our success.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white/90 dark:bg-black/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Are your tools really free?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes, absolutely! All our tools are completely free to use with no hidden costs, registration requirements, or usage limits. We believe that essential development tools should be accessible to everyone.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                How do you maintain quality without charging?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We&apos;re passionate about creating useful tools and maintain quality through careful development practices, user feedback, and continuous improvement. Our commitment to quality drives us to deliver the best possible experience.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Can I suggest new tools or features?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Absolutely! We welcome suggestions for new tools and features. User feedback is crucial to our development process, and many of our current tools were created based on user requests. Contact us with your ideas!
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                How do you ensure tool reliability?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We thoroughly test all our tools before release and continuously monitor their performance. We use modern web technologies and follow best practices to ensure reliability, accuracy, and security in all our tools.
              </p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Do you store user data?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                No, we prioritize your privacy. Our tools process data locally in your browser whenever possible. We don&apos;t store, collect, or transmit your data to our servers, ensuring complete privacy and security.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                How can I support your project?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The best way to support us is by using our tools, providing feedback, and sharing them with others. If you find our tools helpful, consider bookmarking our site and recommending us to fellow developers and users.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

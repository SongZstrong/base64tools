'use client';
import { useEffect, useState } from "react";

export default function Terms() {
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "Terms of Service - Base64 Tools Online | Legal Information";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our Terms of Service for Base64 Tools Online. Understand the terms and conditions for using our free online encoding and decoding tools and services.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Terms of Service for base64toolsonine.com
          </h2>

          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Acceptance of Terms
              </h3>
              <p className="text-gray-600">
                By accessing and using base64toolsonine.com, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            {/* Use License */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Use License
              </h3>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on base64toolsonine.com for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on base64toolsonine.com</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Disclaimer
              </h3>
              <p className="text-gray-600">
                Our online calculators, converters, and content are provided &quot;as is&quot;, free of charge, and without any warranty or guarantee. Each tool is carefully developed and rigorously tested, and our content is well-sourced, but despite our best effort it is possible they contain errors. We are not to be held responsible for any resulting damages from proper or improper use of the service.
              </p>
            </section>

            {/* Limitations */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Limitations
              </h3>
              <p className="text-gray-600">
                In no event shall base64toolsonine.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on base64toolsonine.com.
              </p>
            </section>

            {/* Accuracy of Materials */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Accuracy of Materials
              </h3>
              <p className="text-gray-600">
                The materials appearing on base64toolsonine.com could include technical, typographical, or photographic errors. base64toolsonine.com does not warrant that any of the materials on its website are accurate, complete, or current. base64toolsonine.com may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            {/* Links */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Links
              </h3>
              <p className="text-gray-600">
                base64toolsonine.com has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by base64toolsonine.com of the site.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Modifications
              </h3>
              <p className="text-gray-600">
                base64toolsonine.com may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Governing Law
              </h3>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us through our website&apos;s contact form.
              </p>
            </section>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  Can I use your tools for commercial purposes?
                </h3>
                <p className="text-gray-600 text-sm">
                  Our tools are provided for personal, non-commercial use only. For commercial use, please contact us to discuss licensing options and terms.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  What happens if I violate the terms of service?
                </h3>
                <p className="text-gray-600 text-sm">
                  Violation of our terms may result in restricted access to our services. We reserve the right to take appropriate action to protect our platform and other users.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  Are there any usage limits?
                </h3>
                <p className="text-gray-600 text-sm">
                  While we don&apos;t impose strict usage limits, we expect reasonable use of our services. Excessive usage that impacts other users may be restricted.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  Can I modify or copy your tools?
                </h3>
                <p className="text-gray-600 text-sm">
                  No, our tools and materials are protected by copyright. You may not modify, copy, or reverse engineer any part of our services without explicit permission.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  How do I report violations of these terms?
                </h3>
                <p className="text-gray-600 text-sm">
                  If you witness violations of our terms of service, please contact us through our contact form. We take all reports seriously and will investigate accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
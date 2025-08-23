'use client';
import Link from "next/link";

export default function Footer() {
  const tools = [
    { href: "/", label: "Base64 Encode/Decode" },
    { href: "/image-to-base64", label: "Image to Base64" },
    { href: "/markdown-html", label: "Markdown ⇄ HTML" },
    { href: "/encryption-tools", label: "Encryption Tools" },
    { href: "/encoding-tools", label: "Encoding Tools" },
    { href: "/json-formatter", label: "JSON Formatter" },
    { href: "/regex-tester", label: "Regex Tester" },
  ];

  const faq = [
    { href: "/faq", label: "F.A.Q." },
  ];

  const others = [
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tools Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          {/* F.A.Q. Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">F.A.Q.</h3>
            <ul className="space-y-2">
              {faq.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Others Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Others</h3>
            <ul className="space-y-2">
              {others.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center space-y-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            Our online base64tools are provided &quot;as is&quot;, free of charge, and without any warranty or guarantee. Each tool is carefully developed and rigorously tested, and our content is well-sourced, but despite our best effort it is possible they contain errors. We are not to be held responsible for any resulting damages from proper or improper use of the service. See our full <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">terms of service</Link>.
          </p>
          <p className="text-gray-400 text-sm">
            Copyright © 2025 base64toolsonline.com
          </p>
        </div>
      </div>
    </footer>
  );
} 
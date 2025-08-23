'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Base64 Encode/Decode" },
    { href: "/image-to-base64", label: "Image to Base64" },
    { href: "/markdown-html", label: "Markdown ⇄ HTML" },
    { href: "/encryption-tools", label: "Encryption Tools" },
    { href: "/encoding-tools", label: "Encoding Tools" },
    { href: "/json-formatter", label: "JSON Formatter" },
    { href: "/regex-tester", label: "Regex Tester" },
  ];

  const infoItems = [
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full bg-foreground text-background py-4 px-4 md:px-8 shadow-md mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-lg tracking-wide">Base64 Tools</div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline underline-offset-4 font-medium text-sm whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-l border-white/20 h-6 mx-2"></div>
          {infoItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline underline-offset-4 font-medium text-sm whitespace-nowrap text-white/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Tablet Navigation - Scrollable */}
        <div className="hidden md:flex lg:hidden items-center gap-3 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:underline underline-offset-4 font-medium text-sm whitespace-nowrap flex-shrink-0"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 px-4">
          <div className="bg-white/10 rounded-lg p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:bg-white/10 rounded px-3 py-2 font-medium text-sm transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-3 mt-3">
              {infoItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block hover:bg-white/10 rounded px-3 py-2 font-medium text-sm transition-colors text-white/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
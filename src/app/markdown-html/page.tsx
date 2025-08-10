'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import TurndownService from 'turndown';

export default function MarkdownHtml() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'md2html' | 'html2md'>('md2html');
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "Markdown to HTML Converter - Free Online Tool | Base64 Tools Online";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Markdown to HTML and HTML to Markdown converter. Convert between Markdown and HTML formats with our easy-to-use tools. Perfect for content creators and developers.');
    }
  }, []);

  const examples = {
    md2html: `# Welcome to Markdown

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- \`Inline code\`

\`\`\`javascript
// Code block
function hello() {
  console.log("Hello World!");
}
\`\`\`

- List item 1
- List item 2
  - Nested item

> This is a blockquote`,

    html2md: `<h1>Welcome to HTML</h1>
<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<blockquote>
  <p>This is a blockquote</p>
</blockquote>
<a href="https://example.com">Link</a>`
  };

  const tutorial = {
    md2html: [
      { title: "Headers", content: "Use # for h1, ## for h2, etc." },
      { title: "Bold & Italic", content: "**bold** and *italic* text" },
      { title: "Links", content: "[text](url) for links" },
      { title: "Code", content: "`inline code` and ```code blocks```" },
      { title: "Lists", content: "- for unordered, 1. for ordered lists" },
      { title: "Blockquotes", content: "> for blockquotes" }
    ],
    html2md: [
      { title: "Headers", content: "<h1> to <h6> tags" },
      { title: "Paragraphs", content: "<p> tags for paragraphs" },
      { title: "Formatting", content: "<strong>, <em>, <code> tags" },
      { title: "Lists", content: "<ul>, <ol>, <li> tags" },
      { title: "Links", content: "<a href='url'>text</a> tags" },
      { title: "Blockquotes", content: "<blockquote> tags" }
    ]
  };

  function handleConvert() {
    try {
      if (mode === 'md2html') {
        setOutput(marked.parse(input) as string);
      } else {
        const turndownService = new TurndownService();
        setOutput(turndownService.turndown(input));
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setOutput('Error: Unable to convert. Please check your input.');
    }
  }

  function handleCopy() {
    if (output) {
      if (typeof window !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output).catch(err => {
          console.error('Failed to copy to clipboard:', err);
          // Fallback: select text and show message
          const textArea = document.createElement('textarea');
          textArea.value = output;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            alert('Result copied to clipboard!');
          } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            alert('Copy failed. Please manually select and copy the text.');
          }
          document.body.removeChild(textArea);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = output;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Result copied to clipboard!');
        } catch (err) {
          console.error('Copy failed:', err);
          alert('Copy failed. Please manually select and copy the text.');
        }
        document.body.removeChild(textArea);
      }
    }
  }

  function loadExample() {
    setInput(examples[mode]);
    setOutput('');
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-8 space-y-6">
      {/* Main Converter */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2">Markdown ⇄ HTML Converter</h1>
        
        <div className="flex gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded font-medium border transition ${
              mode === 'md2html' 
                ? 'bg-foreground text-background' 
                : 'bg-transparent text-foreground border-foreground'
            }`}
            onClick={() => setMode('md2html')}
          >
            Markdown to HTML
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border transition ${
              mode === 'html2md' 
                ? 'bg-foreground text-background' 
                : 'bg-transparent text-foreground border-foreground'
            }`}
            onClick={() => setMode('html2md')}
          >
            HTML to Markdown
          </button>
        </div>
        
        <textarea
          className="w-full min-h-[100px] p-2 border rounded mb-2 text-base bg-white/90 dark:bg-black/30"
          placeholder={mode === 'md2html' ? 'Enter Markdown here...' : 'Enter HTML here...'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full py-2 bg-black text-white rounded font-semibold hover:bg-gray-800 transition mb-2 disabled:opacity-50"
        >
          Convert to {mode === 'md2html' ? 'HTML' : 'Markdown'}
        </button>
        
        <textarea
          className="w-full min-h-[100px] p-2 border rounded text-base bg-white/90 dark:bg-black/30 mb-2"
          placeholder={mode === 'md2html' ? 'HTML output...' : 'Markdown output...'}
          value={output}
          readOnly
        />
        
        <button
          onClick={handleCopy}
          disabled={!output}
          className="w-full py-2 bg-black text-white rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          Copy Output
        </button>
      </div>

      {/* Examples Section */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Examples</h2>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={loadExample}
          >
            Load Example
          </button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/20 p-3 rounded border">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200 text-sm">
            {mode === 'md2html' ? 'Markdown Example' : 'HTML Example'}
          </h3>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {examples[mode]}
          </pre>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8">
        <h2 className="text-lg font-bold mb-4">
          {mode === 'md2html' ? 'Markdown Syntax Guide' : 'HTML Elements Guide'}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {tutorial[mode].map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded border">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8">
        <h2 className="text-lg font-bold mb-4">Features</h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Full Markdown syntax support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>HTML to Markdown conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Code highlighting</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Tables and lists</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Links and images</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Real-time conversion</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What is Markdown?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Markdown is a lightweight markup language that uses plain text formatting syntax to create rich text documents. 
              It&apos;s designed to be easy to read and write, making it popular for documentation, README files, and content creation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              When should I convert Markdown to HTML?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Convert Markdown to HTML when you need to display content on websites, in web applications, or when 
              you want to add styling and interactivity that HTML provides. HTML is the standard format for web content.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Can I convert HTML back to Markdown?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Yes, our tool can convert HTML back to Markdown. This is useful when you have existing HTML content 
              that you want to convert to Markdown format for easier editing or documentation purposes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What Markdown features are supported?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Our converter supports all standard Markdown features including headers, bold/italic text, links, 
              images, code blocks, lists, blockquotes, and tables. It handles both inline and block-level elements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Is the conversion lossless?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              While our converter preserves the semantic meaning of your content, some formatting details may vary 
              slightly between Markdown and HTML due to differences in how they represent certain elements. The core 
              content and structure remain intact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
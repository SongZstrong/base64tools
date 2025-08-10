'use client';

import { useState, useEffect } from 'react';

export default function EncodingTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [method, setMethod] = useState<'base64' | 'url' | 'unicode' | 'hex'>('base64');
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "Encoding Tools - Base64, URL, Unicode, Hex Encoder/Decoder | Base64 Tools Online";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online encoding and decoding tools. Convert between Base64, URL encoding, Unicode escape sequences, and hexadecimal formats. Perfect for developers and data processing.');
    }
  }, []);

  const examples = {
    base64: {
      input: 'Hello World!',
      encoded: 'SGVsbG8gV29ybGQh',
      decoded: 'Hello World!'
    },
    url: {
      input: 'Hello World!',
      encoded: 'Hello%20World!',
      decoded: 'Hello World!'
    },
    unicode: {
      input: 'Hello World!',
      encoded: '\\u0048\\u0065\\u006c\\u006c\\u006f\\u0020\\u0057\\u006f\\u0072\\u006c\\u0064\\u0021',
      decoded: 'Hello World!'
    },
    hex: {
      input: 'Hello World!',
      encoded: '48656c6c6f20576f726c6421',
      decoded: 'Hello World!'
    }
  } as const;

  const tutorial = {
    base64: [
      { title: "Base64 Encoding", content: "Converts binary data to ASCII text using 64 characters" },
      { title: "Use Cases", content: "Email attachments, data URLs, API responses" },
      { title: "Format", content: "A-Z, a-z, 0-9, +, /, = (padding)" }
    ],
    url: [
      { title: "URL Encoding", content: "Encodes special characters for safe URL transmission" },
      { title: "Use Cases", content: "URL parameters, form data, query strings" },
      { title: "Format", content: "% followed by two hex digits" }
    ],
    unicode: [
      { title: "Unicode Escape", content: "Represents Unicode characters as escape sequences" },
      { title: "Use Cases", content: "JavaScript strings, JSON, programming languages" },
      { title: "Format", content: "\\u followed by 4 hex digits" }
    ],
    hex: [
      { title: "Hexadecimal", content: "Converts text to hexadecimal representation" },
      { title: "Use Cases", content: "Binary data, debugging, low-level programming" },
      { title: "Format", content: "Each character becomes 2 hex digits" }
    ]
  };

  function handleConvert() {
    if (method === 'base64') {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        try {
          setOutput(decodeURIComponent(escape(atob(input))));
        } catch {
          setOutput('Decoding failed. Check your Base64 input.');
        }
      }
    } else if (method === 'url') {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        try {
          setOutput(decodeURIComponent(input));
        } catch {
          setOutput('Decoding failed. Check your URL encoded input.');
        }
      }
    } else if (method === 'unicode') {
      if (mode === 'encode') {
        setOutput(input.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join(''));
      } else {
        try {
          setOutput(input.replace(/\\u[\dA-F]{4}/gi, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))));
        } catch {
          setOutput('Decoding failed. Check your Unicode input.');
        }
      }
    } else if (method === 'hex') {
      if (mode === 'encode') {
        setOutput(input.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
      } else {
        try {
          setOutput(input.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '');
        } catch {
          setOutput('Decoding failed. Check your Hex input.');
        }
      }
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
    const example = examples[method];
    setInput(example.input);
    setOutput(mode === 'encode' ? example.encoded : example.decoded);
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-8 space-y-6">
      {/* Main Converter - Keep original functionality */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2">Encoding Tools</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Convert text between different encodings including Base64, URL encoding, Unicode, and more. 
          Perfect for web development and data processing.
        </p>
        <div className="flex gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded font-medium border ${mode === 'encode' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMode('encode')}
          >
            Encode
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border ${mode === 'decode' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMode('decode')}
          >
            Decode
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'base64' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('base64')}
          >
            Base64
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'url' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('url')}
          >
            URL Encoding
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'unicode' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('unicode')}
          >
            Unicode
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'hex' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('hex')}
          >
            Hex
          </button>
        </div>
        <textarea
          className="w-full min-h-[100px] p-2 border rounded mb-2 text-base bg-white/90 dark:bg-black/30"
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter text to decode...'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="w-full py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition mb-2"
          onClick={handleConvert}
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <textarea
          className="w-full min-h-[100px] p-2 border rounded text-base bg-white/90 dark:bg-black/30 mb-2"
          placeholder="Result..."
          value={output}
          readOnly
        />
        <button
          className="w-full py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition"
          onClick={handleCopy}
        >
          Copy Result
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
            {method.toUpperCase()} Example
          </h3>
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Input:</span>
              <pre className="mt-1 text-gray-600 dark:text-gray-400">{examples[method].input}</pre>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Encoded:</span>
              <pre className="mt-1 text-gray-600 dark:text-gray-400 break-all">{examples[method].encoded}</pre>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Decoded:</span>
              <pre className="mt-1 text-gray-600 dark:text-gray-400">{examples[method].decoded}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8">
        <h2 className="text-lg font-bold mb-4">
          {method.toUpperCase()} Encoding Guide
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {tutorial[method].map((item, index) => (
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
            <span>Multiple encoding formats</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Base64 encoding/decoding</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>URL encoding/decoding</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Unicode escape sequences</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Hexadecimal conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Real-time encoding/decoding</span>
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
              What&apos;s the difference between Base64 and URL encoding?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Base64 encoding converts binary data to ASCII text using 64 characters (A-Z, a-z, 0-9, +, /), 
              while URL encoding replaces special characters with percent-encoded values. Base64 is used for 
              binary data, URL encoding for safe URL transmission.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              When should I use Unicode escape sequences?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Use Unicode escape sequences when you need to represent Unicode characters in programming languages 
              that don&apos;t support them directly, or when working with JSON strings that need to be portable across 
              different systems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What are the advantages of hexadecimal encoding?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Hexadecimal encoding is useful for debugging binary data, representing memory addresses, 
              working with low-level programming, and when you need a compact representation of binary data 
              that&apos;s easy to read and manipulate.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              How do I choose the right encoding method?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Choose Base64 for binary data and email attachments, URL encoding for web parameters, 
              Unicode escapes for programming language compatibility, and hexadecimal for debugging 
              and low-level programming tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Set page title and meta description only on client
  useEffect(() => {
    setIsClient(true);
    document.title = "Base64 Encode Decode Online - Free Base64 Tools | Base64 Tools Online";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Base64 encoder and decoder tools. Convert text to Base64 format or decode Base64 back to original text. Fast, secure, and user-friendly encoding tools for developers.');
    }
  }, []);

  function handleConvert() {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError("Unable to convert input. Please check the format.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output && isClient) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
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

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Base64 Encoder and Decoder",
            "description": "Free online Base64 encoder and decoder tools for developers and users",
            "url": "https://base64toolsonline.com",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Base64 encoding",
              "Base64 decoding", 
              "Unicode support",
              "Real-time conversion",
              "Copy to clipboard",
              "Error handling"
            ],
            "author": {
              "@type": "Organization",
              "name": "Base64 Tools Online"
            }
          })
        }}
      />
      
      <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
        {/* SEO Optimized Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Base64 Encode and Decode Online
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Free online Base64 encoder and decoder tools for developers and users
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Convert text to Base64 format or decode Base64 back to original text with our fast, secure, and user-friendly online tools
          </p>
        </div>

      {/* What is Base64 Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
          What is Base64?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
          It&apos;s commonly used in web applications to transmit data that might contain special characters, 
          such as images, files, or binary data, through text-based protocols like HTTP, email, or JSON. 
          Our free online Base64 tools provide instant encoding and decoding capabilities with support for 
          Unicode characters and real-time conversion.
        </p>
      </div>

      {/* Main Tool Section */}
      <div className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Base64 Encoder & Decoder Tool
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Encode text to Base64 or decode Base64 to text. Supports Unicode characters and provides real-time conversion.
        </p>

        <div className="flex gap-6">
          {/* Input Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Input</h3>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 text-sm rounded font-medium border transition ${
                    mode === "encode" 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setMode("encode")}
                >
                  Encode
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded font-medium border transition ${
                    mode === "decode" 
                      ? "bg-green-500 text-white border-green-500" 
                      : "bg-transparent text-gray-600 border-gray-300 hover:border-green-400"
                  }`}
                  onClick={() => setMode("decode")}
                >
                  Decode
                </button>
                <button
                  onClick={handleConvert}
                  disabled={!input.trim()}
                  className="px-3 py-1 text-sm bg-purple-500 text-white rounded font-medium hover:bg-purple-600 transition disabled:opacity-50"
                >
                  Convert
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <textarea
              className={`w-full h-[300px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string to decode..."}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            
            {error && (
              <div className="text-red-600 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Output</h3>
              <button
                onClick={handleCopy}
                disabled={!output || !isClient}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
              >
                Copy
              </button>
            </div>
            
            <textarea
              className="w-full h-[300px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600"
              placeholder="Result will appear here..."
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          How to Use Our Base64 Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
              How to Encode Text to Base64
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Select the &quot;Encode&quot; mode (default)</li>
              <li>Enter your text in the input field</li>
              <li>Click &quot;Convert&quot; to generate Base64 output</li>
              <li>Use &quot;Copy&quot; button to copy the result</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">
              How to Decode Base64 to Text
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Select the &quot;Decode&quot; mode</li>
              <li>Paste your Base64 string in the input field</li>
              <li>Click &quot;Convert&quot; to decode to original text</li>
              <li>Use &quot;Copy&quot; button to copy the decoded result</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Why Choose Our Base64 Tools?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Encoding */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Base64 Encoding Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Text to Base64 conversion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Unicode character support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Real-time encoding</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Error handling and validation</span>
              </div>
            </div>
          </div>

          {/* Decoding */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Base64 Decoding Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Base64 to text conversion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">UTF-8 character support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Format validation</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">One-click copy result</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Base64 Usage Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white dark:bg-gray-700 p-4 rounded border border-gray-200 dark:border-gray-600">
            <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Text to Base64 Encoding</div>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <div><strong>Input:</strong> Hello, World!</div>
              <div><strong>Output:</strong> SGVsbG8sIFdvcmxkIQ==</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded border border-gray-200 dark:border-gray-600">
            <div className="font-semibold text-green-600 dark:text-green-400 mb-2">Base64 to Text Decoding</div>
            <div className="text-gray-600 dark:text-gray-400 space-y-1">
              <div><strong>Input:</strong> SGVsbG8sIFdvcmxkIQ==</div>
              <div><strong>Output:</strong> Hello, World!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Use Cases */}
      <div className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Common Base64 Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Web Development</div>
            <div className="text-gray-600 dark:text-gray-400">Embed images in CSS, store data in localStorage</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded">
            <div className="font-semibold text-green-600 dark:text-green-400 mb-2">API Communication</div>
            <div className="text-gray-600 dark:text-gray-400">Send binary data through JSON APIs</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
            <div className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Email Attachments</div>
            <div className="text-gray-600 dark:text-gray-400">Encode files for email transmission</div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          About Base64 Encoding and Decoding
        </h2>
        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Base64 encoding is a fundamental technique used in computer science and web development. 
            It converts binary data into a text format that can be safely transmitted over text-based protocols. 
            Our online Base64 tools provide a simple, fast, and reliable way to perform these conversions.
          </p>
          <p>
            Whether you&apos;re a developer working with APIs, a system administrator handling configuration files, 
            or simply need to encode/decode some text, our free Base64 encoder and decoder tools are designed 
            to meet your needs. With support for Unicode characters and real-time conversion, you can quickly 
            transform your data without any software installation.
          </p>
          <p>
            Our tools are optimized for performance and user experience, featuring a clean interface, 
            instant results, and comprehensive error handling. The Base64 converter supports various input 
            formats and provides clear output that&apos;s easy to copy and use in your applications.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/90 dark:bg-black/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mt-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What is Base64 encoding?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Base64 encoding is a method of converting binary data into ASCII text format. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data, making it safe for transmission over text-based protocols like HTTP, email, and JSON.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              When should I use Base64 encoding?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Use Base64 encoding when you need to transmit binary data through text-based channels, embed images in HTML/CSS, store binary data in JSON, or send file attachments via email. It&apos;s essential for web development and API communication.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Is Base64 encoding secure?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Base64 encoding is not encryption - it&apos;s just a data format conversion. It doesn&apos;t provide security or privacy. For sensitive data, use proper encryption algorithms like AES or RSA in addition to Base64 encoding.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              How does Base64 decoding work?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Base64 decoding reverses the encoding process by converting the Base64 string back to its original binary form. Our tool automatically detects the format and converts it back to readable text, supporting UTF-8 characters.
            </p>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              Can I encode/decode large files?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For optimal performance, we recommend encoding/decoding text under 1MB. Larger files will work but may take longer to process. For very large files, consider using desktop applications or command-line tools.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
              What characters are supported?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our Base64 tools support all Unicode characters including international languages, emojis, and special symbols. The encoding process handles UTF-8 encoding automatically, ensuring compatibility across different platforms and systems.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

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
    if (output) {
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
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Base64 Encode/Decode</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Encode text to Base64 or decode Base64 to text. Supports Unicode characters and provides real-time conversion.
      </p>

      <div className="flex gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input</h2>
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
                    : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400"
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
            className={`w-full h-[400px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 ${
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
            <h2 className="text-lg font-semibold">Output</h2>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              Copy
            </button>
          </div>
          
          <textarea
            className="w-full h-[400px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600"
            placeholder="Result will appear here..."
            value={output}
            readOnly
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Encoding */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-blue-600">Encoding</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Text to Base64 conversion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Unicode character support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Real-time encoding</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Error handling and validation</span>
              </div>
            </div>
          </div>

          {/* Decoding */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-green-600">Decoding</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Base64 to text conversion</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">UTF-8 character support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Format validation</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">One-click copy result</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold text-blue-600">Encode Example</div>
            <div className="text-gray-600 mt-1">
              <strong>Input:</strong> Hello, World!<br/>
              <strong>Output:</strong> SGVsbG8sIFdvcmxkIQ==
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold text-green-600">Decode Example</div>
            <div className="text-gray-600 mt-1">
              <strong>Input:</strong> SGVsbG8sIFdvcmxkIQ==<br/>
              <strong>Output:</strong> Hello, World!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

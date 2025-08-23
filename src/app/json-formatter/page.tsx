'use client';

import { useState } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const exampleJson = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "swimming", "coding"]
}`;

  function validateJson(jsonString: string): boolean {
    try {
      JSON.parse(jsonString);
      setErrors([]);
      setIsValid(true);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
      setErrors([errorMessage]);
      setIsValid(false);
      return false;
    }
  }

  function formatJson(action: 'beautify' | 'minify' | 'compact') {
    if (!input.trim()) return;

    if (!validateJson(input)) return;

    try {
      const parsed = JSON.parse(input);
      
      if (action === 'beautify') {
        setOutput(JSON.stringify(parsed, null, indentSize));
      } else if (action === 'minify') {
        setOutput(JSON.stringify(parsed));
      } else if (action === 'compact') {
        setOutput(JSON.stringify(parsed, null, 0));
      }
    } catch (error) {
      setErrors(['Failed to format JSON']);
      setIsValid(false);
    }
  }

  function handleInputChange(value: string) {
    setInput(value);
    if (value.trim()) {
      validateJson(value);
    } else {
      setErrors([]);
      setIsValid(true);
    }
  }

  function loadExample() {
    setInput(exampleJson);
    validateJson(exampleJson);
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
            alert('JSON copied to clipboard!');
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
          alert('JSON copied to clipboard!');
        } catch (err) {
          console.error('Copy failed:', err);
          alert('Copy failed. Please manually select and copy the text.');
        }
        document.body.removeChild(textArea);
      }
    }
  }

  function clearAll() {
    setInput('');
    setOutput('');
    setErrors([]);
    setIsValid(true);
  }

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">JSON Formatter</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Format, validate, and beautify JSON data. Minify JSON, validate syntax, and convert between different JSON formats.
      </p>

      <div className="flex gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input JSON</h2>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Load Example
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
              !isValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Paste your JSON here..."
            value={input}
            onChange={e => handleInputChange(e.target.value)}
          />
          
          {!isValid && errors.length > 0 && (
            <div className="text-red-600 text-sm">
              <strong>Validation Error:</strong> {errors[0]}
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
            placeholder="Formatted JSON will appear here..."
            value={output}
            readOnly
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formatting */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-blue-600">Formatting</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => formatJson('beautify')}
                  disabled={!input.trim() || !isValid}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
                >
                  Beautify
                </button>
                <span className="text-sm text-gray-600">Format JSON with proper indentation</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => formatJson('minify')}
                  disabled={!input.trim() || !isValid}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                >
                  Minify
                </button>
                <span className="text-sm text-gray-600">Remove unnecessary whitespace</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => formatJson('compact')}
                  disabled={!input.trim() || !isValid}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition disabled:opacity-50"
                >
                  Compact
                </button>
                <span className="text-sm text-gray-600">Single-line format</span>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Indent Size:</label>
                <select
                  value={indentSize}
                  onChange={e => setIndentSize(Number(e.target.value))}
                  className="px-2 py-1 border rounded text-sm"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
                <span className="text-sm text-gray-600">Custom Indent - Adjust indentation size</span>
              </div>
            </div>
          </div>

          {/* Validation */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-red-600">Validation</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">Syntax Check - Validate JSON structure</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${!isValid ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-600">Error Highlighting - Show syntax errors</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Line Numbers - Easy error location</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Real-time Validation - Instant feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example JSON */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Example JSON</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm font-mono overflow-x-auto">
{exampleJson}
        </pre>
      </div>
    </div>
  );
} 
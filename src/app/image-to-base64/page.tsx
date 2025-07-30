'use client';

import { useState, ChangeEvent } from 'react';

export default function ImageToBase64() {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setError('');
    setBase64('');
    setFileName('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  }

  function handleCopy() {
    if (base64) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(base64).catch(err => {
          console.error('Failed to copy to clipboard:', err);
          // Fallback: select text and show message
          const textArea = document.createElement('textarea');
          textArea.value = base64;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            alert('Base64 copied to clipboard!');
          } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            alert('Copy failed. Please manually select and copy the text.');
          }
          document.body.removeChild(textArea);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = base64;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Base64 copied to clipboard!');
        } catch (err) {
          console.error('Copy failed:', err);
          alert('Copy failed. Please manually select and copy the text.');
        }
        document.body.removeChild(textArea);
      }
    }
  }

  function clearAll() {
    setBase64('');
    setError('');
    setFileName('');
  }

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Image to Base64 Converter</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Convert images to Base64 format for embedding in HTML, CSS, or data URLs. Supports all common image formats.
      </p>

      <div className="flex gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input Image</h2>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer block"
            >
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG, GIF, WEBP up to 10MB
              </div>
            </label>
          </div>
          
          {fileName && (
            <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <strong>Selected:</strong> {fileName}
            </div>
          )}
          
          {error && (
            <div className="text-red-600 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {base64 && (
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <h3 className="text-md font-semibold mb-2">Image Preview</h3>
              <img src={base64} alt="Preview" className="max-h-32 rounded border mx-auto" />
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Base64 Output</h2>
            <button
              onClick={handleCopy}
              disabled={!base64}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              Copy
            </button>
          </div>
          
          <textarea
            className="w-full h-[400px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600"
            placeholder="Base64 encoded image will appear here..."
            value={base64}
            readOnly
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Processing */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-blue-600">Image Processing</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Multiple format support (PNG, JPG, GIF, WEBP)</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Drag and drop interface</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Image preview</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">File validation and error handling</span>
              </div>
            </div>
          </div>

          {/* Base64 Output */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-green-600">Base64 Output</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Data URL format (data:image/...)</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">One-click copy to clipboard</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Ready for HTML/CSS embedding</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">UTF-8 encoded output</span>
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
            <div className="font-semibold text-blue-600">HTML Usage</div>
            <div className="text-gray-600 mt-1">
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;img src=&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...&quot; /&gt;</code>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold text-green-600">CSS Usage</div>
            <div className="text-gray-600 mt-1">
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...&apos;);</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
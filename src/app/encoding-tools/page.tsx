'use client';

import { useState } from 'react';

export default function EncodingTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [method, setMethod] = useState<'base64' | 'url' | 'unicode' | 'hex'>('base64');

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

  return (
    <div className="max-w-xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
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
  );
} 
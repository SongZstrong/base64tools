'use client';

import { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function EncryptionTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [method, setMethod] = useState<'md5' | 'sha1' | 'sha256' | 'sha512' | 'aes' | 'des'>('md5');
  const [key, setKey] = useState('');

  const examples = {
    md5: {
      input: 'Hello World',
      output: 'b10a8db164e0754105b7a99be72e3fe5'
    },
    sha1: {
      input: 'Hello World',
      output: '0a4d55a8d778e5022fab701977c5d840bbc486d0'
    },
    sha256: {
      input: 'Hello World',
      output: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
    },
    sha512: {
      input: 'Hello World',
      output: '2c74fd17edafd80e8447b0d46741ee243b7eb74dd2149a0ab1b9246fb30382f27e853d8585719e0e67cbda0daa8f51671064615d645ae27acb15bfb1447f459b'
    },
    aes: {
      input: 'Hello World',
      key: 'mysecretkey',
      output: 'U2FsdGVkX1+QJ8J8J8J8J8J8J8J8J8J8J8J8J8J8='
    },
    des: {
      input: 'Hello World',
      key: 'mysecretkey',
      output: 'U2FsdGVkX1+QJ8J8J8J8J8J8J8J8J8J8J8J8J8J8='
    }
  } as const;

  const tutorial = {
    md5: [
      { title: "MD5 Hash", content: "One-way hash function, 128-bit output" },
      { title: "Use Cases", content: "File integrity, password hashing (not recommended)" },
      { title: "Security", content: "Cryptographically broken, collision attacks possible" }
    ],
    sha1: [
      { title: "SHA1 Hash", content: "One-way hash function, 160-bit output" },
      { title: "Use Cases", content: "File integrity, digital signatures" },
      { title: "Security", content: "Deprecated, collision attacks demonstrated" }
    ],
    sha256: [
      { title: "SHA256 Hash", content: "One-way hash function, 256-bit output" },
      { title: "Use Cases", content: "Blockchain, digital signatures, file integrity" },
      { title: "Security", content: "Currently secure, widely used" }
    ],
    sha512: [
      { title: "SHA512 Hash", content: "One-way hash function, 512-bit output" },
      { title: "Use Cases", content: "High-security applications, password hashing" },
      { title: "Security", content: "Very secure, recommended for critical systems" }
    ],
    aes: [
      { title: "AES Encryption", content: "Symmetric encryption, 128/192/256-bit keys" },
      { title: "Use Cases", content: "Data encryption, secure communication" },
      { title: "Security", content: "Industry standard, very secure" }
    ],
    des: [
      { title: "DES Encryption", content: "Symmetric encryption, 56-bit key" },
      { title: "Use Cases", content: "Legacy systems, educational purposes" },
      { title: "Security", content: "Deprecated, easily broken" }
    ]
  };

  function handleConvert() {
    if (method === 'md5') {
      setOutput(CryptoJS.MD5(input).toString());
    } else if (method === 'sha1') {
      setOutput(CryptoJS.SHA1(input).toString());
    } else if (method === 'sha256') {
      setOutput(CryptoJS.SHA256(input).toString());
    } else if (method === 'sha512') {
      setOutput(CryptoJS.SHA512(input).toString());
    } else if (method === 'aes') {
      if (mode === 'encrypt') {
        setOutput(CryptoJS.AES.encrypt(input, key).toString());
      } else {
        try {
          setOutput(CryptoJS.AES.decrypt(input, key).toString(CryptoJS.enc.Utf8));
        } catch {
          setOutput('Decryption failed. Check your key and encrypted text.');
        }
      }
    } else if (method === 'des') {
      if (mode === 'encrypt') {
        setOutput(CryptoJS.DES.encrypt(input, key).toString());
      } else {
        try {
          setOutput(CryptoJS.DES.decrypt(input, key).toString(CryptoJS.enc.Utf8));
        } catch {
          setOutput('Decryption failed. Check your key and encrypted text.');
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

  function loadExample() {
    const example = examples[method];
    setInput(example.input);
    if ((method === 'aes' || method === 'des') && 'key' in example) {
      setKey(example.key);
    }
    setOutput(example.output);
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-8 space-y-6">
      {/* Main Converter - Keep original functionality */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2">Encryption Tools</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Encrypt and decrypt data using various algorithms including AES, DES, MD5, SHA, and more. 
          All processing happens in your browser for maximum security.
        </p>
        <div className="flex gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded font-medium border transition ${mode === 'encrypt' ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black hover:bg-black hover:text-white'}`}
            onClick={() => setMode('encrypt')}
          >
            Encrypt
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border transition ${mode === 'decrypt' ? 'bg-black text-white border-black' : 'bg-transparent text-black border-black hover:bg-black hover:text-white'}`}
            onClick={() => setMode('decrypt')}
          >
            Decrypt
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'md5' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('md5')}
          >
            MD5
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'sha1' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('sha1')}
          >
            SHA1
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'sha256' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('sha256')}
          >
            SHA256
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'sha512' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('sha512')}
          >
            SHA512
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'aes' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('aes')}
          >
            AES
          </button>
          <button
            className={`px-4 py-2 rounded font-medium border text-sm ${method === 'des' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
            onClick={() => setMethod('des')}
          >
            DES
          </button>
        </div>
        {(method === 'aes' || method === 'des') && (
          <input
            type="password"
            placeholder="Enter encryption key..."
            value={key}
            onChange={e => setKey(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-base bg-white/90 dark:bg-black/30"
          />
        )}
        <textarea
          className="w-full min-h-[100px] p-2 border rounded mb-2 text-base bg-white/90 dark:bg-black/30"
          placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter text to decrypt...'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="w-full py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition mb-2"
          onClick={handleConvert}
        >
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
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
            {(method === 'aes' || method === 'des') && 'key' in examples[method] && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Key:</span>
                <pre className="mt-1 text-gray-600 dark:text-gray-400">{examples[method].key}</pre>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Output:</span>
              <pre className="mt-1 text-gray-600 dark:text-gray-400 break-all">{examples[method].output}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      <div className="bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8">
        <h2 className="text-lg font-bold mb-4">
          {method.toUpperCase()} Algorithm Guide
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
            <span>Multiple encryption algorithms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Hash functions (MD5, SHA1, SHA256, SHA512)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Symmetric encryption (AES, DES)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Client-side processing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Secure key handling</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Real-time encryption/decryption</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
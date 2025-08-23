'use client';

import { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function EncryptionTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [method, setMethod] = useState<'md5' | 'sha1' | 'sha256' | 'sha512' | 'aes' | 'des'>('md5');
  const [key, setKey] = useState('');

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

  return (
    <div className="max-w-xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Encryption Tools</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Encrypt and decrypt data using various algorithms including AES, DES, MD5, SHA, and more. 
        All processing happens in your browser for maximum security.
      </p>
      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-2 rounded font-medium border ${mode === 'encrypt' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
          onClick={() => setMode('encrypt')}
        >
          Encrypt
        </button>
        <button
          className={`px-4 py-2 rounded font-medium border ${mode === 'decrypt' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
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
  );
} 
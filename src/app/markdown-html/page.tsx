'use client';

import { useState } from 'react';
import { marked } from 'marked';
import TurndownService from 'turndown';

export default function MarkdownHtml() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'md2html' | 'html2md'>('md2html');

  function handleConvert() {
    if (mode === 'md2html') {
      setOutput(marked.parse(input) as string);
    } else {
      const turndownService = new TurndownService();
      setOutput(turndownService.turndown(input));
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
      <h1 className="text-2xl font-bold mb-2">Markdown ⇄ HTML Converter</h1>
      <div className="flex gap-4 mb-2">
        <button
          className={`px-4 py-2 rounded font-medium border ${mode === 'md2html' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
          onClick={() => setMode('md2html')}
        >
          Markdown to HTML
        </button>
        <button
          className={`px-4 py-2 rounded font-medium border ${mode === 'html2md' ? 'bg-foreground text-background' : 'bg-transparent text-foreground border-foreground'}`}
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
        className="w-full py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition mb-2"
        onClick={handleConvert}
      >
        {mode === 'md2html' ? 'Convert to HTML' : 'Convert to Markdown'}
      </button>
      <textarea
        className="w-full min-h-[100px] p-2 border rounded text-base bg-white/90 dark:bg-black/30 mb-2"
        placeholder={mode === 'md2html' ? 'HTML output...' : 'Markdown output...'}
        value={output}
        readOnly
      />
      <button
        className="w-full py-2 bg-foreground text-background rounded font-semibold hover:opacity-90 transition"
        onClick={handleCopy}
      >
        Copy Output
      </button>
    </div>
  );
} 
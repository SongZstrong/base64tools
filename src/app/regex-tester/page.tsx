'use client';

import { useState, useEffect } from 'react';

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
  fullMatch: string;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setIsValid(true);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: MatchInfo[] = [];
      let match;

      // Reset regex lastIndex for global flag
      regex.lastIndex = 0;

      while ((match = regex.exec(testString)) !== null) {
        allMatches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match[0]
        });

        // Prevent infinite loop for zero-width matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }

      setMatches(allMatches);
      setIsValid(true);
      setError('');
    } catch (err) {
      setMatches([]);
      setIsValid(false);
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
    }
  }, [pattern, testString, flags]);

  function handleCopy() {
    const result = matches.map((match, index) => 
      `Match ${index + 1}: "${match.match}" at position ${match.index}`
    ).join('\n');
    
    if (result) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(result).catch(err => {
          console.error('Failed to copy to clipboard:', err);
          // Fallback: select text and show message
          const textArea = document.createElement('textarea');
          textArea.value = result;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            alert('Results copied to clipboard!');
          } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            alert('Copy failed. Please manually select and copy the text.');
          }
          document.body.removeChild(textArea);
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Results copied to clipboard!');
        } catch (err) {
          console.error('Copy failed:', err);
          alert('Copy failed. Please manually select and copy the text.');
        }
        document.body.removeChild(textArea);
      }
    }
  }

  function loadExample() {
    setPattern('\\b\\w+@\\w+\\.\\w+\\b');
    setTestString('Contact us at john@example.com or support@company.org for more information.');
    setFlags('g');
  }

  function clearAll() {
    setPattern('');
    setTestString('');
    setFlags('g');
    setMatches([]);
    setIsValid(true);
    setError('');
  }

  return (
    <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-black/40 rounded-lg shadow-lg p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Regex Tester</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Test and validate regular expressions with real-time matching. Extract groups, debug patterns, and see detailed match information.
      </p>

      <div className="flex gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Regex Pattern</h2>
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
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter regex pattern..."
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              className={`flex-1 p-2 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 ${
                !isValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            <input
              type="text"
              placeholder="flags"
              value={flags}
              onChange={e => setFlags(e.target.value)}
              className="w-20 p-2 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600"
            />
          </div>
          
          {!isValid && error && (
            <div className="text-red-600 text-sm">
              <strong>Regex Error:</strong> {error}
            </div>
          )}
          
          <div>
            <h3 className="text-md font-semibold mb-2">Test String</h3>
            <textarea
              className="w-full h-[320px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600"
              placeholder="Enter text to test against..."
              value={testString}
              onChange={e => setTestString(e.target.value)}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Match Results</h2>
            <button
              onClick={handleCopy}
              disabled={matches.length === 0}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              Copy Results
            </button>
          </div>
          
          <div className="h-[320px] p-3 border rounded text-sm font-mono bg-white/90 dark:bg-black/30 border-gray-300 dark:border-gray-600 overflow-y-auto">
            {matches.length === 0 ? (
              <div className="text-gray-500">No matches found</div>
            ) : (
              <div className="space-y-4">
                {matches.map((match, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                    <div className="font-semibold text-blue-600">
                      Match {index + 1}: &quot;{match.match}&quot;
                    </div>
                    <div className="text-sm text-gray-600">
                      Position: {match.index}
                    </div>
                    {match.groups.length > 0 && (
                      <div className="text-sm text-gray-600">
                        Groups: {match.groups.map((group, i) => `$${i + 1}="${group}"`).join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real-time Testing */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-blue-600">Real-time Testing</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Instant pattern validation</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Live match highlighting</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Error detection and display</span>
              </div>
            </div>
          </div>

          {/* Match Information */}
          <div>
            <h3 className="text-md font-semibold mb-3 text-green-600">Match Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Extract capture groups</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Show match positions</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Debug pattern issues</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Detailed match information</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regex Flags Info */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Regex Flags</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold">g - Global</div>
            <div className="text-gray-600">Find all matches</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold">i - Ignore case</div>
            <div className="text-gray-600">Case insensitive</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold">m - Multiline</div>
            <div className="text-gray-600">^ and $ match lines</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
            <div className="font-semibold">s - Dot all</div>
            <div className="text-gray-600">. matches newlines</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
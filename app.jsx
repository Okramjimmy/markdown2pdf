import React, { useState, useEffect, useRef } from 'react';

// Icon component
const Icon = ({ name, className = "" }) => {
  const icons = {
    fileText: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    upload: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    printer: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    )
  };
  return icons[name] || null;
};

const marked = window.marked;
const hljs = window.hljs;

export default function App() {
  const [markdownText, setMarkdownText] = useState(
`# Welcome to the Markdown to PDF Converter!

This is a simple React app that converts your Markdown into a beautifully formatted document, ready for printing to PDF.

## Features

- **Side-by-side editor and preview**: Write your Markdown on the left and see the result instantly on the right.
- **File Upload**: Don't want to copy-paste? Just upload a \`.md\` file.
- **Syntax Highlighting**: Code blocks are automatically highlighted.
- **Print to PDF**: A clean, print-friendly output is generated with a single click.

## How to Use

1. **Write or Upload**: Start typing in the editor, or use the "Upload" button.
2. **Preview**: The preview pane will update as you type.
3. **Print**: Click the "Print to PDF" button. Your browser's print dialog will open. Choose "Save as PDF" as the destination.

## Example Code Block

Here's an example of a JavaScript code block with syntax highlighting:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

Enjoy using the app!
`
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (marked && hljs) {
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        gfm: true,
        breaks: true,
      });
    }
  }, []);

  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll('#print-area pre').forEach(pre => {
        if (pre.querySelector('.copy-button')) {
          return;
        }

        const code = pre.querySelector('code');
        if (code) {
          const button = document.createElement('button');
          button.className = 'copy-button absolute top-2 right-2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200';
          button.textContent = 'Copy';
          button.onclick = () => {
            navigator.clipboard.writeText(code.textContent)
              .then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                  button.textContent = 'Copy';
                }, 2000);
              })
              .catch(err => {
                console.error('Failed to copy: ', err);
              });
          };

          const wrapper = document.createElement('div');
          wrapper.className = 'relative group';
          pre.parentNode.insertBefore(wrapper, pre);
          wrapper.appendChild(pre);
          wrapper.appendChild(button);
        }
      });
    };

    addCopyButtons();
  }, [markdownText]);

  const handleTextChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdownText(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .md file.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getMarkdownAsHtml = () => {
    if (marked) {
      return { __html: marked.parse(markdownText) };
    }
    return { __html: '<p>Loading libraries...</p>'};
  };

  return (
    <>
      <style>
        {`
          .markdown-body {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            margin: 0;
            color: #24292e;
            background-color: #FAF9F5;
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
            font-size: 16px;
            line-height: 1.5;
            word-wrap: break-word;
            text-align: justify;
          }

          .markdown-body h1 {
            padding-bottom: .3em;
            font-size: 2em;
            border-bottom: 1px solid #eaecef;
          }

          .markdown-body h1,
          .markdown-body h2,
          .markdown-body h3,
          .markdown-body h4,
          .markdown-body h5,
          .markdown-body h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
          }

          .markdown-body h2 {
            padding-bottom: .3em;
            font-size: 1.5em;
            border-bottom: 1px solid #eaecef;
          }

          .markdown-body h3 { font-size: 1.25em; }
          .markdown-body h4 { font-size: 1em; }
          .markdown-body h5 { font-size: .875em; }
          .markdown-body h6 { font-size: .85em; color: #6a737d; }

          .markdown-body p {
            margin-top: 0;
            margin-bottom: 16px;
          }

          .markdown-body a {
            color: #0366d6;
            text-decoration: none;
          }

          .markdown-body a:hover {
            text-decoration: underline;
          }

          .markdown-body blockquote {
            margin: 0 0 16px;
            padding: 0 1em;
            color: #6a737d;
            border-left: .25em solid #dfe2e5;
          }

          .markdown-body ul,
          .markdown-body ol {
            margin-top: 0;
            margin-bottom: 16px;
            padding-left: 2em;
          }

          .markdown-body li+li {
            margin-top: .25em;
          }

          .markdown-body table {
            display: table;
            width: 100%;
            margin-bottom: 16px;
            border-spacing: 0;
            border-collapse: collapse;
          }

          .markdown-body table th {
            font-weight: 600;
          }

          .markdown-body table th,
          .markdown-body table td {
            padding: 6px 13px;
            border: 1px solid #dfe2e5;
          }

          .markdown-body table tr {
            background-color: #fff;
            border-top: 1px solid #c6cbd1;
          }

          .markdown-body table tr:nth-child(2n) {
            background-color: #f6f8fa;
          }

          .markdown-body code {
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,.05);
            border-radius: 3px;
            font-family: 'Courier New', monospace;
          }

          .markdown-body pre {
            word-wrap: normal;
            margin-bottom: 16px;
          }

          .markdown-body pre>code {
            padding: 0;
            margin: 0;
            font-size: 100%;
            word-break: normal;
            white-space: pre;
            background: transparent;
            border: 0;
          }

          .markdown-body pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #B6807E !important;
            border-radius: 6px;
          }

          .markdown-body hr {
            height: .25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
          }

          .markdown-body b,
          .markdown-body strong {
            font-weight: 600;
          }

          @media print {
            body > * {
              visibility: hidden;
            }
            #print-area, #print-area * {
              visibility: visible;
            }
            #print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              overflow: visible;
            }
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              margin: 0;
            }
          }

          /* Claude-inspired syntax highlighting */
          .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            background: #B6807E;
            color: #FFF5E1;
          }
          .hljs-comment, .hljs-quote {
            color: #D4A5A5;
            font-style: italic;
          }
          .hljs-keyword, .hljs-selector-tag, .hljs-subst {
            color: #FFD4B8;
            font-weight: 500;
          }
          .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable {
            color: #F4DDA5;
          }
          .hljs-string, .hljs-doctag {
            color: #C8E7C8;
          }
          .hljs-title, .hljs-section, .hljs-selector-id {
            color: #B8D8F0;
            font-weight: 500;
          }
          .hljs-type, .hljs-class .hljs-title {
            color: #E8C4D4;
          }
          .hljs-tag, .hljs-name, .hljs-attribute {
            color: #FFD4B8;
            font-weight: normal;
          }
          .hljs-regexp, .hljs-link {
            color: #D5E8D4;
          }
          .hljs-symbol, .hljs-bullet {
            color: #F4DDA5;
          }
          .hljs-built_in, .hljs-builtin-name {
            color: #B8D8F0;
          }
          .hljs-meta {
            color: #D4A5A5;
          }
          .hljs-deletion {
            background: #fdd;
          }
          .hljs-addition {
            background: #dfd;
          }
          .hljs-emphasis {
            font-style: italic;
          }
          .hljs-strong {
            font-weight: bold;
          }
        `}
      </style>

      <div className="min-h-screen font-sans flex flex-col" style={{ backgroundColor: '#E8E6E0' }}>
        <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
          <div className="flex items-center gap-3">
            <Icon name="fileText" className="text-indigo-600 w-6 h-6" />
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Markdown to PDF
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="flex items-center gap-2 text-sm bg-slate-200/80 hover:bg-slate-300/90 text-slate-700 font-semibold py-2 px-3 rounded-lg border border-slate-300/90 transition-all duration-200"
            >
              <Icon name="upload" className="w-4 h-4" />
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".md,.markdown"
            />
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            >
              <Icon name="printer" className="w-4 h-4"/>
              Print to PDF
            </button>
          </div>
        </header>

        <main className="flex-grow pt-20 flex flex-wrap justify-center gap-4 p-4">
          <div className="flex flex-col bg-white rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#FAF9F5' }}>
            <div className="p-3 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Markdown Editor</h2>
            </div>
            <textarea
              value={markdownText}
              onChange={handleTextChange}
              className="flex-grow w-full p-4 text-slate-800 outline-none resize-none font-mono text-sm leading-6"
              style={{ backgroundColor: '#FAF9F5' }}
              placeholder="Start typing your Markdown here..."
            />
          </div>

          <div className="flex flex-col bg-white rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#FAF9F5' }}>
            <div className="p-3 border-b border-slate-200">
              <h2 className="font-semibold text-slate-700">HTML Preview</h2>
            </div>
            <div
              id="print-area"
              className="prose prose-slate max-w-none p-6 overflow-auto flex-grow markdown-body"
              dangerouslySetInnerHTML={getMarkdownAsHtml()}
            />
          </div>
        </main>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';

// === Helper Libraries (simulated for self-contained example) ===
// In a real project, you would `npm install marked highlight.js`
// Here, we'll load them from a CDN in the main HTML.

// This is a placeholder for the `marked` library logic.
const marked = window.marked;
// This is a placeholder for the `highlight.js` library logic.
const hljs = window.hljs;

// === Main App Component ===
export default function App() {
  const [markdownText, setMarkdownText] = useState(
    `# Welcome to the Markdown to PDF Converter!

This is a simple React app that converts your Markdown into a beautifully formatted document, ready for printing to PDF.

## Features

- **Side-by-side editor and preview:** Write your Markdown on the left and see the result instantly on the right.
- **File Upload:** Don't want to copy-paste? Just upload a \`.md\` file.
- **Syntax Highlighting:** Code blocks are automatically highlighted.
- **Print to PDF:** A clean, print-friendly output is generated with a single click.

## How to Use

1.  **Write or Upload:** Start typing in the editor, or use the "Upload .md File" button.
2.  **Preview:** The preview pane will update as you type.
3.  **Print:** Click the "Print to PDF" button. Your browser's print dialog will open. Choose "Save as PDF" as the destination.

---

### Example Code Block

Here's an example of a JavaScript code block with syntax highlighting:

\`\`\`javascript
import React, { useState } => {
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

  // Configure marked to use highlight.js for syntax highlighting
  useEffect(() => {
    if (marked && hljs) {
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // for compatibility with highlight.js css
        gfm: true,
        breaks: true,
      });
    }
  }, []);

  const handleTextChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdownText(event.target.result);
      };
      reader.readAsText(file);
    } else {
        // Simple user feedback for wrong file type
        alert("Please upload a valid .md file.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate HTML from Markdown
  const getMarkdownAsHtml = () => {
    if (marked) {
        return { __html: marked.parse(markdownText) };
    }
    return { __html: '<p>Loading libraries...</p>'};
  };

  return (
    <>
      {/* This style block is for print media queries */}
      <style>
        {`
          @media print {
            /* Hide everything except the preview area */
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
            /* Remove margins and padding from the print layout */
            @page {
              margin: 20mm;
            }
            body {
               margin: 0;
            }
          }
          #print-area p, #print-area li {
            line-height: 1.6em; /* Adjust line spacing for readability */
          }
          #print-area h1, #print-area h2, #print-area h3, #print-area p, #print-area ul, #print-area ol {
            margin-bottom: 1em; /* Ensure spacing after block elements */
          }
          #print-area ul {
            list-style: disc; /* Ensure disc bullets for unordered lists */
            padding-left: 1.5em; /* Add padding for bullet visibility */
          }
          #print-area ol {
            list-style: decimal; /* Ensure numbers for ordered lists */
            padding-left: 1.8em; /* Add padding for number visibility */
          }
           /* Basic styling for highlight.js theme */
          /* Using a common theme like 'atom-one-dark' */
          .hljs{display:block;overflow-x:auto;padding:0.5em;background:#282c34;color:#abb2bf}
          .hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}
          .hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}
          .hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}
          .hljs-literal{color:#56b6c2}
          .hljs-addition,.hljs-attribute,.hljs-regexp,.hljs-string{color:#98c379}
          .hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}
          .hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}
          .hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}
          .hljs-emphasis{font-style:italic}
          .hljs-strong{font-weight:700}
          .hljs-link{text-decoration:underline}
        `}
      </style>

      <div className="bg-slate-100 min-h-screen font-sans flex flex-col">
        {/* Fixed Header */}
        <header id="header" className="bg-white border-b border-slate-200 shadow-sm p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">
            Markdown to PDF Converter
          </h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
          >
            Print to PDF
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow pt-20 flex flex-col md:flex-row gap-4 p-4">
          
          {/* Left: Editor Panel */}
          <div id="editor-panel" className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 shadow-md">
            <div className="p-3 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Markdown Editor</h2>
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1 px-3 rounded-md border border-slate-300 transition-colors"
              >
                Upload .md File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".md"
              />
            </div>
            <textarea
              value={markdownText}
              onChange={handleTextChange}
              className="flex-grow w-full p-4 bg-transparent text-slate-800 outline-none resize-none font-mono text-sm leading-6"
              placeholder="Start typing your Markdown here..."
            />
          </div>

          {/* Right: Preview Panel */}
          <div id="preview-panel" className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 shadow-md">
             <div className="p-3 border-b border-slate-200">
                <h2 className="font-semibold text-slate-700">HTML Preview</h2>
             </div>
            <div
              id="print-area"
              className="prose prose-slate max-w-none p-6 overflow-auto flex-grow"
              dangerouslySetInnerHTML={getMarkdownAsHtml()}
            />
          </div>
        </main>
      </div>
    </>
  );
}

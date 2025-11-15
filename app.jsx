import React, 'useState, useEffect, useRef } from 'react';
import { Icon } from './Icon'; // Assuming Icon component is in a separate file


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

1. **Write or Upload:** Start typing in the editor, or use the "Upload .md File" button.
2. **Preview:** The preview pane will update as you type.
3. **Print:** Click the "Print to PDF" button. Your browser's print dialog will open. Choose "Save as PDF" as the destination.

---

### Example Code Block

Here's an example of a TypeScript code block with syntax highlighting:

\`\`\`typescript
await autosaveDocument(
  'document.html',
  '<p>Content</p>',
  'en',
  (isSaving) => console.log('Saving:', isSaving)
);
\`\`\`

### Example Table with Code

| Prop Name | Type     | Description                  |
|-----------|----------|------------------------------|
| \`value\`   | \`string\` | The initial markdown text.   |
| \`onChange\`| \`func\`   | Callback for text changes.   |


Enjoy using the app!
`
  );

  const fileInputRef = useRef(null);

  // Configure marked (without highlight.js integration here)
  useEffect(() => {
    if (marked) {
      marked.setOptions({
        langPrefix: 'hljs language-',
        gfm: true,
        breaks: true,
      });
    }
  }, []);

  // Effect to apply highlighting and add copy buttons after render
  useEffect(() => {
    // 1. Apply syntax highlighting
    if (hljs) {
        document.querySelectorAll('#print-area pre code').forEach((element) => {
            hljs.highlightElement(element);
        });
    }

    // 2. Add copy buttons to code blocks
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
  }, [markdownText]); // Re-run this effect when markdownText changes

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
      <style>
        {`
          /* Document-Style Formatting */
          .markdown-body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.7;
            color: #333;
            background-color: #FAF9F5;
          }

          .markdown-body h1,
          .markdown-body h2,
          .markdown-body h3,
          .markdown-body h4,
          .markdown-body h5,
          .markdown-body h6 {
            font-weight: 700;
            color: #111;
            margin-top: 1.5em;
            margin-bottom: 0.75em;
            line-height: 1.2;
          }

          .markdown-body h1 {
            font-size: 2.25em;
            border-bottom: none; /* Removed GitHub-style border */
          }

          .markdown-body h2 {
            font-size: 1.75em;
            border-bottom: none; /* Removed GitHub-style border */
          }

          .markdown-body h3 {
            font-size: 1.35em;
          }
          
          .markdown-body p {
            margin-bottom: 1.25em;
          }

          .markdown-body a {
            color: #007bff;
            text-decoration: none;
          }
          .markdown-body a:hover {
            text-decoration: underline;
          }
          
          .markdown-body blockquote {
            margin: 0 0 1.5em;
            padding: 0.5em 1.25em;
            color: #555;
            background-color: #f8f9fa;
            border-left: 4px solid #ccc;
          }

          .markdown-body ul,
          .markdown-body ol {
            margin-bottom: 1.5em;
            padding-left: 1.5em;
          }

          .markdown-body hr {
            border: 0;
            height: 1px;
            background: #e0e0e0;
            margin: 3em 0;
          }

          .markdown-body table {
            width: 100%;
            margin-bottom: 1.5em;
            border-collapse: collapse;
          }

          .markdown-body table th,
          .markdown-body table td {
            padding: 12px 15px;
            border: 1px solid #ddd;
            text-align: left;
          }

          .markdown-body table th {
            background-color: #f2f2f2;
            font-weight: 600;
          }

          .markdown-body table tr {
             background-color: #FAF9F5;
          }
          
          .markdown-body table tr:nth-child(2n) {
            background-color: #f9f9f9;
          }
          
          .markdown-body table code {
            background-color: #B6807E;
            color: #FFFFFF;
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            border-radius: 4px;
          }

          .markdown-body pre {
            margin-bottom: 1.5em;
            word-wrap: normal;
          }

          .markdown-body pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.7;
            background-color: #FCFCFC;
            border-radius: 6px;
            border: 1px solid #EAEAEA;
          }
          
          .markdown-body code {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          }

          /* Print media queries */
          @media print {
            body > * { visibility: hidden; }
            #print-area, #print-area * { visibility: visible; }
            #print-area { position: absolute; left: 0; top: 0; width: 100%; }
            @page { size: A4; margin: 20mm; }
            body { margin: 0; }
          }
          
          /* Syntax Highlighting theme from image */
          .hljs {
            color: #383a42;
            background: #FCFCFC;
          }
          .hljs-comment, .hljs-quote {
            color: #a0a1a7;
            font-style: italic;
          }
          .hljs-keyword, .hljs-selector-tag, .hljs-subst {
            color: #a626a4;
          }
          .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr {
            color: #986801;
          }
          .hljs-string, .hljs-doctag {
            color: #50a14f;
          }
          .hljs-title, .hljs-section, .hljs-selector-id {
            color: #4078f2;
          }
          .hljs-function, .hljs-class .hljs-title {
             color: #4078f2;
          }
          .hljs-tag, .hljs-name, .hljs-attribute {
            color: #e45649;
          }
          .hljs-regexp, .hljs-link {
            color: #c96442;
          }
          .hljs-symbol, .hljs-bullet {
            color: #0184bb;
          }
          .hljs-built_in, .hljs-builtin-name {
            color: #c18401;
          }
          .hljs-emphasis {
            font-style: italic;
          }
          .hljs-strong {
            font-weight: bold;
          }
        `}
      </style>

      <div className="bg-slate-100 min-h-screen font-sans flex flex-col">
        {/* Fixed Header */}
        <header id="header" className="bg-white/80 backdrop-blur-lg border-b border-slate-200 p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
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


        {/* Main Content Area */}
        <main className="flex-grow pt-20 flex flex-wrap justify-center gap-4 p-4">


          {/* Left: Editor Panel */}
          <div id="editor-panel" className="flex flex-col rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#FAF9F5' }}>
            <div className="p-3 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-700">Markdown Editor</h2>
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
          <div id="preview-panel" className="flex flex-col rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#FAF9F5' }}>
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

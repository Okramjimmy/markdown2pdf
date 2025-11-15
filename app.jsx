

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon'; // Assuming Icon component is in a separate file

// === Helper Libraries (simulated for self-contained example) ===
// In a real project, you would npm install marked highlight.js
// Here, we'll load them from a CDN in the main HTML.

// This is a placeholder for the marked library logic.
const marked = window.marked;
// This is a placeholder for the highlight.js library logic.
const hljs = window.hljs;

// === Main App Component ===
export default function App() {
const [markdownText, setMarkdownText] = useState(
`# Welcome to the Markdown to PDF Converter!

This is a simple React app that converts your Markdown into a beautifully formatted document, ready for printing to PDF.

Features

Side-by-side editor and preview: Write your Markdown on the left and see the result instantly on the right.

File Upload: Don't want to copy-paste? Just upload a `.md` file.

Syntax Highlighting: Code blocks are automatically highlighted.

Print to PDF: A clean, print-friendly output is generated with a single click.

How to Use

Write or Upload: Start typing in the editor, or use the "Upload .md File" button.

Preview: The preview pane will update as you type.

Print: Click the "Print to PDF" button. Your browser's print dialog will open. Choose "Save as PDF" as the destination.

Example Code Block

Here's an example of a JavaScript code block with syntax highlighting:

```javascript
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
```

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

// Effect to add copy buttons to code blocks
useEffect(() => {
const addCopyButtons = () => {
document.querySelectorAll('#print-area pre').forEach(pre => {
// Check if a copy button already exists to prevent duplicates on re-renders
if (pre.querySelector('.copy-button')) {
return;
}

code
Code
download
content_copy
expand_less
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

      // Wrap pre in a div for relative positioning of the button
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group'; // 'group' class for Tailwind hover utility
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
    }
  });
};

// Run after initial render and whenever markdownText changes
addCopyButtons();

}, [markdownText]); // Re-run when markdownText changes

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
{/* This style block is for print media queries /}
<style>
{`
/ GitHub Markdown CSS - Simplified for embedding */
.markdown-body {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
margin: 0;
color: #24292e;
background-color: #fff;
font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
font-size: 16px;
line-height: 1.5;
word-wrap: break-word;
text-align: justify;
}

code
Code
download
content_copy
expand_less
.markdown-body .octicon {
        display: inline-block;
        fill: currentColor;
        vertical-align: text-bottom;
      }

      .markdown-body h1:hover .anchor .octicon-link:before,
      .markdown-body h2:hover .anchor .octicon-link:before,
      .markdown-body h3:hover .anchor .octicon-link:before,
      .markdown-body h4:hover .anchor .octicon-link:before,
      .markdown-body h5:hover .anchor .octicon-link:before,
      .markdown-body h6:hover .anchor .octicon-link:before {
        width: 16px;
        height: 16px;
        content: ' ';
        display: inline-block;
        background-color: currentColor;
        -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.605a.75.75 0 001.06-1.06L3.25 10.25a2 2 0 112.83-2.83l2.5 2.5a2 2 0 010 2.83.75.75 0 001.06 1.06 3.5 3.5 0 000-4.95l-2.5-2.5a3.5 3.5 0 00-4.95 0l-1.25 1.25a.75.75 0 001.06 1.06z'></path></svg>");
        mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.605a.75.75 0 001.06-1.06L3.25 10.25a2 2 0 112.83-2.83l2.5 2.5a2 2 0 010 2.83.75.75 0 001.06 1.06 3.5 3.5 0 000-4.95l-2.5-2.5a3.5 3.5 0 00-4.95 0l-1.25 1.25a.75.75 0 001.06 1.06z'></path></svg>");
      }

      .markdown-body details,
      .markdown-body figcaption,
      .markdown-body figure {
        display: block;
      }

      .markdown-body summary {
        display: list-item;
      }

      .markdown-body a {
        background-color: transparent;
        text-decoration: none;
      }

      .markdown-body a:active,
      .markdown-body a:hover {
        outline-width: 0;
      }

      .markdown-body abbr[title] {
        border-bottom: none;
        text-decoration: underline dotted;
      }

      .markdown-body b,
      .markdown-body strong {
        font-weight: 600;
      }

      .markdown-body dfn {
        font-style: italic;
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

      .markdown-body h3 {
        font-size: 1.25em;
      }

      .markdown-body h4 {
        font-size: 1em;
      }

      .markdown-body h5 {
        font-size: .875em;
      }

      .markdown-body h6 {
        font-size: .85em;
        color: #6a737d;
      }

      .markdown-body p {
        margin-top: 0;
        margin-bottom: 16px;
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

      .markdown-body ul ul,
      .markdown-body ul ol,
      .markdown-body ol ol,
      .markdown-body ol ul {
        margin-top: 0;
        margin-bottom: 0;
      }

      .markdown-body li {
        word-wrap: break-all;
      }

      .markdown-body li>p {
        margin-top: 16px;
      }

      .markdown-body li+li {
        margin-top: .25em;
      }

      .markdown-body dl {
        padding: 0;
        margin-top: 0;
        margin-bottom: 16px;
      }

      .markdown-body dl dt {
        padding: 0;
        margin-top: 16px;
        font-size: 1em;
        font-style: italic;
        font-weight: 600;
      }

      .markdown-body dl dd {
        padding: 0 16px;
        margin-bottom: 16px;
      }

      .markdown-body table {
        display: table;
        width: 100%;
        margin-bottom: 16px;
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
      }

      .markdown-body table th {
        font-weight: 600;
      }

      .markdown-body table th,
      .markdown-body table td {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
        word-wrap: break-word;
      }

      .markdown-body table tr {
        background-color: #fff;
        border-top: 1px solid #c6cbd1;
      }

      .markdown-body table tr:nth-child(2n) {
        background-color: #f6f8fa;
      }

      .markdown-body img {
        max-width: 100%;
        box-sizing: content-box;
        background-color: #fff;
      }

      .markdown-body img[align=right] {
        padding-left: 20px;
      }

      .markdown-body img[align=left] {
        padding-right: 20px;
      }

      .markdown-body code {
        padding: .2em .4em;
        margin: 0;
        font-size: 85%;
        background-color: rgba(27,31,35,.05);
        border-radius: 3px;
      }

      .markdown-body pre {
        word-wrap: normal;
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

      .markdown-body .highlight {
        margin-bottom: 16px;
      }

      .markdown-body .highlight pre {
        margin-bottom: 0;
        word-break: normal;
      }

      .markdown-body .highlight pre,
      .markdown-body pre {
        padding: 16px;
        overflow: auto;
        font-size: 85%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border-radius: 3px;
      }

      .markdown-body pre code {
        display: inline;
        max-width: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        line-height: inherit;
        word-wrap: normal;
        background-color: transparent;
        border: 0;
      }

      .markdown-body .commit-tease-contributors {
        border-bottom: 1px solid #eaecef;
        border-top: 1px solid #eaecef;
      }

      .markdown-body .blob-wrapper {
        border-bottom: 1px solid #eaecef;
      }

      .markdown-body .bro-tip {
        box-shadow: 0 1px 2px rgba(0,0,0,.12), 0 3px 10px rgba(0,0,0,.08);
      }

      .markdown-body .task-list-item {
        list-style-type: none;
      }

      .markdown-body .task-list-item+.task-list-item {
        margin-top: 3px;
      }

      .markdown-body .task-list-item input {
        margin: 0 .2em .25em -1.6em;
        vertical-align: middle;
      }

      .markdown-body hr {
        height: .25em;
        padding: 0;
        margin: 24px 0;
        background-color: #e1e4e8;
        border: 0;
      }

      /* Print media queries */
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
          size: A4;
          margin: 20mm;
        }
        body {
          margin: 0;
        }
      }

      /* Basic styling for highlight.js theme (atom-one-dark) */
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
      <div id="editor-panel" className="flex flex-col bg-white rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm' }}>
        <div className="p-3 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-700">Markdown Editor</h2>
          {/* <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1 px-3 rounded-md border border-slate-300 transition-colors"
          >
            Upload .md File
          </button> */}
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
      <div id="preview-panel" className="flex flex-col bg-white rounded-lg border border-slate-200 shadow-md" style={{ width: '210mm', minHeight: '297mm' }}>
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

# Markdown to PDF Converter

## Description
This is a simple React application that allows users to convert Markdown text into a beautifully formatted PDF document. It features a side-by-side editor and preview, file upload functionality for `.md` files, syntax highlighting for code blocks, and a one-click print-to-PDF option.

## Features
- **Side-by-side editor and preview:** Write your Markdown on the left and see the result instantly on the right.
- **File Upload:** Don't want to copy-paste? Just upload a `.md` file.
- **Syntax Highlighting:** Code blocks are automatically highlighted.
- **Print to PDF:** A clean, print-friendly output is generated with a single click.

## Setup Instructions

To set up and run this project locally, follow these steps:

### Prerequisites
Ensure you have Node.js and npm (Node Package Manager) or Yarn installed on your system.

- **Node.js & npm:** Download and install from [nodejs.org](https://nodejs.org/).
- **Yarn (Optional):** If you prefer Yarn, install it globally:
  ```bash
  npm install -g yarn
  ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd markdown2pdf
    ```
    (Note: Replace `[repository-url]` with the actual URL of your repository if this project is hosted on Git.)

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

## How to Run the Application

After installing the dependencies, you can start the development server:

Using npm:
```bash
npm start
```
Or using Yarn:
```bash
yarn start
```

This will typically open the application in your default web browser at `http://localhost:8080` (or another port if 8080 is in use).

## How to Use

1.  **Write or Upload:** Start typing your Markdown directly into the editor on the left, or use the "Upload" button to select a `.md` or `.markdown` file from your computer.
2.  **Preview:** The right-hand panel will instantly display a live HTML preview of your Markdown content, including syntax-highlighted code blocks.
3.  **Print:** Click the "Print to PDF" button in the header. Your browser's native print dialog will appear. Select "Save as PDF" (or similar, depending on your browser and OS) as the destination to save your Markdown content as a PDF document.

## Technologies Used
-   React
-   Webpack
-   Tailwind CSS
-   Marked.js (for Markdown parsing)
-   Highlight.js (for syntax highlighting)

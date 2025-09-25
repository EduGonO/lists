import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="bg-slate-950">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/codemirror@5.65.18/lib/codemirror.min.css"
          integrity="sha256-xuq2ut9WVuVFpw5mD6lSQ4dG6FfhI61FQQcO/lKBhMY="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/codemirror@5.65.18/theme/material-darker.min.css"
          integrity="sha256-tA6k1iCb/lssxvyloO9lHw5plHPumEMCrU8epYn9BUg="
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5faff',
          100: '#e0f2ff',
          200: '#bae6ff',
          300: '#7cd1ff',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e'
        }
      }
    }
  }
};`
          }}
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
      </Head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="description" content="Goodwill Diagnostics Ltd - Quality diagnostic equipment for hospitals, clinics, and home care in Uganda." />
        {/* ✅ ADD THIS - Prevents iOS from auto-linking phone numbers */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="icon" href="/images/logo/good.png" />
        <link rel="apple-touch-icon" href="/images/logo/good.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

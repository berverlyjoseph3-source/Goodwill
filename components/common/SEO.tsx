import Head from 'next/head';
import { useRouter } from 'next/router';
import { COMPANY_INFO } from '@/constants/images';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = `${COMPANY_INFO.name} - Quality Diagnostic Equipment You Can Trust`,
  description = 'FDA-approved diagnostic and medical equipment for hospitals, clinics, and home care in Uganda. Fast shipping, certified products, and professional support since 2020.',
  canonical,
  ogImage = 'https://goodwillmedical.com/images/og-image.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author = COMPANY_INFO.name,
  noindex = false,
}: SEOProps) => {
  const router = useRouter();
  const currentUrl = canonical || `https://goodwillmedical.com${router.asPath}`;
  const siteName = COMPANY_INFO.name;

  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: COMPANY_INFO.name,
    url: 'https://goodwillmedical.com',
    logo: 'https://goodwillmedical.com/images/logo/good.png',
    sameAs: [
      'https://facebook.com/share/183FFnCEHK/',
      'https://wa.me/message/GUIYLLIVSZX2A1',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY_INFO.phone1,
      contactType: 'customer service',
      areaServed: 'UG',
      availableLanguage: ['English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sure House, Plot No. 1 Bombo Road',
      addressLocality: 'Kampala',
      addressRegion: 'Central',
      postalCode: '',
      addressCountry: 'UG',
    },
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#0070f3" />
      <meta name="color-scheme" content="light" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article Specific */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Product Specific */}
      {ogType === 'product' && (
        <meta property="product:availability" content="instock" />
      )}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      {/* Favicon - Updated to use new logo */}
      <link rel="icon" href="/images/logo/good.png" />
      <link rel="apple-touch-icon" href="/images/logo/good.png" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
};

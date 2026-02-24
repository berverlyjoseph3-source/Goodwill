import { useState, useEffect } from 'react'; // ✅ ADD THIS
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProgressBar } from '../components/ui/ProgressBar';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  const [mounted, setMounted] = useState(false); // ✅ ADD THIS

  // ✅ ADD THIS - Ensure we only render after mount on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // ✅ ADD THIS - Return minimal skeleton during SSR
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          </Head>
          <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 md:h-20" />
            <main className="flex-grow" />
            <footer className="bg-white border-t border-gray-200 py-12" />
          </div>
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </Head>
        <div className="flex flex-col min-h-screen">
          <ProgressBar />
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1e293b',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}

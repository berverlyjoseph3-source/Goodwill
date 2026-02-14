import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { AppProps } from 'next/app'; // ✅ ADD THIS IMPORT
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ProgressBar } from '../components/ui/ProgressBar';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) { // ✅ ADD : AppProps TYPE ANNOTATION
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
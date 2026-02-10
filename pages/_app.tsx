import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { QuizProvider } from '@/contexts/QuizContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Prep Pal - Quiz. Learn. Master.</title>
        <meta name="description" content="Test your knowledge with AI-generated quizzes" />
      </Head>
      <QuizProvider>
        <div className={`${inter.className} flex flex-col min-h-screen`}>
          <Header />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </QuizProvider>
    </>
  );
}

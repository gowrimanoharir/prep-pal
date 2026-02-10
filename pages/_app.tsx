import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { QuizProvider } from '@/contexts/QuizContext';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <QuizProvider>
        <Component {...pageProps} />
      </QuizProvider>
    </div>
  );
}

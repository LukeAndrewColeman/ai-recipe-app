import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'SmartRecipe AI',
  description: 'Discover recipes from your favorite cuisines with AI!',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='moodRecipeTheme'>
      <head>
        {process.env.ENVIRONMENT !== 'development' && (
          <Script
            defer
            src='https://umami.lukeacoleman.com/script.js'
            data-website-id='b68da7d8-50fa-4554-b173-9f758412c732'
          />
        )}
      </head>
      <AuthProvider>
        <body
          className={`min-h-screen flex flex-col text-neutral ${poppins.className}`}
        >
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}

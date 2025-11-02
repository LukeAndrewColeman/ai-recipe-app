import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Poppins, Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Smart Recipe AI | Generate tasty and healthy recipes with AI',
  description:
    'Generate tasty and healthy recipes with AI. Choose your favorite cuisine and let AI generate recipes for you!',
  keywords:
    'recipe generator, recipe generator ai, recipe generator app, recipe generator online, recipe generator tool, recipe generator website, recipe generator software, recipe generator app, recipe generator tool, recipe generator website, recipe generator software',
};

export const openGraph = {
  images: [
    {
      url: 'https://unsplash.com/photos/a-table-topped-with-lots-of-plates-of-food-hatqfX3b9Vo',
      width: 1200,
      height: 630,
      alt: 'Smart Recipe AI - Generate tasty and healthy recipes with AI',
    },
  ],
  type: 'website',
  locale: 'en_US',
  url: 'https://smartRecipe AI.com',
  siteName: 'Smart Recipe AI',
};

export const twitter = {
  card: 'summary_large_image',
  title: 'Smart Recipe AI | Generate tasty and healthy recipes with AI',
  description:
    'Generate tasty and healthy recipes with AI. Choose your favorite cuisine and let AI generate recipes for you!',
  images: [
    'https://unsplash.com/photos/a-table-topped-with-lots-of-plates-of-food-hatqfX3b9Vo',
  ],
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en' data-theme='moodRecipeTheme' suppressHydrationWarning>
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
            className={`min-h-screen flex flex-col text-neutral ${inter.className}`}
            suppressHydrationWarning
          >
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </body>
        </AuthProvider>
      </html>
    </ClerkProvider>
  );
}

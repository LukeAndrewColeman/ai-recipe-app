import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'CuisineQuest AI',
  description: 'Discover recipes from your favorite cuisines with AI!',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='moodRecipeTheme'>
      <body
        className={`min-h-screen flex flex-col text-neutral ${poppins.className}`}
      >
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

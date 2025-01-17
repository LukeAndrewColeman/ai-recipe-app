import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Poppins } from 'next/font/google';
import AuthProvider from '@/app/providers/AuthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'CuisineQuest AI',
  description: 'Discover recipes from your favorite cuisines with AI!',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='moodRecipeTheme'>
      <body
        className={`min-h-screen flex flex-col text-neutral ${poppins.className}`}
      >
        <AuthProvider>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

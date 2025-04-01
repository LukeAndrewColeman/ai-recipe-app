'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { motion } from 'motion/react';

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        router.push('/auth/login');
      } else {
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.div
      className='navbar bg-base-100 shadow-lg sticky top-0 z-50 py-4'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container mx-auto'>
        <div className='sm:navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost lg:hidden'
              onClick={toggleMenu}
            >
              <svg
                xmlns='http://www.w3.org/dialog/2000'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                isMenuOpen ? 'block' : 'hidden'
              }`}
            >
              <li>
                <Link href='/' onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/selector' onClick={closeMenu}>
                  Recipe Generator
                </Link>
              </li>
              <li>
                <Link href='/recipebook' onClick={closeMenu}>
                  Recipe Book
                </Link>
              </li>
              <li>
                <div className='flex sm:hidden mt-2 border-t border-secondary/40 pt-2'>
                  {user ? (
                    <button
                      onClick={() => {
                        closeMenu();
                        handleLogout();
                      }}
                      className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      href='/auth/signup'
                      onClick={closeMenu}
                      className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
                    >
                      Register/Login
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <Link href='/' className='btn btn-ghost text-xl'>
            SmartRecipe AI
          </Link>
        </div>
        <div className='sm:navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/selector'>Recipe Generator</Link>
            </li>
            <li>
              <Link href='/recipebook'>Recipe Book</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end hidden sm:flex'>
          {user ? (
            <motion.div
              className='origin-center inline-block'
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <button
                onClick={handleLogout}
                className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
              >
                Log Out
              </button>
            </motion.div>
          ) : (
            <motion.div
              className='origin-center inline-block'
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href='/auth/signup'
                className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
              >
                Register/Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { CircleDollarSign } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.div
      className='navbar bg-[#FAFAF5] shadow-lg sticky top-0 z-50 py-4'
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
                <Link href='/recipe-generator' onClick={closeMenu}>
                  Recipe Generator
                </Link>
              </li>
              <li>
                <Link href='/recipe-book' onClick={closeMenu}>
                  Recipe Book
                </Link>
              </li>
              <li>
                <Link href='/blog' onClick={closeMenu}>
                  Blog
                </Link>
              </li>
              <li>
                <div className='flex sm:hidden mt-2 border-t border-secondary/40 pt-2'>
                  {user ? (
                    <div className='flex items-start gap-4 flex-col justify-start'>
                      <UserButton>
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label='Credits'
                            labelIcon={<CircleDollarSign className='w-4 h-4' />}
                            href='/dashboard'
                          />
                          <UserButton.Action label='manageAccount' />
                          <UserButton.Action label='signOut' />
                        </UserButton.MenuItems>
                      </UserButton>
                    </div>
                  ) : (
                    <Link
                      href='/sign-up'
                      onClick={closeMenu}
                      className='flex items-center justify-start gap-2 px-8 transition-all text-center'
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
              <Link href='/recipe-generator'>Recipe Generator</Link>
            </li>
            <li>
              <Link href='/recipe-book'>Recipe Book</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end hidden sm:flex'>
          {user ? (
            <>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label='Credits'
                    labelIcon={<CircleDollarSign className='w-4 h-4' />}
                    href='/dashboard'
                  />
                  <UserButton.Action label='manageAccount' />
                  <UserButton.Action label='signOut' />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <motion.div
              className='origin-center inline-block'
              whileHover={{ scale: 1.05, rotate: 2, origin: 'center' }}
            >
              <Link
                href='/sign-up'
                className='flex items-center justify-start transition-all text-center'
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

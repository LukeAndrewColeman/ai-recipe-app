'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/app/actions/logout';

export default function Navbar({ session }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  console.log(session);

  return (
    <div className='navbar bg-base-100 shadow-lg sticky top-0 z-50 py-4'>
      <div className='container mx-auto'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
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
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/recipebook'>Recipebook</a>
              </li>
              <li>
                <a href='/selector'>Recipe Generator</a>
              </li>
            </ul>
          </div>
          <a href='/' className='btn btn-ghost text-xl'>
            CuisineQuest AI
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/recipebook'>Recipebook</a>
            </li>
            <li>
              <a href='/selector'>Recipe Generator</a>
            </li>
          </ul>
        </div>
        <div className='navbar-end flex'>
          {session === null ? (
            <button
              onClick={handleLogout}
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
            >
              Log Out
            </button>
          ) : (
            <Link
              href='/auth/signup'
              className='btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40 normal-case flex items-center justify-start gap-2 px-8 transition-all text-center'
            >
              Register/Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

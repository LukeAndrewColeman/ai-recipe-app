'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      const email = formData.get('email');
      const password = formData.get('password');

      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || 'Failed to log in');
      } else {
        router.push('/selector');
      }
    } catch (error) {
      setError('Something went wrong');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex h-[calc(100vh-14rem)] items-center justify-center'>
      <form
        action={handleSubmit}
        className='space-y-4 w-full max-w-sm bg-base-100 p-8 rounded-lg shadow-lg relative z-10'
      >
        <h1 className='text-2xl font-bold mb-4'>Login</h1>

        {error && (
          <div className='bg-red-100 text-red-600 p-2 rounded'>{error}</div>
        )}

        <div>
          <label htmlFor='email' className='block text-sm font-medium'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            required
            className='mt-1 block w-full rounded border p-2'
            autoComplete='username'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='mt-1 block w-full rounded border p-2'
            autoComplete='current-password'
          />
        </div>

        <button
          type='submit'
          className='w-full btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40'
        >
          Login
        </button>

        <div className='text-center mt-4'>
          <Link href='/auth/signup' className='text-[#1B3C6E] hover:underline'>
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

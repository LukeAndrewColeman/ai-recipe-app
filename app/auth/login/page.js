'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/app/actions/login';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { refreshSession } = useAuth();

  async function handleSubmit(formData) {
    try {
      const result = await authenticate(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        await refreshSession();
        router.push('/selector');
      }
    } catch (error) {
      setError('Something went wrong');
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
            Don&apos;t have an account? Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}

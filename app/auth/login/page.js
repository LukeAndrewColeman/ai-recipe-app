'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/app/actions/login';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    try {
      const result = await authenticate(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/'); // Redirect to home page
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong');
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <form action={handleSubmit} className='space-y-4 w-full max-w-sm'>
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
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>
    </div>
  );
}

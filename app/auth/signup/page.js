'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/actions/signup';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    try {
      const result = await register(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/auth/login');
        router.refresh();
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
        <h1 className='text-2xl font-bold mb-4'>Register</h1>

        {error && (
          <div className='bg-red-100 text-red-600 p-2 rounded'>{error}</div>
        )}

        <div>
          <label htmlFor='name' className='block text-sm font-medium'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            required
            className='mt-1 block w-full rounded border p-2'
            autoComplete='name'
          />
        </div>

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
            autoComplete='new-password'
          />
        </div>

        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium'
          >
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            required
            className='mt-1 block w-full rounded border p-2'
            autoComplete='new-password'
          />
        </div>

        <button
          type='submit'
          className='w-full btn bg-secondary/20 border border-secondary/40 hover:border-secondary hover:bg-secondary/40'
        >
          Register
        </button>

        <div className='text-center mt-4'>
          <Link href='/auth/login' className='text-[#1B3C6E] hover:underline'>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}

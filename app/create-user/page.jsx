'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateUserPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const createUser = async () => {
        try {
          const res = await fetch('/api/create-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user }),
          });

          if (res.ok) {
            router.push('/recipe-generator');
          } else {
            throw new Error(res.statusText + (await res.text()));
          }
        } catch (error) {
          console.error('Error creating user:', error);
          alert(error.message);
        }
      };

      createUser();
    }
  }, [user, isSignedIn, router]);

  if (!isSignedIn) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h2 className='text-2xl font-semibold mb-4'>User not signed in</h2>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-[50vh]'>
        <h2 className='text-2xl font-semibold mb-4'>
          Setting up your account...
        </h2>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    </div>
  );
}

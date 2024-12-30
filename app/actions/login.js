'use server';

import { signIn } from '@/app/auth';

export async function authenticate(formData) {
  try {
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      return { error: 'Invalid credentials' };
    }

    return { success: true };
  } catch (error) {
    console.error('Authentication error:', error);
    return { error: 'Something went wrong' };
  }
}

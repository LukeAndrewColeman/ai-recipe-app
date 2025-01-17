'use server';

import { signOut } from '@/app/auth';
import { cookies } from 'next/headers';

export async function logout() {
  // Clear any session cookies
  cookies().delete('next-auth.session-token');
  cookies().delete('__Secure-next-auth.session-token');

  // Sign out using NextAuth
  await signOut({ redirect: false });

  return { success: true };
}

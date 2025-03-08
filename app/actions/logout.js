import { account } from '@/config/appwrite';

export async function logout() {
  try {
    const result = await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to logout' };
  }
}

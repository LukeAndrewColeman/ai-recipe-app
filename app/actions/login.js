import { account } from '@/config/appwrite';

export async function authenticate(formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const session = await account.createEmailPasswordSession(email, password);
    const response = await account.get();
    return { success: true, message: 'Login successful', session };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Error logging in' };
  }
}

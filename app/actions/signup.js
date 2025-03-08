import { account } from '@/config/appwrite';
import { ID } from 'appwrite';

export async function register(formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    const user = await account.create(ID.unique(), email, password, name);

    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
}

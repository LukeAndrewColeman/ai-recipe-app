import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.lukeacoleman.com');

export default async function getRecipes() {
  try {
    const records = await pb.collection('Posts').getFullList({
      sort: '-created',
    });

    return records;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

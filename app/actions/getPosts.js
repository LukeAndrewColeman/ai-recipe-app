import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.lukeacoleman.com');

const getPosts = async (slug) => {
  let lastError;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const record = await pb
        .collection('Posts')
        .getFirstListItem(`slug="${slug}"`);
      return record;
    } catch (error) {
      console.log(`Attempt ${attempt + 1} failed: ${error.message}`);
      lastError = error;

      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  return null;
};

export default getPosts;

import { Client, Account, ID, Databases } from 'node-appwrite';

// Initialize Appwrite client for server-side operations
const serverClient = new Client();

// Configure server client with API endpoint and project ID
serverClient
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_SMARTRECIPE_AI_API_KEY);

// Create and export server-side service instances
export const account = new Account(serverClient);
export const database = new Databases(serverClient);

// Export server client instance for direct usage if needed
export const serverAppwriteClient = serverClient;

// Export ID utility for generating unique identifiers
export { ID };

import { Client, Account, ID, Databases } from 'appwrite';
// Initialize Appwrite client
const client = new Client();

// Configure client with API endpoint and project ID
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// Create and export account instance for authentication
export const account = new Account(client);

// Create and export database instance for data operations
export const database = new Databases(client);

// Export client instance for potential direct usage
export const appwriteClient = client;

// Export ID utility for generating unique identifiers
export { ID };

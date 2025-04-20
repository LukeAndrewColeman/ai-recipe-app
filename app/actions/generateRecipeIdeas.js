'use server';

import genAI from '@/lib/gemini';

let lastRequestTimestamp = 0;
const RATE_LIMIT_INTERVAL = 1000;

// Function for initial recipe previews
export async function generateRecipePreviews(cuisine) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error('API key not configured');
  }

  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTimestamp;
  if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
    throw new Error('Please wait a moment before trying again');
  }
  lastRequestTimestamp = now;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      generationConfig: {
        maxOutputTokens: 1024, // Reduced tokens since we need less content
        temperature: 0.5,
      },
    });

    const prompt = `Generate 3 recipe ideas for ${cuisine} cuisine that are authentic and feasible to make at home, these recipes should be somewhat traditional but have a modern twist.

{
  "recipes": [
    {
      "id": "1",
      "name": "Recipe Name",
      "description": "A brief, appetizing description of the dish",
      "cookingTime": "30 minutes",
      "difficulty": "Easy"
    }
  ]
}

REQUIREMENTS:
- Output ONLY valid JSON
- Generate exactly 3 unique recipes
- Each recipe must have all fields shown above
- Descriptions should be engaging
- No additional fields or text
- Keep the recipes simple and easy to make
- Use everyday ingredients, no exotic ingredients
- Make these everyday recipes that are easy to make, delicious, authentic and healthy`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean and parse the response
    const cleanText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim()
      .replace(/^[^{]*/, '')
      .replace(/}[^}]*$/, '}');

    try {
      const parsedData = JSON.parse(cleanText);

      // Validate structure
      if (!parsedData.recipes || !Array.isArray(parsedData.recipes)) {
        throw new Error('Invalid structure: missing recipes array');
      }

      // Validate recipe count
      if (parsedData.recipes.length !== 3) {
        throw new Error(`Expected 3 recipes, got ${parsedData.recipes.length}`);
      }

      // Validate each recipe preview
      const validatedPreviews = parsedData.recipes.map((recipe, index) => {
        const requiredFields = [
          'id',
          'name',
          'description',
          'cookingTime',
          'difficulty',
        ];

        const missingFields = requiredFields.filter((field) => !recipe[field]);
        if (missingFields.length > 0) {
          throw new Error(
            `Recipe ${index + 1} missing fields: ${missingFields.join(', ')}`
          );
        }

        return recipe;
      });

      return { recipes: validatedPreviews };
    } catch (parseError) {
      console.error('Parse error:', parseError.message);
      throw new Error(`Failed to parse recipe previews: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}

// Function to get full recipe details
export async function getFullRecipeDetails(cuisine, recipeId, recipeName) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error('API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.5,
      },
    });

    const prompt = `Generate complete details for a ${cuisine} recipe named "${recipeName}". Return ONLY valid JSON with full recipe information.

{
  "recipe": {
    "id": "${recipeId}",
    "name": "${recipeName}",
    "description": "A brief, appetizing description of the dish",
    "servings": "4",
    "cookingTime": "30 minutes",
    "difficulty": "Easy",
    "ingredients": [
      "2 cups all-purpose flour",
      "1 teaspoon salt",
      "3 large eggs"
    ],
    "instructions": ["step 1", "step 2"],
    "tipsAndVariations": ["tip 1", "tip 2"],
    "whyYoullLoveIt": "string",
    "storageInstructions": "string",
    "finalThoughts": "string"
  }
}

REQUIREMENTS:
- Output ONLY valid JSON
- Use the exact recipe name provided
- Include all fields shown above
- Ingredients MUST be an array of strings, with each string containing the full ingredient description (e.g., "2 cups all-purpose flour")
- Detailed instructions and ingredients
- No additional fields or text
- Do not include any markdown formatting or code blocks
- Keep the recipes simple and easy to make
- Use everyday ingredients, no exotic ingredients
- Make these everyday recipes that are easy to make, delicious, authentic and healthy`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean and parse the response
    const cleanText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim()
      .replace(/^[^{]*/, '')
      .replace(/}[^}]*$/, '}');

    try {
      const parsedData = JSON.parse(cleanText);

      // Validate ingredients format
      if (!Array.isArray(parsedData.recipe.ingredients)) {
        throw new Error('Ingredients must be an array');
      }

      // Ensure all ingredients are strings
      parsedData.recipe.ingredients = parsedData.recipe.ingredients.map(
        (ingredient) => {
          if (typeof ingredient === 'object') {
            // Convert object to string if needed
            return `${ingredient.quantity || ''} ${ingredient.unit || ''} ${
              ingredient.name || ''
            }${ingredient.notes ? ` (${ingredient.notes})` : ''}`.trim();
          }
          return String(ingredient);
        }
      );

      return parsedData;
    } catch (parseError) {
      console.error('Parse error:', parseError.message);
      throw new Error(`Failed to parse recipe details: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}

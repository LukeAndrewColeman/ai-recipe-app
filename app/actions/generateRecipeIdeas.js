'use server';

import genAI from '@/lib/gemini';

let lastRequestTimestamp = 0;
const RATE_LIMIT_INTERVAL = 1000;

export async function generateRecipeIdeas(cuisine) {
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
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
      },
    });

    const prompt = `Generate 3 recipe ideas for ${cuisine} cuisine that are authentic and feasible to make at home, these recipes should be somewhat traditional but have a modern twist.

    Each recipe MUST:
      •	Be distinctly different from the others in style and ingredients
      •	Use realistic portions and accurate cooking times
      •	Include clear, specific measurements
      •	Follow UK conventions:
      •	Use metric measurements (grams, millilitres)
      •	Use British terminology (e.g., coriander, aubergine, courgette)
      •	Follow UK nutritional formatting
      •	Have a dynamically generated unique ID
        Return ONLY a JSON object with this exact structure, no additional text or markdown:
    {
      "recipes": [
        {
          "id": "12455678976",
          "name": "Recipe Name",
          "description": "Brief description",
          "cookingTime": "30 minutes",
          "difficulty": "Easy/Medium/Hard",
          "servings": "4",
          "ingredients": ["200g ingredient 1", "500ml ingredient 2"],
          "instructions": ["step 1", "step 2"]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let cleanedText = text.trim();
    if (cleanedText.includes('```')) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    }

    if (!cleanedText.startsWith('{') || !cleanedText.endsWith('}')) {
      throw new Error('Invalid JSON format in response');
    }

    try {
      const parsedData = JSON.parse(cleanedText);

      if (!parsedData.recipes || !Array.isArray(parsedData.recipes)) {
        throw new Error('Missing recipes array in response');
      }

      // Validate each recipe
      const validatedRecipes = parsedData.recipes.map((recipe) => {
        const requiredFields = [
          'id',
          'name',
          'description',
          'cookingTime',
          'difficulty',
          'servings',
          'ingredients',
          'instructions',
        ];

        const missingFields = requiredFields.filter((field) => !recipe[field]);
        if (missingFields.length > 0) {
          throw new Error(
            `Recipe ${
              recipe.name
            } is missing required fields: ${missingFields.join(', ')}`
          );
        }

        return recipe;
      });

      return { recipes: validatedRecipes };
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Cleaned text:', cleanedText);
      throw new Error(`Error generating recipe ideas. Please try again.`);
    }
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}

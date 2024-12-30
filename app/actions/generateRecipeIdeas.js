'use server';

import genAI from '@/lib/gemini';

export async function generateRecipeIdeas(cuisine) {
  if (!process.env.GOOGLE_AI_API_KEY) {
    throw new Error('API key not configured');
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
      },
    });

    const prompt = `Generate 3 UNIQUE and CREATIVE recipe ideas for ${cuisine} cuisine. Each recipe should be different.
    Use UK measurements (grams, milliliters), UK terminology (e.g., coriander instead of cilantro, aubergine instead of eggplant),and UK nutritional information formats. all recipes should have unique ids.
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
          "instructions": ["step 1", "step 2"],
          "nutritionFacts": {
            "calories": "500 kcal",
            "protein": "20g",
            "carbohydrates": "60g",
            "fat": "25g",
            "saturates": "10g",
            "sugars": "15g",
            "salt": "1.5g"
          }
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text
    let cleanedText = text.trim();

    // Remove any markdown code block markers
    if (cleanedText.includes('```')) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    }

    // Ensure the text starts with { and ends with }
    if (!cleanedText.startsWith('{') || !cleanedText.endsWith('}')) {
      throw new Error('Invalid JSON format in response');
    }

    try {
      const parsedData = JSON.parse(cleanedText);

      // Validate the parsed data structure
      if (!parsedData.recipes || !Array.isArray(parsedData.recipes)) {
        throw new Error('Missing recipes array in response');
      }

      // Validate each recipe has required fields
      parsedData.recipes.forEach((recipe, index) => {
        const requiredFields = [
          'id',
          'name',
          'description',
          'cookingTime',
          'difficulty',
          'servings',
          'ingredients',
          'instructions',
          'nutritionFacts',
        ];
        const missingFields = requiredFields.filter((field) => !recipe[field]);

        if (missingFields.length > 0) {
          throw new Error(
            `Recipe ${
              index + 1
            } is missing required fields: ${missingFields.join(', ')}`
          );
        }
      });

      return parsedData;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Cleaned text:', cleanedText);
      throw new Error(`Failed to parse recipe data: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Generation error:', error);
    throw error;
  }
}

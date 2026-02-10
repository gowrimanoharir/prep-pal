import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, subcategory, numQuestions, difficulty } = req.body;

    // Validate required fields
    if (!category || !subcategory || !numQuestions || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use mock data if no API key is configured (local dev without API key)
    if (!process.env.APP_INT_KEY) {
      console.log('No app integration found, using mock data');
      
      try {
        // Dynamically import sample response if it exists
        const sampleResponse = await import('@/data/sample-response.json');
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.status(200).json(sampleResponse.default || sampleResponse);
      } catch {
        return res.status(500).json({ 
          error: 'No API key configured and no mock data found. Copy sample-response.json.example to sample-response.json or set APP_INT_KEY.'
        });
      }
    }

    // Real OpenAI API call
    console.log('Using OpenAI API with key');
    const openai = new OpenAI({
      apiKey: process.env.APP_INT_KEY,
    });

    const response = await openai.responses.create({
      prompt: {
        id: process.env.PROMPT_ID || '',
        version: process.env.PROMPT_VERSION || '',
        variables: {
          category,
          subcategory,
          difficulty,
          numqs: numQuestions.toString(),
        },
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return res.status(500).json({ 
      error: 'Failed to generate quiz. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

interface OpenAIResponseWithOutput {
  output_text: string;
}

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

    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // In development, always use mock data
    if (isDevelopment) {
      console.log('Development mode: Using mock data');
      
      try {
        // Dynamically import sample response if it exists
        const sampleModule = await import('@/data/sample-response.json');
        const sampleResponse = sampleModule.default || sampleModule;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ensure response has the expected structure
        if (!sampleResponse || !sampleResponse.questions) {
          throw new Error('Invalid mock data structure');
        }
        
        return res.status(200).json(sampleResponse);
      } catch (error) {
        console.error('Mock data error:', error);
        return res.status(500).json({ 
          error: 'Development mode: No mock data found. Copy sample-response.json.example to sample-response.json.',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    // In production, API key is required
    if (!process.env.APP_INT_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured. Please set integration key environment variable.'
      });
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

    console.log('OpenAI API Response:', JSON.stringify(response, null, 2));
    
    // Extract and parse the output_text from OpenAI response
    const outputText = (response as unknown as OpenAIResponseWithOutput).output_text;
    console.log('Output text:', outputText);
    
    const quizData = JSON.parse(outputText);
    console.log('Parsed quiz data:', JSON.stringify(quizData, null, 2));
    
    return res.status(200).json(quizData);
  } catch (error) {
    console.error('Error generating quiz:', error);
    return res.status(500).json({ 
      error: 'Failed to generate quiz. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

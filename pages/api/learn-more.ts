import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import type { Resource } from '@/types/learn-more';

const anthropic = new Anthropic({
  apiKey: process.env.APP_INT_TWO_KEY,
});

interface LearnMoreRequestBody {
  topic: string;
  category: string;
  subcategory: string;
  difficulty: string;
}

async function checkUrlExists(url: string, timeoutMs = 3000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      credentials: 'omit',
    });

    clearTimeout(timeout);
    return response.ok;
  } catch {
    return false;
  }
}

// Extract URLs from tool result blocks (pages Claude actually fetched during web search).
// Skips text blocks since those are Claude's own written response, not search result data.
function extractUrlsFromToolResults(content: Anthropic.Messages.ContentBlock[]): Set<string> {
  const urls = new Set<string>();
  const urlRegex = /https?:\/\/[^\s"'<>)\]\\]+/g;

  for (const block of content) {
    if (block.type === 'text') continue;
    const raw = JSON.stringify(block);
    for (const url of raw.match(urlRegex) ?? []) {
      urls.add(url.replace(/[.,;:)]+$/, ''));
    }
  }

  return urls;
}

async function validateResources(
  resources: Resource[],
  searchedUrls: Set<string>
): Promise<Resource[]> {
  if (resources.length === 0) return [];

  const results = await Promise.allSettled(
    resources.map(async (resource) => {
      // Format check first
      try {
        const parsed = new URL(resource.url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          return { resource, valid: false };
        }
      } catch {
        return { resource, valid: false };
      }

      // Primary: URL appears in what Claude actually fetched via web search
      if (searchedUrls.has(resource.url)) {
        return { resource, valid: true };
      }

      // Fallback: HEAD request for URLs not confirmed in search results
      const valid = await checkUrlExists(resource.url);
      return { resource, valid };
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<{ resource: Resource; valid: boolean }> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((r) => r.valid)
    .map((r) => r.resource);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.APP_INT_TWO_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Learn More is not configured.',
        searchPerformed: false,
      });
    }

    const { topic, category, subcategory, difficulty } = req.body as LearnMoreRequestBody;

    if (!topic || !category || !subcategory || !difficulty) {
      return res.status(400).json({
        success: false,
        error: 'Missing topic, category, subcategory, or difficulty.',
        searchPerformed: false,
      });
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [
        {
          role: 'user',
          content: `Topic: ${topic}
Category: ${category}
Subcategory: ${subcategory}
Difficulty Level: ${difficulty}

IMPORTANT: You MUST use web_search to find current, high-quality learning resources about this topic.

Search for:
- Official documentation for ${subcategory} covering ${topic}
- Quality tutorials and guides about ${topic}
- Recent articles or videos (2023-2025) explaining ${topic}

Requirements:
- Resources should be appropriate for ${difficulty} level learners
- Prioritize official docs, reputable sites, well-known educators
- Include mix of text tutorials, videos, and practice resources

Provide a response in valid JSON format only:
{
  "summary": "2-3 paragraph explanation of ${topic}",
  "resources": [
    {
      "title": "resource title",
      "url": "full https:// URL",
      "description": "one sentence explaining what this resource offers",
      "type": "docs"
    }
  ]
}

Include 4-5 resources. Use only type: "docs" | "tutorial" | "video" | "article" | "practice". Ensure all URLs are complete and real.`,
        },
      ],
    });

    const webSearchUsed = message.content.some(
      (block) => block.type === 'tool_use' && block.name === 'web_search'
    );

    if (!webSearchUsed) {
      return res.status(500).json({
        success: false,
        error: 'Unable to search for learning resources. Please try again.',
        searchPerformed: false,
      });
    }

    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return res.status(500).json({
        success: false,
        error: 'Invalid response format',
        searchPerformed: true,
      });
    }

    let parsed: { summary: string; resources: Resource[] };
    try {
      const cleanedText = textBlock.text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanedText);
    } catch {
      return res.status(500).json({
        success: false,
        error: 'Failed to parse learning resources',
        searchPerformed: true,
      });
    }

    const searchedUrls = extractUrlsFromToolResults(message.content);
    const validatedResources = await validateResources(parsed.resources ?? [], searchedUrls);

    if (validatedResources.length === 0) {
      return res.status(500).json({
        success: false,
        error: 'No valid learning resources found. Please try again.',
        searchPerformed: true,
      });
    }

    return res.status(200).json({
      success: true,
      summary: parsed.summary,
      resources: validatedResources.slice(0, 5),
      searchPerformed: true,
    });
  } catch (error) {
    console.error('[Learn More] Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate learning resources. Please try again.',
      searchPerformed: false,
    });
  }
}

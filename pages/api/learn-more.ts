import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import type { Resource } from '@/types/learn-more';

const anthropic = new Anthropic({
  apiKey: process.env.APP_INT_TWO_KEY,
});

function getCurrentYear(): number {
  return new Date().getFullYear();
}

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

    console.log(`[Learn More] Requesting resources for: "${topic}" (${subcategory} / ${difficulty})`);

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: 'You are a learning assistant for a quiz application. You MUST use the web_search tool before responding — never provide URLs from training data. Only recommend resources found through web search. Always respond in valid JSON format only.',
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
- A quality tutorial or guide about ${topic}

Requirements:
- Resources should be appropriate for ${difficulty} level learners
- Prioritize official docs and reputable sites
- Prefer recent content (${getCurrentYear() - 2}-${getCurrentYear()}) where applicable

Provide a response in valid JSON format only:
{
  "summary": "1-2 paragraph explanation of ${topic}",
  "resources": [
    {
      "title": "resource title",
      "url": "full https:// URL",
      "description": "one sentence explaining what this resource offers",
      "type": "docs"
    }
  ]
}

Include 2-3 resources. Use only type: "docs" | "tutorial" | "video" | "article" | "practice". Ensure all URLs are complete and real.`,
        },
      ],
    });

    const blockTypes = message.content.map((b) => (b as { type: string }).type);
    console.log(`[Learn More] Response blocks: ${blockTypes.join(', ')}`);

    const webSearchUsed = message.content.some((block) => {
      const b = block as { type: string; name?: string };
      return (b.type === 'tool_use' || b.type === 'server_tool_use') && b.name === 'web_search';
    });

    if (!webSearchUsed) {
      console.error('[Learn More] Web search was not used. Block types received:', blockTypes);
      return res.status(500).json({
        success: false,
        error: 'Unable to search for learning resources. Please try again.',
        searchPerformed: false,
      });
    }

    console.log('[Learn More] Web search confirmed. Extracting text response...');

    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      console.error('[Learn More] No text block found in response. Block types:', blockTypes);
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
      console.error('[Learn More] Failed to parse JSON. Raw text:', textBlock.text);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse learning resources',
        searchPerformed: true,
      });
    }

    console.log(`[Learn More] Parsed ${parsed.resources?.length ?? 0} resources. Validating URLs...`);

    const searchedUrls = extractUrlsFromToolResults(message.content);
    console.log(`[Learn More] Extracted ${searchedUrls.size} URLs from search results`);

    const validatedResources = await validateResources(parsed.resources ?? [], searchedUrls);
    console.log(`[Learn More] ${validatedResources.length} resources passed validation`);

    if (validatedResources.length === 0) {
      console.error('[Learn More] All resources failed validation. Parsed resources:', parsed.resources);
      return res.status(500).json({
        success: false,
        error: 'No valid learning resources found. Please try again.',
        searchPerformed: true,
      });
    }

    console.log('[Learn More] Success. Returning resources:', validatedResources.map((r) => r.url));

    return res.status(200).json({
      success: true,
      summary: parsed.summary,
      resources: validatedResources.slice(0, 3),
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

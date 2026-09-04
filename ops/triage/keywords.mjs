export const industryKeywords = [
  'acquire',
  'acquisition',
  'merger',
  'definitive agreement',
  'all-stock',
  'wholly owned',
  'in talks',
  'talks to',
  'nears',
  'buy',
  'raises',
  'series',
  'valuation',
  'strategic investment',
  'closed the round',
  'strategic partnership',
  'multiyear',
  'exclusive distribution',
  'dedicated capacity',
  'joint venture',
  'launches',
  'generally available',
  'ga',
  'gpt-',
  'claude',
  'gemini',
  'grok',
  'muse',
  'llama',
  'computer use',
  'api',
];

export const featuredKeywords = [
  'hackathon',
  'workshop',
  'kickoff',
  'kick off',
  'finals',
  'summit',
  'salon',
  'sitting',
  'builder club',
  'student collective',
  'nyc',
  'manhattan',
  'brooklyn',
  'columbia',
  'stern',
  'cornell tech',
  'openai',
  'anthropic',
  'google',
  'meta',
  'microsoft',
  'amazon',
  'nvidia',
  'xai',
  'spacexai',
  'mistral',
  'a16z',
  'sequoia',
  'greylock',
  'benchmark',
  'lightspeed',
  'thrive',
  'founders fund',
  'underwriter',
];

export function matchKeywords(text, keywords) {
  const hay = String(text || '').toLowerCase();
  return keywords.filter((word) => hay.includes(word.toLowerCase()));
}

export function prefilter(candidate) {
  const blob = [candidate.title, candidate.summary, candidate.source, candidate.location]
    .filter(Boolean)
    .join(' ');
  const keywords = candidate.lane === 'featured-event' ? featuredKeywords : industryKeywords;
  const matched = matchKeywords(blob, keywords);
  return {
    pass: matched.length > 0,
    matchedKeywords: matched,
  };
}

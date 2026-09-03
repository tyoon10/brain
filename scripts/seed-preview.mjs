import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { stringify } from 'yaml';

const root = join(import.meta.dirname, '..');
const dump = (folder, slug, data) =>
  writeFileSync(join(root, 'data', folder, `${slug}.yml`), stringify(data));

const events = [
  {
    slug: 'cbs-exec-ed-ai',
    title: 'CBS Executive Education in AI',
    startsAt: '2026-08-05T09:00:00-04:00',
    location: 'Columbia Business School',
    summary: 'A sitting inside CBS Executive Education in AI.',
    href: 'https://twyoon.com/workshop',
    campusSeats: ['cbs'],
    relation: 'listed',
    listedAs: 'Workshop',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'ai-startup-challenge-finals',
    title: 'AI Startup Challenge — Final Competition Day',
    startsAt: '2026-04-24T17:00:00-04:00',
    location: 'Williamsburg, Brooklyn, NY',
    summary: 'Final competition day of the AI Startup Challenge.',
    href: 'https://business.columbia.edu/ai-in-business/ai-startup-final-competition-day',
    campusSeats: ['cbs'],
    relation: 'co-hosted',
    listedAs: 'Chair / host',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'columbia-nyu-claude-hackathon',
    title: 'Columbia x NYU Claude Builder Club Hackathon',
    startsAt: '2026-04-12T09:00:00-04:00',
    location: 'Geffen Hall, Columbia Business School',
    summary: 'A cross-seat build sitting at Geffen Hall.',
    href: 'https://luma.com/wt6wmh29',
    campusSeats: ['cbs', 'stern'],
    relation: 'co-hosted',
    listedAs: 'Co-chair',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'building-future-finance-claude',
    title: 'Building the Future of Finance with Claude',
    startsAt: '2026-03-17T09:00:00-04:00',
    location: 'CBS Executive Education',
    summary: 'Keynote sitting for CBS Executive Education.',
    href: 'https://execed.business.columbia.edu/programs/business-ai',
    campusSeats: ['cbs'],
    relation: 'listed',
    listedAs: 'Keynote',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'gdg-nyc-build-with-ai',
    title: 'GDG NYC Build With AI Hackathon',
    startsAt: '2026-03-08T09:00:00-05:00',
    location: 'Columbia Business School',
    summary: 'Build-with-AI sitting listed on the docket.',
    href: 'https://gdg.community.dev/events/details/google-gdg-nyc-presents-ai-futures-fund-presents-nyc-build-w-ai-hackathon-google-cloud-labs-x-columbia-business-school-ii/',
    campusSeats: ['cbs'],
    relation: 'listed',
    listedAs: 'Mentor',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'mistral-hackathon-nyc',
    title: 'Mistral AI Worldwide Hackathon — New York',
    startsAt: '2026-02-28T09:00:00-05:00',
    location: 'Verci Flatiron, New York',
    summary: 'Worldwide hackathon sitting in Flatiron.',
    href: 'https://luma.com/mistralhack-newyork',
    campusSeats: ['cbs', 'stern', 'cornell-tech'],
    relation: 'listed',
    listedAs: 'Judge',
    eligibilityInferred: true,
    inferred: false,
    inferredNote: 'Campus-seat eligibility for this sitting is inferred.',
  },
  {
    slug: 'claude-code-dpm-lab',
    title: 'Claude Code Workshop — Digital Product Management Lab',
    startsAt: '2026-02-23T09:00:00-05:00',
    location: 'Columbia Business School',
    summary: 'Workshop sitting inside the Digital Product Management Lab.',
    href: 'https://www.linkedin.com/posts/taewan-yoon_claudepartner-productmanagement-contextengineering-activity-7432843926362931201-MvCA',
    campusSeats: ['cbs'],
    relation: 'listed',
    listedAs: 'Workshop',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'ai-club-iterate-hackathon',
    title: 'AI Club x Iterate NYC Hackathon',
    startsAt: '2026-02-14T09:00:00-05:00',
    location: 'Columbia Business School',
    summary: 'A co-hosted build sitting with Iterate NYC.',
    href: 'https://luma.com/dyzbn70z',
    campusSeats: ['cbs'],
    relation: 'co-hosted',
    listedAs: 'Co-chair',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'claude-builder-kickoff',
    title: 'Claude Builder Club Spring 2026 Kick Off',
    startsAt: '2026-02-11T18:00:00-05:00',
    location: 'Columbia University',
    summary: 'Spring kick-off sitting for Claude Builder Club.',
    href: 'https://cglink.me/2ca/r131627',
    campusSeats: ['cbs'],
    relation: 'listed',
    listedAs: 'Chair',
    eligibilityInferred: true,
    inferred: false,
  },
  {
    slug: 'ai-for-greater-good-kickoff',
    title: 'AI for Greater Good NYC Kick Off',
    startsAt: '2026-01-23T18:00:00-05:00',
    location: 'New York, NY',
    summary: 'Kick-off sitting listed on the city docket.',
    href: 'https://luma.com/cjylbi37',
    campusSeats: ['cbs', 'stern', 'cornell-tech', 'yale-som'],
    relation: 'listed',
    listedAs: 'Panelist',
    eligibilityInferred: true,
    inferred: false,
    inferredNote: 'Campus-seat eligibility for this sitting is inferred.',
  },
  {
    slug: 'mathworks-finance-conference-2025',
    title: 'MathWorks Finance Conference 2025',
    startsAt: '2025-09-30T09:00:00-04:00',
    location: 'Virtual',
    summary: 'Speaker sitting at the MathWorks Finance Conference.',
    href: 'https://www.mathworks.com/videos/investment-strategies-ideation-using-large-language-models-and-structured-multi-modal-data-1760424545621.html',
    campusSeats: [],
    relation: 'listed',
    listedAs: 'Speaker',
    eligibilityInferred: true,
    inferred: false,
    inferredNote: 'Campus-seat eligibility for this sitting is inferred.',
  },
];

for (const event of events) dump('events', event.slug, event);

const offers = [
  { slug: 'gemini', title: 'Gemini', counterpart: 'Google', summary: 'Student year of Gemini.', terms: '12 months free.', href: 'https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'granola', title: 'Granola', counterpart: 'Granola', summary: 'Student year of Granola Business.', terms: '12 months free.', href: 'https://www.granola.ai/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'notion', title: 'Notion', counterpart: 'Notion', summary: 'Plus plan for an eligible school email.', terms: 'Free while eligible.', href: 'https://www.notion.com/help/notion-for-education', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'wispr-flow', title: 'Wispr Flow', counterpart: 'Wispr Flow', summary: 'Student rate after a short free window.', terms: '3 months free, then 50% off. Codes do not stack. Use wisprflow.ai/students.', href: 'https://wisprflow.ai/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'github-pack', title: 'GitHub Student Developer Pack', counterpart: 'GitHub', summary: 'Verified student pack.', terms: 'Free while verified.', href: 'https://education.github.com/pack/', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'codex', title: 'Codex', counterpart: 'OpenAI', summary: 'Credits for Codex surfaces only.', terms: '$100 in Codex credits.', href: 'https://developers.openai.com/community/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'perplexity', title: 'Perplexity', counterpart: 'Perplexity', summary: 'Education Pro at half the listed rate.', terms: '50% off.', href: 'https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'figma', title: 'Figma', counterpart: 'Figma', summary: 'Professional plan for verified higher-ed students.', terms: '1 year free.', href: 'https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education', verifiedOn: '2026-08-18', inferred: false },
];
for (const offer of offers) dump('offers', offer.slug, offer);

const benefits = [
  { slug: 'gemini', title: 'Gemini', counterpart: 'Google', terms: '12 months free.', tier: 'same-day', href: 'https://blog.google/innovation-and-ai/products/gemini-app/student-offer-google-ai/', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'granola', title: 'Granola', counterpart: 'Granola', terms: '12 months free.', tier: 'same-day', href: 'https://www.granola.ai/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'notion', title: 'Notion', counterpart: 'Notion', terms: 'Free Plus, one-member workspace.', tier: 'same-day', href: 'https://www.notion.com/help/notion-for-education', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'github-pack', title: 'GitHub Student Developer Pack', counterpart: 'GitHub', terms: 'Free while verified.', tier: 'same-day', href: 'https://education.github.com/pack/', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'figma', title: 'Figma', counterpart: 'Figma', terms: '1 year free.', tier: 'same-day', href: 'https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'wispr-flow', title: 'Wispr Flow', counterpart: 'Wispr Flow', terms: '3 months free, then 50% off. Codes do not stack.', tier: 'this-week', href: 'https://wisprflow.ai/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'codex', title: 'Codex', counterpart: 'OpenAI', terms: '$100 in Codex credits.', tier: 'this-week', href: 'https://developers.openai.com/community/students', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'perplexity', title: 'Perplexity', counterpart: 'Perplexity', terms: '50% off.', tier: 'this-week', href: 'https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'aws-rewards', title: 'AWS Student Rewards', counterpart: 'AWS', terms: 'Open via SheerID. AWS states $579.', tier: 'this-week', verifiedOn: '2026-08-29', inferred: false },
  { slug: 'aws-builder-groups', title: 'AWS Student Builder Groups', counterpart: 'AWS', terms: 'Open via SheerID.', tier: 'this-week', verifiedOn: '2026-08-29', inferred: false },
  { slug: 'adobe', title: 'Adobe Creative Cloud', counterpart: 'Adobe', terms: '~71% off first year.', tier: 'this-month', href: 'https://www.adobe.com/creativecloud/buy/students/explore/ccforstudents.html', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'microsoft-365', title: 'Microsoft 365 Personal', counterpart: 'Microsoft', terms: '50% off.', tier: 'this-month', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'grammarly', title: 'Grammarly', counterpart: 'Grammarly', terms: '50% off, seasonal.', tier: 'this-month', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'beautiful-ai', title: 'Beautiful.ai', counterpart: 'Beautiful.ai', terms: 'Free Pro for 12 months.', tier: 'this-month', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'amp', title: 'Amp', counterpart: 'Sourcegraph', terms: '50% off.', tier: 'this-month', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'zed', title: 'Zed', counterpart: 'Zed', terms: 'Free for 1 year.', tier: 'this-term', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'azure-students', title: 'Azure for Students', counterpart: 'Microsoft', terms: '$100 credit.', tier: 'this-term', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'google-cloud-students', title: 'Google Cloud for Students', counterpart: 'Google', terms: '200 Google Skills credits.', tier: 'this-term', verifiedOn: '2026-08-18', inferred: false },
  { slug: 'aws-educate', title: 'AWS Educate', counterpart: 'AWS', terms: 'Free self-paced labs.', tier: 'this-term', verifiedOn: '2026-08-18', inferred: false },
];
for (const row of benefits) dump('benefits', row.slug, row);

const campusPrograms = [
  { slug: 'claude-campus', name: 'Claude Campus', status: 'Closed', note: 'Spring 2026 in session.', asOf: '2026-08-29', inferred: false },
  { slug: 'openai-student-collective', name: 'OpenAI Student Collective', status: 'Closed 2026-08-10', note: 'Undergrad-only.', asOf: '2026-08-29', inferred: false },
  { slug: 'aws-builder-groups', name: 'AWS Student Builder Groups', status: 'Open', note: 'SheerID.', asOf: '2026-08-29', inferred: false },
  { slug: 'aws-student-rewards', name: 'AWS Student Rewards', status: 'Open', note: 'SheerID. AWS states $579.', asOf: '2026-08-29', inferred: false },
  { slug: 'github-education', name: 'GitHub Education', status: 'Open', note: 'Student Developer Pack still listed 2026-08-18.', asOf: '2026-08-18', inferred: false },
  { slug: 'gemini-student', name: 'Gemini student year', status: 'Open', note: 'SheerID. 12 months free as of 2026-08-18.', asOf: '2026-08-18', inferred: false },
];
for (const row of campusPrograms) dump('campus-programs', row.slug, row);

const labs = [
  { slug: 'claude-campus', name: 'Claude Campus', note: 'Closed. Spring 2026 in session.', inferred: false },
  { slug: 'openai-student-collective', name: 'OpenAI Student Collective', note: 'Closed 2026-08-10. Undergrad-only.', inferred: false },
  { slug: 'aws-builder-groups', name: 'AWS Student Builder Groups', note: 'Open, SheerID.', inferred: false },
  { slug: 'github-education', name: 'GitHub Education', note: 'Pack still open as of 2026-08-18.', inferred: false },
  { slug: 'gemini-student', name: 'Gemini student year', note: 'Open as of 2026-08-18.', inferred: false },
  { slug: 'cursor-student', name: 'Cursor student rate', note: 'Closed 2026-06-25.', inferred: false },
  { slug: 'codex-student', name: 'Codex student credits', note: '$100 as of 2026-08-18.', inferred: false },
  { slug: 'openrouter', name: 'OpenRouter', note: 'Stripe–OpenRouter announced 2026-08-19. Reported >$7bn, terms undisclosed.', inferred: false },
  { slug: 'glm', name: 'GLM', note: 'Version held.', inferred: false },
];
for (const row of labs) dump('labs', row.slug, row);

const mechanisms = [
  { slug: 'sheerid', name: 'SheerID', note: 'Gemini, Perplexity, Figma, AWS.', inferred: false },
  { slug: 'school-email', name: 'School email', note: 'Notion. School must be in the World Higher Education Database.', inferred: false },
  { slug: 'github-education', name: 'GitHub Education application', note: 'Student Developer Pack.', inferred: false },
  { slug: 'vendor-application', name: 'Vendor student application', note: 'Granola student page.', inferred: false },
  { slug: 'enrolment-proof', name: 'Proof of enrolment', note: 'Wispr Flow billing request. Codes do not stack.', inferred: false },
  { slug: 'adobe-flow', name: 'Adobe education flow', note: 'Creative Cloud student store.', inferred: false },
  { slug: 'redeem-by', name: 'Redeem-by date', note: 'Gemini redeem by 2026-12-31.', inferred: false },
  { slug: 'annual-reverify', name: 'Annual reverify', note: 'Gemini SheerID, up to 4 years.', inferred: false },
  { slug: 'undergrad-gate', name: 'Undergrad-only gate', note: 'OpenAI Student Collective closed 2026-08-10.', inferred: false },
  { slug: 'closed-door', name: 'Closed door', note: 'Cursor student rate closed 2026-06-25. Claude Campus closed.', inferred: false },
  { slug: 'as-of-stamp', name: 'As-of stamp', note: 'Every live offer carries a verified-on day.', inferred: false },
];
for (const row of mechanisms) dump('mechanisms', row.slug, row);

const sittingNotices = events.map((event) => ({
  slug: `sat-${event.slug}`,
  title: event.title,
  publishedAt: event.startsAt,
  summary: `Sat. ${event.location}. ${event.listedAs}.`,
  lane: 'campus',
  held: false,
  inferred: false,
}));

const industry = [
  { slug: 'gpt-5-6-sol', title: 'GPT-5.6 Sol cut', publishedAt: '2026-08-21', summary: 'GPT-5.6 Sol cut.', lane: 'industry', held: false, inferred: false },
  { slug: 'stripe-openrouter', title: 'Stripe–OpenRouter announced', publishedAt: '2026-08-19', summary: 'Announced. Reported >$7bn, terms undisclosed.', lane: 'industry', held: false, inferred: false },
  { slug: 'anthropic-decart', title: 'Anthropic–Decart', publishedAt: '2026-08-29', summary: '~$6bn reported only.', lane: 'industry', held: false, inferred: true, inferredNote: 'Announcement day was not in the brief; recorded against the 2026-08-29 as-of.' },
  { slug: 'spacex-cursor', title: 'SpaceX–Cursor stock', publishedAt: '2026-06-16', summary: '$60bn stock announced.', lane: 'industry', held: false, inferred: false },
  { slug: 'cursor-student-closed', title: 'Cursor student rate closed', publishedAt: '2026-06-25', summary: 'Student discount closed.', lane: 'industry', held: false, inferred: false },
  { slug: 'spacex-xai', title: 'SpaceX–xAI closed', publishedAt: '2026-02-02', summary: 'Closed.', lane: 'industry', held: false, inferred: false },
  { slug: 'glm-held', title: 'GLM version', publishedAt: '2026-08-29', summary: 'Held.', lane: 'industry', held: true, inferred: false },
];

const campusExtra = [
  { slug: 'claude-campus-closed', title: 'Claude Campus closed', publishedAt: '2026-08-29', summary: 'Closed. Spring 2026 in session.', lane: 'campus', held: false, inferred: false },
  { slug: 'osc-closed', title: 'OpenAI Student Collective closed', publishedAt: '2026-08-10', summary: 'Closed. Undergrad-only.', lane: 'campus', held: false, inferred: false },
];

const wire = [...industry, ...sittingNotices, ...campusExtra];
if (wire.length !== 20) throw new Error(`wire count ${wire.length}`);
for (const row of wire) dump('wire', row.slug, row);

console.log(`seeded events ${events.length} offers ${offers.length} benefits ${benefits.length} programs ${campusPrograms.length} labs ${labs.length} mechanisms ${mechanisms.length} wire ${wire.length}`);

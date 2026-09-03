import { upcoming, past } from './lib/upcoming.mjs';
import { loadCollection } from './lib/load.mjs';
import { campusSeatOrder } from './lib/seats.mjs';

const byDate = (key) => (a, b) => new Date(b[key]) - new Date(a[key]);

const orderBySlug = (items, slugs) =>
  [...items].sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));

const programs = loadCollection('programs').sort(
  (a, b) => campusSeatOrder.indexOf(a.id) - campusSeatOrder.indexOf(b.id),
);
const events = loadCollection('events').sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
const offers = loadCollection('offers').sort((a, b) => a.title.localeCompare(b.title));
const benefits = loadCollection('benefits');
const campusPrograms = orderBySlug(loadCollection('campus-programs'), [
  'claude-campus',
  'openai-student-collective',
  'aws-builder-groups',
  'aws-student-rewards',
  'github-education',
  'gemini-student',
]);
const wire = loadCollection('wire').sort(byDate('publishedAt'));
const labs = orderBySlug(loadCollection('labs'), [
  'claude-campus',
  'openai-student-collective',
  'aws-builder-groups',
  'github-education',
  'gemini-student',
  'cursor-student',
  'codex-student',
  'openrouter',
  'glm',
]);
const mechanisms = orderBySlug(loadCollection('mechanisms'), [
  'sheerid',
  'school-email',
  'github-education',
  'vendor-application',
  'enrolment-proof',
  'adobe-flow',
  'redeem-by',
  'annual-reverify',
  'undergrad-gate',
  'closed-door',
  'as-of-stamp',
]);
const partners = loadCollection('partners');

const briefPageSlugs = [
  'gpt-5-6',
  'stripe-openrouter',
  'spacex-cursor',
  'nvidia-hugging-face',
  'glm-held',
];
const briefPages = briefPageSlugs
  .map((slug) => wire.find((item) => item.slug === slug))
  .filter(Boolean);

const tierOrder = ['same-day', 'this-week', 'this-month', 'this-term'];
const benefitTiers = tierOrder.map((tier) => ({
  id: tier,
  label:
    tier === 'same-day'
      ? 'Same day'
      : tier === 'this-week'
        ? 'This week'
        : tier === 'this-month'
          ? 'This month'
          : 'This term',
  items: benefits.filter((item) => item.tier === tier),
}));

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'site/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'site/CNAME': 'CNAME' });

  eleventyConfig.addGlobalData('programs', programs);
  eleventyConfig.addGlobalData('events', events);
  eleventyConfig.addGlobalData('offers', offers);
  eleventyConfig.addGlobalData('benefits', benefits);
  eleventyConfig.addGlobalData('benefitTiers', benefitTiers);
  eleventyConfig.addGlobalData('campusPrograms', campusPrograms);
  eleventyConfig.addGlobalData('wire', wire);
  eleventyConfig.addGlobalData('industryWire', wire.filter((item) => item.lane === 'industry'));
  eleventyConfig.addGlobalData('campusWire', wire.filter((item) => item.lane === 'campus'));
  eleventyConfig.addGlobalData('briefPages', briefPages);
  eleventyConfig.addGlobalData('briefPageSlugs', briefPageSlugs);
  eleventyConfig.addGlobalData('labs', labs);
  eleventyConfig.addGlobalData('mechanisms', mechanisms);
  eleventyConfig.addGlobalData('partners', partners);
  eleventyConfig.addGlobalData('upcomingSittings', () => upcoming(events));
  eleventyConfig.addGlobalData('pastSittings', () => past(events));

  eleventyConfig.addFilter('nyDate', (value) => {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/New_York',
    });
  });

  eleventyConfig.addFilter('nyDay', (value) => {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'America/New_York',
    });
  });

  eleventyConfig.addFilter('isoDay', (value) => {
    if (!value) return '';
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter('seatName', (id) => {
    const seat = programs.find((program) => program.id === id);
    return seat ? seat.shortName : id;
  });

  eleventyConfig.addFilter('relationLabel', (relation) => {
    if (relation === 'owned') return 'Owned';
    if (relation === 'co-hosted') return 'Co-hosted';
    return 'Listed';
  });

  eleventyConfig.addFilter('statusTone', (status) => {
    const value = String(status || '').toLowerCase();
    if (value.startsWith('open')) return 'open';
    if (value.includes('held')) return 'held';
    return 'closed';
  });

  eleventyConfig.addFilter('hasBriefPage', (slug) => briefPageSlugs.includes(slug));

  eleventyConfig.addFilter('categoryLabel', (category) => {
    if (category === 'release') return 'Release';
    if (category === 'acquisition') return 'Acquisition';
    if (category === 'investment') return 'Investment';
    if (category === 'partnership') return 'Partnership';
    return category || '';
  });

  return {
    dir: {
      input: 'site',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html'],
  };
}

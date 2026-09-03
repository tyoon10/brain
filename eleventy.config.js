import { upcoming, past } from './lib/upcoming.mjs';
import { loadCollection } from './lib/load.mjs';
import { campusSeatOrder } from './lib/seats.mjs';

const programs = loadCollection('programs').sort(
  (a, b) => campusSeatOrder.indexOf(a.id) - campusSeatOrder.indexOf(b.id),
);
const events = loadCollection('events');
const offers = loadCollection('offers');
const wire = loadCollection('wire');
const partners = loadCollection('partners');

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'site/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'site/favicon.svg': 'favicon.svg' });
  eleventyConfig.addPassthroughCopy({ 'site/CNAME': 'CNAME' });

  eleventyConfig.addGlobalData('programs', programs);
  eleventyConfig.addGlobalData('events', events);
  eleventyConfig.addGlobalData('offers', offers);
  eleventyConfig.addGlobalData('wire', wire);
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
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
    });
  });

  eleventyConfig.addFilter('seatName', (id) => {
    const seat = programs.find((program) => program.id === id);
    return seat ? seat.shortName : id;
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

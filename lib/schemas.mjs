import { z } from 'zod';

export const campusSeatId = z.enum(['cbs', 'stern', 'cornell-tech', 'yale-som']);

export const hexColour = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, 'Expected a six-digit hex colour');

export const inferred = z.boolean();

export const eventSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  location: z.string().min(1),
  summary: z.string().min(1),
  href: z.string().url().optional(),
  campusSeats: z.array(campusSeatId).default([]),
  relation: z.enum(['owned', 'co-hosted', 'listed']),
  listedAs: z.string().min(1),
  eligibilityInferred: z.boolean(),
  inferred: inferred,
  inferredNote: z.string().optional(),
  featured: z.boolean().default(false),
});

export const offerSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  counterpart: z.string().min(1),
  summary: z.string().min(1),
  terms: z.string().min(1),
  href: z.string().url(),
  verifiedOn: z.coerce.date(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const benefitSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  counterpart: z.string().min(1),
  terms: z.string().min(1),
  tier: z.enum(['same-day', 'this-week', 'this-month', 'this-term']),
  href: z.string().url().optional(),
  verifiedOn: z.coerce.date(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const programSchema = z.object({
  id: campusSeatId,
  school: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  colour: hexColour,
  sittingFrom: z.string().min(1),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const campusProgramSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  status: z.string().min(1),
  note: z.string().min(1),
  asOf: z.coerce.date(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const wireCategory = z.enum(['release', 'acquisition', 'investment', 'partnership']);

export const wireSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    publishedAt: z.coerce.date(),
    summary: z.string().min(1),
    lane: z.enum(['industry', 'campus']),
    category: wireCategory.optional(),
    held: z.boolean().default(false),
    href: z.string().url().optional(),
    inferred: inferred,
    inferredNote: z.string().optional(),
  })
  .refine((item) => item.lane !== 'industry' || Boolean(item.category), {
    message: 'industry wire items require category',
    path: ['category'],
  });

export const labSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  note: z.string().min(1),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const mechanismSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  note: z.string().min(1),
  inferred: inferred,
});

export const partnerSchema = z.object({
  name: z.string().min(1),
  capacity: z.enum(['underwriter', 'counterpart']).optional(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const collectionSchemas = {
  events: eventSchema,
  offers: offerSchema,
  benefits: benefitSchema,
  programs: programSchema,
  'campus-programs': campusProgramSchema,
  wire: wireSchema,
  labs: labSchema,
  mechanisms: mechanismSchema,
  partners: partnerSchema,
};

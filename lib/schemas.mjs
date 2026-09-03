import { z } from 'zod';

export const campusSeatId = z.enum(['cbs', 'stern', 'cornell-tech', 'yale-som']);

export const hexColour = z
  .string()
  .regex(/^#([0-9a-fA-F]{6})$/, 'Expected a six-digit hex colour');

export const inferred = z.boolean();

export const eventSchema = z.object({
  title: z.string().min(1),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  location: z.string().min(1),
  summary: z.string().min(1),
  href: z.string().url().optional(),
  campusSeats: z.array(campusSeatId).default([]),
  chair: z.string().optional(),
  coChairs: z.array(z.string()).optional(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const offerSchema = z.object({
  title: z.string().min(1),
  counterpart: z.string().min(1),
  summary: z.string().min(1),
  href: z.string().url().optional(),
  underwriter: z.string().optional(),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const programSchema = z.object({
  id: campusSeatId,
  name: z.string().min(1),
  shortName: z.string().min(1),
  colour: hexColour,
  sittingFrom: z.string().min(1),
  inferred: inferred,
  inferredNote: z.string().optional(),
});

export const wireSchema = z.object({
  title: z.string().min(1),
  publishedAt: z.coerce.date(),
  summary: z.string().min(1),
  inferred: inferred,
  inferredNote: z.string().optional(),
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
  programs: programSchema,
  wire: wireSchema,
  partners: partnerSchema,
};

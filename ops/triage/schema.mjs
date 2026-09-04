import { z } from 'zod';

export const triageDecisionSchema = z
  .object({
    decision: z.enum(['include', 'exclude', 'hold']),
    lane: z.enum(['industry', 'featured-event']),
    category: z.enum(['release', 'acquisition', 'investment', 'partnership']).nullable(),
    confidence: z.number().min(0).max(1),
    reasons: z.array(z.string().min(1)).min(1),
    matchedKeywords: z.array(z.string()),
    failedChecks: z.array(z.string()),
    draft: z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      summary: z.string().min(1),
      publishedAt: z.string().optional(),
      startsAt: z.string().optional(),
      location: z.string().optional(),
      href: z.string().optional(),
      inferred: z.boolean().optional(),
      held: z.boolean().optional(),
      featured: z.boolean().optional(),
      lane: z.string().optional(),
      category: z.enum(['release', 'acquisition', 'investment', 'partnership']).nullable().optional(),
    }),
  })
  .superRefine((value, ctx) => {
    if (value.lane === 'featured-event' && value.category !== null) {
      ctx.addIssue({ code: 'custom', message: 'featured-event category must be null', path: ['category'] });
    }
    if (value.lane === 'industry' && value.decision === 'include' && !value.category) {
      ctx.addIssue({
        code: 'custom',
        message: 'industry include requires category',
        path: ['category'],
      });
    }
  });

export function parseDecision(value) {
  return triageDecisionSchema.parse(value);
}

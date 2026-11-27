import { z } from 'zod';

export const evidenceSchema = z.object({
  ref: z.string().min(1), claimId: z.string().min(1), source: z.string().min(1),
  scope: z.string().min(1), date: z.iso.date(),
  isApproved: z.boolean(), status: z.enum(['draft', 'verified', 'approved', 'published', 'withdrawn']),
});
export type Evidence = z.infer<typeof evidenceSchema>;
type Claim = Readonly<{ id: string; text: string }>;

export function publishClaims(claims: readonly Claim[], evidence: readonly Evidence[]): readonly Claim[] {
  const approved = new Set(evidence
    .filter((item) => item.isApproved && ['approved', 'published'].includes(item.status))
    .map((item) => item.claimId));
  return claims.filter((claim) => approved.has(claim.id)).map(({ id, text }) => ({ id, text }));
}

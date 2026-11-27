import { z } from 'zod';
import { BuildError } from './build-error';
import type { Service } from './service-schema';

const point = z.object({id:z.string().regex(/^[a-z-]+$/),name:z.string().min(1),
  x:z.number().min(0).max(520),y:z.number().min(0).max(240)});
const market = point.extend({region:z.enum(['Levant','Arabian Peninsula','North Africa']),
  services:z.array(z.string()).min(1)});
export type Market = z.infer<typeof market>;
export type NetworkLocation = z.infer<typeof point>;

const expectedMarkets = ['syria','iraq','yemen','libya','tunisia'];
const expectedNetwork = ['dubai','saudi-arabia'];
export function validateGeography(marketInput: unknown, locationInput: unknown, services: readonly Service[]): {
  markets: readonly Market[]; locations: readonly NetworkLocation[];
} {
  const markets = z.array(market).length(expectedMarkets.length).parse(marketInput);
  const locations = z.array(point).length(expectedNetwork.length).parse(locationInput);
  const serviceIds = new Set(services.map((item) => item.id));
  if (expectedMarkets.some((id, index) => markets[index]?.id !== id)
    || expectedNetwork.some((id, index) => locations[index]?.id !== id)
    || markets.some((item) => item.services.some((id) => !serviceIds.has(id)))) {
    throw new BuildError('Market, network or service references do not match the launch scope.');
  }
  return { markets, locations };
}

/**
 * Coldbru subscription PDP stubs (weekly / monthly).
 * Selling-plan IDs are placeholders until a Shopify product with
 * selling plans is linked. Add-to-cart still uses Hydrogen cart wiring
 * against mock.shop (or a real store) when a product is available.
 */

export const SUBSCRIPTION = {
  handle: 'coldbru-subscription',
  title: 'Coldbru Subscription',
  kicker: 'The upstairs café, on a cadence.',
  description:
    'A rotating mix of flavored cold brew, bottled in 500ml glass, packed like it left the second-floor counter this morning. Pick a cadence. We pick — or you pick — the flavors.',
  bottleSize: '500ml glass',
};

export const PLANS = [
  {
    id: 'weekly',
    name: 'Weekly',
    cadence: 'Every week',
    bottles: 4,
    price: 38,
    perBottle: 9.5,
    blurb: 'Four bottles on your stoop. Enough for the work week without filling the fridge.',
    includes: [
      '4 × 500ml bottles',
      'Choose up to 4 flavors, or let us rotate',
      'Skip or pause any week',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    cadence: 'Every month',
    bottles: 12,
    price: 96,
    perBottle: 8,
    blurb: 'A case for the month. Better per-bottle price, same upstairs café pour.',
    includes: [
      '12 × 500ml bottles',
      'Mix the catalog or lock in house favorites',
      'Skip or pause any month',
    ],
  },
];

/**
 * @param {string | undefined} id
 */
export function getPlan(id) {
  if (!id) return PLANS[0];
  return PLANS.find((plan) => plan.id === id) ?? PLANS[0];
}

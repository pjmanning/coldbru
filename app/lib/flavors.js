/**
 * Coldbru flavor catalog stubs.
 * These ship before a Shopify collection is linked. When a store is connected,
 * product cards from the Storefront API render alongside this list.
 */

export const FLAVORS = [
  {
    handle: 'pandan-coconut',
    name: 'Pandan Coconut',
    short: 'The house pour.',
    notes: 'Toasted coconut water, pandan leaf, a slow sweet finish.',
    origin: 'The first bottle we ever put on the second-floor counter.',
    profile: ['nutty', 'green', 'soft'],
    color: '#d9c48a',
  },
  {
    handle: 'palm-sugar-vanilla',
    name: 'Palm Sugar Vanilla',
    short: 'Afternoon light.',
    notes: 'Gula aren, Madagascar vanilla, espresso-cold and round.',
    origin: 'For the 3pm crowd who stay too long on the rattan chairs.',
    profile: ['caramel', 'vanilla', 'warm'],
    color: '#c4a06a',
  },
  {
    handle: 'sea-salt-caramel',
    name: 'Sea Salt Caramel',
    short: 'Salty-sweet.',
    notes: 'Burnt sugar, a pinch of sea salt, cold brew underneath.',
    origin: 'Stolen from the pastry case downstairs, on purpose.',
    profile: ['salty', 'caramel', 'bold'],
    color: '#b8844a',
  },
  {
    handle: 'ginger-lemongrass',
    name: 'Ginger Lemongrass',
    short: 'Bright heat.',
    notes: 'Young ginger, bruised lemongrass, a clean cold finish.',
    origin: 'The bottle we reach for after a too-hot Canggu morning.',
    profile: ['citrus', 'spice', 'clean'],
    color: '#c9d48a',
  },
  {
    handle: 'black-sesame',
    name: 'Black Sesame',
    short: 'Toasted, inky.',
    notes: 'Ground black sesame, a hint of honey, almost savory.',
    origin: 'For people who drink their coffee like a snack.',
    profile: ['toasted', 'nutty', 'deep'],
    color: '#4a4038',
  },
  {
    handle: 'ube-condensed',
    name: 'Ube Condensed',
    short: 'Café dessert.',
    notes: 'Purple yam, a ribbon of condensed milk, cold brew backbone.',
    origin: 'The upstairs special when the rain starts at four.',
    profile: ['sweet', 'floral', 'cream'],
    color: '#7a5a8c',
  },
  {
    handle: 'cinnamon-nutmeg',
    name: 'Cinnamon Nutmeg',
    short: 'Spice drawer.',
    notes: 'Ceylon cinnamon, fresh nutmeg, a little brown sugar.',
    origin: 'Winter in a bottle, even when it is 31 degrees outside.',
    profile: ['spice', 'wood', 'sweet'],
    color: '#a85a3a',
  },
  {
    handle: 'classic-black',
    name: 'Classic Black',
    short: 'No costume.',
    notes: '18-hour steep, single origin, nothing added. The control pour.',
    origin: 'What the baristas drink on shift.',
    profile: ['clean', 'chocolate', 'long'],
    color: '#2a1f18',
  },
];

/**
 * @param {string | undefined} handle
 */
export function getFlavor(handle) {
  if (!handle) return null;
  return FLAVORS.find((flavor) => flavor.handle === handle) ?? null;
}

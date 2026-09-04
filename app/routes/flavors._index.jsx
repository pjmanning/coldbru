import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import {FLAVORS} from '~/lib/flavors';
import {brand} from '~/lib/branding';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: `${brand.name} — Flavor catalog`},
    {
      name: 'description',
      content: 'Pandan coconut, palm sugar vanilla, sea salt caramel, and the rest of the upstairs board.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  try {
    const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    });
    return {collections};
  } catch (error) {
    console.error(error);
    return {collections: null};
  }
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData() {
  return {};
}

export default function FlavorsIndex() {
  /** @type {LoaderReturnData} */
  const {collections} = useLoaderData();

  return (
    <div className="flavors-page">
      <header className="page-intro">
        <p className="kicker">Flavor catalog</p>
        <h1>What’s on the upstairs board</h1>
        <p>
          Eight house flavors, bottled like they left the second-floor café.
          These cards are stubs until a Shopify collection is linked — then the
          live catalog lands underneath.
        </p>
      </header>

      <ul className="flavor-catalog-grid">
        {FLAVORS.map((flavor) => (
          <li key={flavor.handle}>
            <Link
              className="flavor-card flavor-card-full"
              prefetch="intent"
              to={`/flavors/${flavor.handle}`}
            >
              <span
                className="flavor-swatch flavor-swatch-lg"
                style={{background: flavor.color}}
                aria-hidden="true"
              />
              <h2>{flavor.name}</h2>
              <p className="flavor-short">{flavor.short}</p>
              <p>{flavor.notes}</p>
              <ul className="flavor-tags">
                {flavor.profile.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      <p className="catalog-cta">
        Ready to drink them on a cadence?{' '}
        <Link prefetch="intent" to="/subscribe">
          Start a weekly or monthly subscription →
        </Link>
      </p>

      <section className="shop-collections" aria-labelledby="shop-collections-heading">
        <h2 id="shop-collections-heading">Shopify collections</h2>
        {collections ? (
          <PaginatedResourceSection
            connection={collections}
            resourcesClassName="collections-grid"
          >
            {({node: collection, index}) => (
              <Link
                className="collection-item"
                key={collection.id}
                to={`/collections/${collection.handle}`}
                prefetch="intent"
              >
                {collection?.image && (
                  <Image
                    alt={collection.image.altText || collection.title}
                    aspectRatio="1/1"
                    data={collection.image}
                    loading={index < 3 ? 'eager' : undefined}
                    sizes="(min-width: 45em) 400px, 100vw"
                  />
                )}
                <h5>{collection.title}</h5>
              </Link>
            )}
          </PaginatedResourceSection>
        ) : (
          <p className="empty-state">
            Couldn’t load collections from the Storefront API. Flavor stubs above
            still work. Link a store with <code>npx shopify hydrogen link</code>.
          </p>
        )}
      </section>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/** @typedef {import('./+types/flavors._index').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

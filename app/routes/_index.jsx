import {Await, useLoaderData, Link} from 'react-router';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/ProductItem';
import {brand, getTemplateConfig} from '~/lib/branding';
import {FLAVORS} from '~/lib/flavors';
import {PLANS} from '~/lib/subscription';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  const config = getTemplateConfig();
  return [
    {title: `${config.storeName} — flavored cold brew, on subscription`},
    {name: 'description', content: brand.tagline},
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
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0] ?? null,
  };
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const {hero} = brand;

  return (
    <div className="home">
      <section className="hero">
        <p className="kicker">Upstairs café · bottled</p>
        <h1>{hero.headline}</h1>
        <p className="hero-subhead">{hero.subhead}</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" prefetch="intent" to={hero.ctaHref}>
            {hero.ctaLabel}
          </Link>
          <Link className="btn btn-ghost" prefetch="intent" to={hero.secondaryHref}>
            {hero.secondaryLabel}
          </Link>
        </div>
      </section>

      <section className="flavor-strip" aria-labelledby="flavor-strip-heading">
        <div className="section-heading">
          <h2 id="flavor-strip-heading">This week’s upstairs board</h2>
          <Link prefetch="intent" to="/flavors">
            Full catalog →
          </Link>
        </div>
        <ul className="flavor-strip-grid">
          {FLAVORS.slice(0, 4).map((flavor) => (
            <li key={flavor.handle}>
              <Link
                className="flavor-card"
                prefetch="intent"
                to={`/flavors/${flavor.handle}`}
              >
                <span
                  className="flavor-swatch"
                  style={{background: flavor.color}}
                  aria-hidden="true"
                />
                <h3>{flavor.name}</h3>
                <p>{flavor.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="plan-tease" aria-labelledby="plan-tease-heading">
        <h2 id="plan-tease-heading">Weekly or monthly. Same café pour.</h2>
        <div className="plan-tease-grid">
          {PLANS.map((plan) => (
            <Link
              key={plan.id}
              className="plan-tease-card"
              prefetch="intent"
              to={`/subscribe?plan=${plan.id}`}
            >
              <p className="kicker">{plan.cadence}</p>
              <h3>{plan.name}</h3>
              <p className="plan-price">
                ${plan.price}
                <span> / {plan.id === 'weekly' ? 'week' : 'month'}</span>
              </p>
              <p>{plan.blurb}</p>
              <span className="plan-cta">Choose {plan.name.toLowerCase()} →</span>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment | null;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) {
    return (
      <section className="featured-collection empty-state">
        <h2>From the shop</h2>
        <p>
          Shopify catalog is quiet right now. Flavor stubs above still ship —
          link a store with <code>npx shopify hydrogen link</code> to pull live
          collections.
        </p>
      </section>
    );
  }

  const image = collection?.image;
  return (
    <section className="featured-collection-wrap">
      <div className="section-heading">
        <h2>From the shop</h2>
        <Link prefetch="intent" to="/collections">
          All collections →
        </Link>
      </div>
      <Link
        className="featured-collection"
        to={`/collections/${collection.handle}`}
      >
        {image && (
          <div className="featured-collection-image">
            <Image data={image} sizes="100vw" />
          </div>
        )}
        <h3>{collection.title}</h3>
      </Link>
    </section>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <section className="recommended-products">
      <div className="section-heading">
        <h2>Also on the counter</h2>
        <Link prefetch="intent" to="/collections">
          Shop catalog →
        </Link>
      </div>
      <Suspense fallback={<p className="loading-note">Loading shop products…</p>}>
        <Await resolve={products}>
          {(response) => {
            const nodes = response?.products?.nodes ?? [];
            if (!nodes.length) {
              return (
                <p className="empty-state">
                  No Shopify products yet. Until a store is linked, the flavor
                  catalog and subscription PDP are stubs — cart still talks to
                  Hydrogen / mock.shop.
                </p>
              );
            }
            return (
              <div className="recommended-products-grid">
                {nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      altText
      url
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */

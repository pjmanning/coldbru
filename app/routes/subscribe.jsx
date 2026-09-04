import {useLoaderData, Link, useSearchParams} from 'react-router';
import {useState} from 'react';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {brand} from '~/lib/branding';
import {FLAVORS} from '~/lib/flavors';
import {PLANS, SUBSCRIPTION, getPlan} from '~/lib/subscription';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: `${brand.name} — ${SUBSCRIPTION.title}`},
    {name: 'description', content: SUBSCRIPTION.description},
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const storefront = context.storefront;

  const named = await storefront
    .query(PRODUCT_BY_HANDLE_QUERY, {
      variables: {handle: SUBSCRIPTION.handle},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  let product = named?.product ?? null;

  if (!product) {
    const fallback = await storefront
      .query(FIRST_PRODUCT_QUERY)
      .catch((error) => {
        console.error(error);
        return null;
      });
    product = fallback?.products?.nodes?.[0] ?? null;
  }

  return {product};
}

export default function Subscribe() {
  /** @type {LoaderReturnData} */
  const {product} = useLoaderData();
  const [searchParams] = useSearchParams();
  const initialPlan = getPlan(searchParams.get('plan') ?? 'weekly');
  const [planId, setPlanId] = useState(initialPlan.id);
  const [selectedFlavors, setSelectedFlavors] = useState(() =>
    FLAVORS.slice(0, 2).map((flavor) => flavor.handle),
  );
  const {open} = useAside();
  const plan = getPlan(planId);
  const variant = product?.selectedOrFirstAvailableVariant ?? null;

  function toggleFlavor(handle) {
    setSelectedFlavors((current) => {
      if (current.includes(handle)) {
        return current.filter((item) => item !== handle);
      }
      return [...current, handle];
    });
  }

  return (
    <div className="subscribe-page">
      <header className="page-intro">
        <p className="kicker">{SUBSCRIPTION.kicker}</p>
        <h1>{SUBSCRIPTION.title}</h1>
        <p>{SUBSCRIPTION.description}</p>
      </header>

      <div className="subscribe-layout">
        <section className="subscribe-visual" aria-hidden="true">
          <div className="bottle-stack">
            {FLAVORS.slice(0, 4).map((flavor) => (
              <span
                key={flavor.handle}
                className="bottle"
                style={{background: flavor.color}}
              />
            ))}
          </div>
          <p>{SUBSCRIPTION.bottleSize} · glass · cold</p>
        </section>

        <section className="subscribe-form" aria-labelledby="plan-heading">
          <h2 id="plan-heading">Choose a cadence</h2>
          <div className="plan-picker" role="radiogroup" aria-label="Subscription cadence">
            {PLANS.map((option) => {
              const selected = option.id === planId;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`plan-option${selected ? ' selected' : ''}`}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPlanId(option.id)}
                >
                  <span className="plan-option-name">{option.name}</span>
                  <span className="plan-price">
                    ${option.price}
                    <span>
                      {' '}
                      / {option.id === 'weekly' ? 'week' : 'month'}
                    </span>
                  </span>
                  <span className="plan-option-meta">
                    {option.bottles} bottles · ${option.perBottle} each
                  </span>
                  <span>{option.blurb}</span>
                </button>
              );
            })}
          </div>

          <h2>Mix your board</h2>
          <p className="muted">
            Pick at least one flavor. We’ll rotate the rest to fill {plan.bottles}{' '}
            bottles.
          </p>
          {selectedFlavors.length === 0 ? (
            <p className="error-note" role="status">
              Choose a flavor to build your mix.
            </p>
          ) : null}
          <ul className="flavor-picker">
            {FLAVORS.map((flavor) => {
              const checked = selectedFlavors.includes(flavor.handle);
              return (
                <li key={flavor.handle}>
                  <label className={`flavor-chip${checked ? ' selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFlavor(flavor.handle)}
                    />
                    <span
                      className="flavor-swatch flavor-swatch-sm"
                      style={{background: flavor.color}}
                    />
                    {flavor.name}
                  </label>
                </li>
              );
            })}
          </ul>

          <ul className="plan-includes">
            {plan.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {variant ? (
            <AddToCartButton
              disabled={selectedFlavors.length === 0}
              lines={[
                {
                  merchandiseId: variant.id,
                  quantity: 1,
                  attributes: [
                    {key: 'cadence', value: plan.id},
                    {key: 'plan', value: plan.name},
                    {key: 'flavors', value: selectedFlavors.join(', ')},
                  ],
                },
              ]}
              onClick={() => open('cart')}
            >
              Add {plan.name.toLowerCase()} plan to cart · ${plan.price}
            </AddToCartButton>
          ) : (
            <p className="empty-state">
              No Shopify product is available to add yet. The weekly / monthly
              PDP is still a stub — cart wiring stays in Hydrogen. Link a store
              or keep mock.shop running, then reload.
            </p>
          )}

          <p className="stub-note">
            Selling plans are stubbed in <code>app/lib/subscription.js</code>.
            Add-to-cart uses the Storefront API product{' '}
            <code>{product?.handle ?? SUBSCRIPTION.handle}</code> when present
            (mock.shop until you run <code>npx shopify hydrogen link</code>).
            Checkout needs a linked store.
          </p>
        </section>
      </div>

      <p>
        Curious about the café? <Link to="/about">Read the upstairs story</Link>.
      </p>
    </div>
  );
}

const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query SubscribeProduct($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        title
      }
    }
  }
`;

const FIRST_PRODUCT_QUERY = `#graphql
  query FirstProduct($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        id
        title
        handle
        selectedOrFirstAvailableVariant {
          id
          availableForSale
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/subscribe').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

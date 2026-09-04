import {useLoaderData, Link} from 'react-router';
import {getFlavor} from '~/lib/flavors';
import {brand} from '~/lib/branding';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const name = data?.flavor?.name ?? 'Flavor';
  return [
    {title: `${brand.name} — ${name}`},
    {name: 'description', content: data?.flavor?.notes ?? brand.tagline},
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({params}) {
  const flavor = getFlavor(params.handle);
  if (!flavor) {
    throw new Response('Flavor not found', {status: 404});
  }
  return {flavor};
}

export default function FlavorDetail() {
  /** @type {LoaderReturnData} */
  const {flavor} = useLoaderData();

  return (
    <article className="flavor-pdp">
      <p className="kicker">Flavor stub</p>
      <div className="flavor-pdp-hero">
        <span
          className="flavor-swatch flavor-swatch-hero"
          style={{background: flavor.color}}
          aria-hidden="true"
        />
        <div>
          <h1>{flavor.name}</h1>
          <p className="flavor-short">{flavor.short}</p>
        </div>
      </div>
      <p className="lede">{flavor.notes}</p>
      <p>{flavor.origin}</p>
      <ul className="flavor-tags">
        {flavor.profile.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="hero-actions">
        <Link className="btn btn-primary" prefetch="intent" to="/subscribe">
          Add to a subscription
        </Link>
        <Link className="btn btn-ghost" prefetch="intent" to="/flavors">
          All flavors
        </Link>
      </div>
      <p className="stub-note">
        Flavor PDPs are stubs — they do not require a Shopify product handle yet.
        When the catalog is linked, this page can resolve{' '}
        <code>/products/{flavor.handle}</code> from the Storefront API.
      </p>
    </article>
  );
}

/** @typedef {import('./+types/flavors.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

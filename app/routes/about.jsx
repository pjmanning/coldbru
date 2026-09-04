import {Link} from 'react-router';
import {brand} from '~/lib/branding';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    {title: `${brand.name} — About the upstairs café`},
    {
      name: 'description',
      content:
        'Coldbru is flavored cold brew from a second-floor café above a Bali shop — now on subscription.',
    },
  ];
};

export default function About() {
  return (
    <article className="about-page">
      <header className="page-intro">
        <p className="kicker">About</p>
        <h1>The second-floor café, bottled.</h1>
      </header>

      <div className="about-prose">
        <p className="lede">
          You know the shop. Downstairs is clothes, ceramics, maybe a stack of
          books you will not buy. Upstairs is the real reason you came: a slow
          café, shuttered light, cold brew that actually tastes like something.
        </p>
        <p>
          Coldbru started as that upstairs counter — flavored cold brew poured
          over ice in heavy glasses. Pandan coconut for the regulars. Ginger
          lemongrass when the weather turned. Classic black for the baristas.
          People asked to take bottles home. Then they asked if we could send
          them.
        </p>
        <p>
          So we did. Weekly or monthly, glass bottles, the same 18-hour steep,
          the same upstairs flavors. No syrup pump. No fake vanilla. Just cold
          brew that remembers the second floor.
        </p>
        <h2>How it works</h2>
        <ol className="about-steps">
          <li>Pick weekly (4 bottles) or monthly (12 bottles).</li>
          <li>Lock in house flavors, or let us rotate the board.</li>
          <li>Skip, pause, or swap before the next pack leaves.</li>
        </ol>
        <p>
          This storefront still runs on Shopify Hydrogen. Until a live store is
          linked it uses mock.shop for cart proof — the café copy and flavor
          board are ours.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" prefetch="intent" to="/subscribe">
            Start a subscription
          </Link>
          <Link className="btn btn-ghost" prefetch="intent" to="/flavors">
            See the flavors
          </Link>
        </div>
      </div>
    </article>
  );
}

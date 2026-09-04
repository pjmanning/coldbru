import {NavLink} from 'react-router';
import {brand} from '~/lib/branding';
import {BrandLogo} from '~/components/BrandLogo';

const FOOTER_LINKS = [
  {id: 'flavors', title: 'Flavors', url: '/flavors'},
  {id: 'subscribe', title: 'Subscribe', url: '/subscribe'},
  {id: 'about', title: 'About', url: '/about'},
  {id: 'cart', title: 'Cart', url: '/cart'},
];

/**
 * Basic footer stub — branding tokens only, no real policies wired.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <BrandLogo className="footer-logo" />
        <nav className="footer-menu" role="navigation" aria-label="Footer">
          {FOOTER_LINKS.map((item) => (
            <NavLink key={item.id} prefetch="intent" to={item.url}>
              {item.title}
            </NavLink>
          ))}
        </nav>
        <p className="footer-note">
          © {year} {brand.name} · flavored cold brew, on subscription
        </p>
      </div>
    </footer>
  );
}

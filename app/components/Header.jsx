import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {BrandLogo} from '~/components/BrandLogo';

const PRIMARY_MENU = [
  {id: 'home', title: 'Home', url: '/'},
  {id: 'flavors', title: 'Flavors', url: '/flavors'},
  {id: 'subscribe', title: 'Subscribe', url: '/subscribe'},
  {id: 'about', title: 'About', url: '/about'},
  {id: 'cart', title: 'Cart', url: '/cart'},
];

/**
 * @param {HeaderProps}
 */
export function Header({header, cart}) {
  return (
    <header className="header">
      <BrandLogo />
      <HeaderMenu viewport="desktop" />
      <HeaderCtas cart={cart} shopName={header?.shop?.name} />
    </header>
  );
}

/**
 * @param {{viewport: Viewport}}
 */
export function HeaderMenu({viewport}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation" aria-label="Primary">
      {PRIMARY_MENU.map((item) => (
        <NavLink
          className="header-menu-item"
          end={item.url === '/'}
          key={item.id}
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to={item.url}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'> & {shopName?: string}}
 */
function HeaderCtas({cart, shopName}) {
  return (
    <nav className="header-ctas" role="navigation" aria-label="Utilities">
      <HeaderMenuMobileToggle />
      {shopName ? (
        <span className="header-shop-hint" title="Connected shop name">
          {shopName}
        </span>
      ) : null}
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      ☰
    </button>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="cart-toggle"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart <span aria-label={`(items: ${count})`}>{count}</span>
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? '600' : undefined,
    color: isPending ? 'var(--brand-muted)' : 'var(--brand-text)',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */

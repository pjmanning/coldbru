import {Await} from 'react-router';
import {Suspense} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {TemplateBanner} from '~/components/TemplateBanner';

/**
 * @param {PageLayoutProps}
 */
export function PageLayout({cart, children = null, header}) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <MobileMenuAside />
      <TemplateBanner />
      {header && <Header header={header} cart={cart} />}
      <main>{children}</main>
      <Footer />
    </Aside.Provider>
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside type="cart" heading="CART">
      <p className="stub-note">
        Cart drawer — Hydrogen cart against mock.shop until a real Coldbru store
        is linked. Checkout needs that store for live payments.
      </p>
      <Suspense fallback={<p>Loading cart …</p>}>
        <Await resolve={cart}>
          {(cartData) => <CartMain cart={cartData} layout="aside" />}
        </Await>
      </Suspense>
    </Aside>
  );
}

function MobileMenuAside() {
  return (
    <Aside type="mobile" heading="MENU">
      <HeaderMenu viewport="mobile" />
    </Aside>
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */

import {Link} from 'react-router';
import {brand} from '~/lib/branding';

/**
 * Logo slot: image if `brand.logo.src` is set, otherwise text wordmark.
 */
export function BrandLogo({className = ''}) {
  const {logo, name} = brand;

  return (
    <Link prefetch="intent" to="/" className={`brand-logo ${className}`}>
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.alt || name}
          width={logo.width}
          height={logo.height}
        />
      ) : (
        <span className="brand-wordmark">{name}</span>
      )}
    </Link>
  );
}

/**
 * Quiet notice that the catalog still talks to mock.shop until a store is linked.
 */
export function TemplateBanner() {
  return (
    <div className="template-banner" role="status">
      <strong>Coldbru</strong>
      <span>
        Demo storefront — Shopify cart talks to mock.shop until you run{' '}
        <code>npx shopify hydrogen link</code>.
      </span>
    </div>
  );
}

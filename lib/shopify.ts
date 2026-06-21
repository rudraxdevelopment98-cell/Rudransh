/**
 * Shopify Storefront API client.
 *
 * Headless commerce per techStack.recommended. Tokens come from env vars only —
 * never hardcode. When env is unset (local scaffolding), callers fall back to
 * lib/data.ts placeholder content so the UI renders without a live store.
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2024-07";

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

interface ShopifyFetchArgs {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
}: ShopifyFetchArgs): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

/* ── Cart mutations (wired when a store is connected) ──────────────────────
 * createCart, addCartLines, and the resulting checkoutUrl belong here. The
 * CartDrawer currently uses a local client-side cart so the storefront is
 * fully navigable pre-integration; swap its actions for these calls once the
 * Storefront API token is in place. */

export const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
    }
  }
`;

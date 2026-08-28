// ──────────────────────────────────────────────────────────────────────────
// Client Shopify Storefront API — alimente la boutique du site.
//
// ⚠️ À CONFIGURER dans Vercel (Settings → Environment Variables) :
//   SHOPIFY_STORE_DOMAIN     ex: st59nh-ay.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN jeton d'accès Storefront (public)
//
// Le catalogue, les prix et les photos vivent dans Shopify : une seule source
// de vérité. Le paiement se fait sur le tunnel sécurisé Shopify.
// ──────────────────────────────────────────────────────────────────────────

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN ?? "";
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
const API_VERSION = "2025-01";

export const shopifyConfigured = Boolean(DOMAIN && TOKEN);

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = 3600
): Promise<T | null> {
  if (!shopifyConfigured) return null;
  try {
    const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      ...(revalidate === false
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) {
      console.error("[shopify]", JSON.stringify(json.errors));
      return null;
    }
    return json.data as T;
  } catch (e) {
    console.error("[shopify]", e);
    return null;
  }
}

// ── Types exposés au site ─────────────────────────────────────────────────
export type ShopVariant = {
  id: string;
  title: string;
  sku: string | null;
  price: number;
  options: { name: string; value: string }[];
};

export type ShopProduct = {
  handle: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  images: { url: string; alt: string | null }[];
  priceFrom: number;
  variants: ShopVariant[];
};

const PRODUCT_FIELDS = `
  handle
  title
  description
  descriptionHtml
  productType
  tags
  images(first: 8) { nodes { url altText } }
  priceRange { minVariantPrice { amount } }
  variants(first: 20) {
    nodes {
      id
      title
      sku
      price { amount }
      selectedOptions { name value }
    }
  }
`;

type Raw = Record<string, any>; // eslint-disable-line
function normalize(n: Raw): ShopProduct {
  return {
    handle: n.handle,
    slug: String(n.handle).replace(/^cache-climatiseur-/, ""),
    title: n.title,
    name: String(n.title).replace(/^Cache-climatiseur\s+/i, ""),
    description: n.description ?? "",
    descriptionHtml: n.descriptionHtml ?? "",
    productType: n.productType ?? "",
    tags: n.tags ?? [],
    images: (n.images?.nodes ?? []).map((i: Raw) => ({ url: i.url, alt: i.altText })),
    priceFrom: Number(n.priceRange?.minVariantPrice?.amount ?? 0),
    variants: (n.variants?.nodes ?? []).map((v: Raw) => ({
      id: v.id,
      title: v.title,
      sku: v.sku,
      price: Number(v.price?.amount ?? 0),
      options: v.selectedOptions ?? [],
    })),
  };
}

/** Tous les caches-climatiseurs, triés par catégorie puis par prix. */
export async function getBoutiqueProducts(): Promise<ShopProduct[]> {
  const data = await storefront<{ products: { nodes: unknown[] } }>(
    `query { products(first: 100, query: "tag:cache-clim") { nodes { ${PRODUCT_FIELDS} } } }`
  );
  if (!data) return [];
  return data.products.nodes.map((n) => normalize(n as Raw));
}

/** Un produit par son handle Shopify. */
export async function getBoutiqueProduct(handle: string): Promise<ShopProduct | null> {
  const data = await storefront<{ product: unknown | null }>(
    `query($h: String!) { product(handle: $h) { ${PRODUCT_FIELDS} } }`,
    { h: handle }
  );
  if (!data || !data.product) return null;
  return normalize(data.product as Raw);
}

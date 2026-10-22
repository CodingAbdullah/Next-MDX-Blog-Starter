// Canonical public origin of the site, without a trailing slash
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Site name used as the publisher in structured data
export const SITE_NAME = "Create Next MDX Blog App";

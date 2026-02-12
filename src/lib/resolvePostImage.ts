// src/lib/resolvePostImage.ts

import { postImages } from "./imageRegistry";

/**
 * 記事画像を解決する
 * 優先順位:
 * 1. /slug/lang/file
 * 2. /slug/file
 */
export function resolvePostImage(
  slug: string,
  lang: string,
  file: string
) {
  const langKey =
    `/src/assets/posts/${slug}/${lang}/${file}`;

  const sharedKey =
    `/src/assets/posts/${slug}/${file}`;

  const module =
    (postImages as any)[langKey] ??
    (postImages as any)[sharedKey];

  return module?.default ?? null;
}

import { SITE, type Lang, absUrl, defaultOgImagePath } from "./site";

export type OgType = "website" | "article";

export function canonicalPath(lang: Lang, ...parts: string[]) {
    const joined = parts.filter(Boolean).join("/").replace(/\/+/g, "/");
    return `/${lang}/${joined}/`.replace(/\/+/g, "/");
}

export function alternatesFor(lang: Lang, pathNoLang: string) {
    const clean = pathNoLang.startsWith("/") ? pathNoLang : `/${pathNoLang}`;
    const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
    return {
        ja: `/ja${withSlash}`,
        en: `/en${withSlash}`
    } as const;
}

export function alternatesAndCanonical(
    urlPathNoLang: string,
    lang: Lang,
) {
    const alternates = alternatesFor(lang, urlPathNoLang);
    const canonicalPath = `/${lang}${urlPathNoLang}`;
    return {alternates, canonicalPath};
}

export function langLabel(lang: Lang) {
    return lang;
}

export function buildJsonLdWebsite(params: {
    lang: Lang;
    urlPath: string;
    name?: string;
    description?: string;
}) {
    const url = absUrl(params.urlPath);
    return {
        "@context": "https//schema.org",
        "@type": "WebSite",
        name: params.name ?? SITE.name,
        url,
        inLanguage: params.lang,
        publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: absUrl("/"),
        },
    };
}

export function buildJsonLdArticle(params: {
    lang: Lang;
    urlPath: string;
    headline: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    imageUrl?: string;
}) {
    const url = absUrl(params.urlPath);
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: params.headline,
        description: params.description,
        datePublished: params.datePublished,
        dateModified: params.dateModified ?? params.datePublished,
        inLanguage: params.lang,
        image: params.imageUrl ? [params.imageUrl] : undefined,
        author: { "@type": "Organization", name: SITE.name },
        publisher: {
            "@type": "Organization",
            name: SITE.name,
            url: absUrl("/"),
            logo: {
                "@type": "ImageObject",
                url: absUrl(defaultOgImagePath(params.lang)),
            },
        },
    };
}
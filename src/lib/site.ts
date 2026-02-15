export const SITE = {
    name: "J-IMPACT",
    domain: "j-impact.jp",
    defaultLang: "ja" as const,
    supportedLangs: ["ja", "en"] as const,
    siteUrl: "https://j-impact.jp",
    twitterSites: ["@j-impact-jp", "@j-impact-en"],
} satisfies {
    name: string,
    domain: string,
    defaultLang: string,
    supportedLangs: readonly string[],
    siteUrl: string,
    twitterSites: readonly string[],
};

export type Lang = (typeof SITE.supportedLangs)[number];

export function isLang(v: unknown): v is Lang {
    return typeof v === "string" && (SITE.supportedLangs as readonly string[]).includes(v);
}

export function supportedLang(v: unknown): Lang {
    if (!isLang(v)) throw new Error(`Unsupported lang: ${v}`);
    return v;
}

export function absUrl(path: string): string {
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${SITE.siteUrl}${p}`;
}

export function defaultOgImagePath(lang: Lang): string {
    return lang === "en" ? "/images/ogp/default-en.jpg" : "/images/ogp/default-ja.jpg";
}
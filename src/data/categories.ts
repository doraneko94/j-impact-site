type CategoryInfo = {
  readonly ja: string;
  readonly en: string;
};

export const CATEGORIES: Record<string, CategoryInfo> = {
  embedded: {
    ja: "組込み開発",
    en: "Embedded",
  },
  analog: {
    ja: "アナログ・PCB設計",
    en: "Analog & PCB Design",
  },
  signal: {
    ja: "信号処理・無線",
    en: "Signal Processing & SDR",
  },
  research: {
    ja: "理論研究",
    en: "Research Review",
  },
  others: {
    ja: "お知らせ・その他",
    en: "News & Others",
  },
} as const;
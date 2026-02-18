export {};

declare global {
  interface Window {
    JIMPACT_openCookieSettings?: () => void;
  }
}

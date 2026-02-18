// public/js/consent.js

// ===============================
// J-IMPACT Cookie Consent Utility
// ===============================

const KEY = "jimpact_consent_v1";
const COOKIE_NAME = "jimpact_consent";
const CONSENT_VERSION = 1;

// -------------------------------
// Cookie helpers
// -------------------------------

function setCookie(name, value, days = 180) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; Max-Age=" +
    maxAge +
    "; Path=/; SameSite=Lax";
}

function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

// -------------------------------
// Read consent
// -------------------------------

export function readConsent() {
  try {
    const raw =
      localStorage.getItem(KEY) ||
      getCookie(COOKIE_NAME);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.essential !== true ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return parsed;
  } catch (e) {
    return null;
  }
}

// -------------------------------
// Write consent
// -------------------------------

export function writeConsent(analytics) {
  const state = {
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    essential: true,
    analytics: !!analytics,
  };

  const raw = JSON.stringify(state);

  localStorage.setItem(KEY, raw);
  setCookie(COOKIE_NAME, raw, 180);

  return state;
}

// -------------------------------
// Clear consent
// -------------------------------

export function clearConsent() {
  localStorage.removeItem(KEY);

  document.cookie =
    encodeURIComponent(COOKIE_NAME) +
    "=; Max-Age=0; Path=/; SameSite=Lax";
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const { consentBanner } = useCookiebot({
        blockingMode: 'auto'
    });
    consentBanner();
  }
});

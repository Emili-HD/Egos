// plugins/cookieBot.client.js

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      const { consentBanner } = useCookiebot({
          blockingMode: 'auto'
      });
      consentBanner();
    })
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    window.addEventListener('message', event => {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        // Reemplaza someAnalyticsLib con la función real de tu biblioteca de analytics
        console.log(`Form Submitted! Event data: ${JSON.stringify(event.data)}`);
      }
    });
  }
});

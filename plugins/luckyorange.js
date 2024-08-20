// plugins/luckyorange.client.js
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const script = document.createElement('script')
    script.src = 'https://tools.luckyorange.com/core/lo.js?site-id=91fe30cc'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
})
// flamboyant-ardinghelli.89-116-52-173.plesk.page

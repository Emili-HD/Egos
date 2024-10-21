// composables/useGTM.ts
import { useRoute } from 'vue-router'

export function useGTM() {
    const route = useRoute()

    // Verificar si estamos en la ruta 'promocion/[...slug]' o '/gracias'
    const isPromoPage = computed(() => {
        return route.path.startsWith('/promocion/') || route.path.startsWith('/gracias/')
    })

    // Añadir el script a head
    if (isPromoPage.value) {
        useHead({
            script: [
                {
                    src: 'https://www.googletagmanager.com/gtm.js?id=GTM-5PQ2LQP',
                    defer: true,
                },
            ],
        })

        // Añadir el noscript en body al montar el componente
        onMounted(() => {
            const noScriptTag = document.createElement('noscript')
            noScriptTag.innerHTML = `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5PQ2LQP"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `
            document.body.appendChild(noScriptTag)
        })
    }
}

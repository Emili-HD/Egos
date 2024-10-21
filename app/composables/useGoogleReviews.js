// composables/useGoogleReviews.js
import { useFetch } from 'nuxt/app'

export const useGoogleReviews = async (placeId) => {
    const apiKey = useRuntimeConfig().public.googleMapsApiKey

    if (!placeId) {
        throw new Error('El placeId no está definido')
    }

    const { data, error } = await useFetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=es&key=${apiKey}`
    )

    if (error.value) {
        throw new Error('Error fetching Google reviews')
    }

    // Verifica la respuesta completa
    console.log('Respuesta de la API:', data.value)

    return data.value?.result?.reviews || []
}

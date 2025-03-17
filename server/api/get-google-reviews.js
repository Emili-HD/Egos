import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const { placeId } = getQuery(event)

    if (!placeId) {
        return { error: 'El placeId es requerido.' }
    }

    const apiKey = process.env.NUXT_PUBLIC_GOOGLE_MAP_API_KEY
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=es&key=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()

        if (data?.result?.reviews && data.result.reviews.length > 0) {
            // Filtrar las reseñas con rating de 4 estrellas o más
            const filteredReviews = data.result.reviews
                .filter(review => review.rating >= 4)
                .slice(-100) // Mostrar las últimas 100 reseñas

            return {
                averageRating: data.result.rating,               // Valoración media
                totalReviews: data.result.user_ratings_total,    // Número total de reseñas
                reviews: filteredReviews                         // Últimas 100 reseñas filtradas
            }
        } else {
            return { error: 'No se encontraron reseñas.' }
        }
    } catch (err) {
        console.error('Error al llamar a la API de Google Places:', err)
        return { error: 'Error al obtener las reseñas' }
    }
})

